import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useSessionHistory } from '../hooks/useSessionHistory';
import { trackBreathingSession } from './GoogleAnalytics';
import { CompactSoundPlayer } from './CompactSoundPlayer';

interface BreathingExerciseProps {
  onPageChange?: (page: string) => void;
}

export const BreathingExercise: React.FC<BreathingExerciseProps> = ({ onPageChange }) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { recordSession } = useSessionHistory();
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [timeLeft, setTimeLeft] = useState(4);
  const [totalTime, setTotalTime] = useState(0);
  const [currentColor, setCurrentColor] = useState('#3B82F6'); // Blue
  const [showLifeTipsBanner, setShowLifeTipsBanner] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const totalTimeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const sessionStartTime = useRef<number | null>(null);
  const expectedPhaseTimeRef = useRef<number>(0);
  const expectedTotalTimeRef = useRef<number>(0);

  const phases = {
    inhale: { duration: 4, next: 'hold' as const, color: '#3B82F6', label: t('breathing.inhale') },
    hold: { duration: 7, next: 'exhale' as const, color: '#10B981', label: t('breathing.hold') },
    exhale: { duration: 8, next: 'inhale' as const, color: '#8B5CF6', label: t('breathing.exhale') },
  };

  const colors = ['#3B82F6', '#10B981', '#8B5CF6']; // Blue, Green, Magenta
  const colorNames = ['Azul', 'Verde', 'Roxo'];
  
  useEffect(() => {
    if (isActive) {
      const startTime = Date.now();
      expectedPhaseTimeRef.current = startTime + 1000;
      expectedTotalTimeRef.current = startTime + 1000;
      
      const phaseTimerTick = () => {
        const now = Date.now();
        const drift = now - expectedPhaseTimeRef.current;
        
        setTimeLeft((prev) => {
          if (prev <= 1) {
            const currentPhase = phases[phase];
            const nextPhase = currentPhase.next;
            setPhase(nextPhase);
            setCurrentColor(phases[nextPhase].color);
            return phases[nextPhase].duration;
          }
          return prev - 1;
        });
        
        expectedPhaseTimeRef.current += 1000;
        const nextDelay = Math.max(0, 1000 - drift);
        
        if (isActive) {
          intervalRef.current = setTimeout(phaseTimerTick, nextDelay);
        }
      };
      
      const totalTimerTick = () => {
        const now = Date.now();
        const drift = now - expectedTotalTimeRef.current;
        
        setTotalTime((prev) => prev + 1);
        
        expectedTotalTimeRef.current += 1000;
        const nextDelay = Math.max(0, 1000 - drift);
        
        if (isActive) {
          totalTimeIntervalRef.current = setTimeout(totalTimerTick, nextDelay);
        }
      };
      
      // Start both timers
      intervalRef.current = setTimeout(phaseTimerTick, 1000);
      totalTimeIntervalRef.current = setTimeout(totalTimerTick, 1000);
    } else {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
        intervalRef.current = null;
      }
      if (totalTimeIntervalRef.current) {
        clearTimeout(totalTimeIntervalRef.current);
        totalTimeIntervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
      if (totalTimeIntervalRef.current) {
        clearTimeout(totalTimeIntervalRef.current);
      }
    };
  }, [isActive, phase]);

  const startExercise = () => {
    setIsActive(true);
    sessionStartTime.current = Date.now();
    trackBreathingSession(0, false); // Track session start
  };

  const stopExercise = () => {
    setIsActive(false);
    trackBreathingSession(totalTime, totalTime > 30); // Track session end
    
    // Registrar sessão se usuário estiver logado e sessão durou mais de 30 segundos
    if (user && sessionStartTime.current && totalTime > 30) {
      recordSessionData();
    }
  };

  const resetExercise = () => {
    setIsActive(false);
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
      intervalRef.current = null;
    }
    if (totalTimeIntervalRef.current) {
      clearTimeout(totalTimeIntervalRef.current);
      totalTimeIntervalRef.current = null;
    }
    setPhase('inhale');
    setTimeLeft(4);
    setTotalTime(0);
    setCurrentColor('#3B82F6');
    sessionStartTime.current = null;
  };

  const recordSessionData = async () => {
    if (!user || !sessionStartTime.current) return;

    try {
      await recordSession({
        sessionType: 'breathing',
        durationSeconds: totalTime,
        effectivenessRating: 4.5, // Valor padrão, pode ser ajustado
        sessionData: {
          technique: '4-7-8',
          chromotherapyUsed: true,
          completedCycles: Math.floor(totalTime / 19) // Cada ciclo 4+7+8 = 19s
        },
        completedAt: new Date().toISOString()
      });
      
      console.log('✅ Sessão de respiração registrada com sucesso');
    } catch (error) {
      console.error('❌ Erro ao registrar sessão de respiração:', error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const circleRadius = 120;
  const circumference = 2 * Math.PI * circleRadius;
  const progress = ((phases[phase].duration - timeLeft) / phases[phase].duration) * circumference;
  
  // Calculate pulse scale based on phase and time
  const getPulseScale = () => {
    const phaseProgress = (phases[phase].duration - timeLeft) / phases[phase].duration;
    if (phase === 'inhale') {
      return 60 + (30 * phaseProgress); // Expand from 60 to 90
    } else if (phase === 'hold') {
      return 90; // Stay at maximum
    } else {
      return 90 - (30 * phaseProgress); // Contract from 90 to 60
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center transition-all duration-1000 ease-in-out pt-16"
      style={{ 
        background: `linear-gradient(135deg, ${currentColor}20, ${currentColor}10, white)` 
      }}
    >
      {/* Compact Sound Player - Fixed Position */}
      <CompactSoundPlayer 
        currentColor={currentColor}
        onNavigateToLibrary={() => onPageChange && onPageChange('sounds')}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-6">
          <img 
            src="/Logo Xzenpress oficial.png" 
            alt="XZenPress Logo" 
            className="h-16 w-auto opacity-80"
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">{t('breathing.title')}</h1>
        
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8">
          {/* Breathing Circle */}
          <div className="relative mb-8">
            <svg className="w-80 h-80 mx-auto transform -rotate-90" viewBox="0 0 280 280">
              {/* Background circle */}
              <circle
                cx="140"
                cy="140"
                r={circleRadius}
                stroke="#E5E7EB"
                strokeWidth="8"
                fill="none"
              />
              {/* Progress circle */}
              <circle
                cx="140"
                cy="140"
                r={circleRadius}
                stroke={currentColor}
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - progress}
                className="transition-all duration-1000 ease-in-out"
              />
              {/* Inner breathing circle */}
              <circle
                cx="140"
                cy="140"
                r={getPulseScale()}
                fill={currentColor}
                fillOpacity="0.2"
                className="transition-all duration-500 ease-in-out"
              />
            </svg>
            
            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div 
                className="text-6xl font-bold mb-2 transition-colors duration-500"
                style={{ color: currentColor }}
              >
                {timeLeft}
              </div>
              <div 
                className="text-2xl font-semibold uppercase tracking-wider transition-colors duration-500"
                style={{ color: currentColor }}
              >
                {phases[phase].label}
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-8">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className={`p-4 rounded-xl transition-all duration-500 ${phase === 'inhale' ? 'bg-blue-50 border-2 border-blue-200 shadow-lg transform scale-105' : 'bg-gray-50'}`}>
                <div className="text-2xl font-bold text-blue-600 mb-1">4s</div>
                <div className="text-sm text-gray-600">{t('breathing.inhale')}</div>
                <div className="text-xs text-blue-500 mt-1">{t('breathing.chromotherapy.blue.short')}</div>
              </div>
              <div className={`p-4 rounded-xl transition-all duration-500 ${phase === 'hold' ? 'bg-green-50 border-2 border-green-200 shadow-lg transform scale-105' : 'bg-gray-50'}`}>
                <div className="text-2xl font-bold text-green-600 mb-1">7s</div>
                <div className="text-sm text-gray-600">{t('breathing.hold')}</div>
                <div className="text-xs text-green-500 mt-1">{t('breathing.chromotherapy.green.short')}</div>
              </div>
              <div className={`p-4 rounded-xl transition-all duration-500 ${phase === 'exhale' ? 'bg-purple-50 border-2 border-purple-200 shadow-lg transform scale-105' : 'bg-gray-50'}`}>
                <div className="text-2xl font-bold text-purple-600 mb-1">8s</div>
                <div className="text-sm text-gray-600">{t('breathing.exhale')}</div>
                <div className="text-xs text-purple-500 mt-1">{t('breathing.chromotherapy.magenta.short')}</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            {!isActive ? (
              <button
                onClick={startExercise}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                <Play className="w-6 h-6" />
                <span>{t('breathing.start')}</span>
              </button>
            ) : (
              <button
                onClick={stopExercise}
                className="flex items-center space-x-2 bg-red-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                <Pause className="w-6 h-6" />
                <span>{t('breathing.stop')}</span>
              </button>
            )}
            
            <button
              onClick={resetExercise}
              className="flex items-center space-x-2 bg-gray-500 text-white px-6 py-4 rounded-full text-lg font-semibold hover:bg-gray-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <RotateCcw className="w-5 h-5" />
              <span>{t('breathing.reset')}</span>
            </button>
          </div>

          {/* Timer */}
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-2">{t('breathing.totalTime')}</div>
            <div className="text-2xl font-bold text-gray-700">{formatTime(totalTime)}</div>
          </div>
        </div>

        {/* Chromotherapy Education Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">{t('breathing.chromotherapy.title')}</h2>
          <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">{t('breathing.chromotherapy.description')}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                <h3 className="text-xl font-bold text-blue-800">{t('breathing.chromotherapy.blue')}</h3>
              </div>
              <p className="text-blue-700 text-sm leading-relaxed">
                {t('breathing.chromotherapy.blue.desc')}
              </p>
              <div className="mt-4 text-xs text-blue-600 bg-blue-50 rounded-lg p-2">
                <strong>{t('breathing.phase')}:</strong> {t('breathing.phase.inhale.detail')}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                <h3 className="text-xl font-bold text-green-800">{t('breathing.chromotherapy.green')}</h3>
              </div>
              <p className="text-green-700 text-sm leading-relaxed">
                {t('breathing.chromotherapy.green.desc')}
              </p>
              <div className="mt-4 text-xs text-green-600 bg-green-50 rounded-lg p-2">
                <strong>{t('breathing.phase')}:</strong> {t('breathing.phase.hold.detail')}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
                <h3 className="text-xl font-bold text-purple-800">{t('breathing.chromotherapy.magenta')}</h3>
              </div>
              <p className="text-purple-700 text-sm leading-relaxed">
                {t('breathing.chromotherapy.magenta.desc')}
              </p>
              <div className="mt-4 text-xs text-purple-600 bg-purple-50 rounded-lg p-2">
                <strong>{t('breathing.phase')}:</strong> {t('breathing.phase.exhale.detail')}
              </div>
            </div>
          </div>
          
          {/* Benefits Section */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">{t('breathing.benefits.title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700 text-sm">{t('breathing.benefits.stress')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-700 text-sm">{t('breathing.benefits.sleep')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-gray-700 text-sm">{t('breathing.benefits.focus')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-gray-700 text-sm">{t('breathing.benefits.pressure')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scientific Background */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">🧬 {t('breathing.science.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-gray-800 mb-3">📚 {t('breathing.science.evidence')}</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• {t('breathing.science.parasympathetic')}</li>
                <li>• {t('breathing.science.cortisol')}</li>
                <li>• {t('breathing.science.heartRate')}</li>
                <li>• {t('breathing.science.gaba')}</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-gray-800 mb-3">🎨 {t('breathing.science.chromotherapy')}</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• {t('breathing.science.blue.effect')}</li>
                <li>• {t('breathing.science.green.effect')}</li>
                <li>• {t('breathing.science.magenta.effect')}</li>
                <li>• {t('breathing.science.melatonin')}</li>
              </ul>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};