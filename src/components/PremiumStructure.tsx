import React, { useState } from 'react';
import { Crown, Star, Lock, Zap, MessageCircle, Target, Brain, Shield, CheckCircle, Clock, ArrowRight, CreditCard, Smartphone, Bitcoin } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { AIRecommendationsPanel } from './AIRecommendationsPanel';
import { PixPaymentComponent } from './PixPaymentComponent';
import { CreditCardPaymentComponent } from './CreditCardPaymentComponent';
import { trackPremiumUpgrade } from './GoogleAnalytics';

interface PremiumStructureProps {
  onPageChange: (page: string) => void;
}

export const PremiumStructure: React.FC<PremiumStructureProps> = ({ onPageChange }) => {
  const { user, upgradeToPremium } = useAuth();
  const { t } = useLanguage();
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit' | 'crypto'>('pix');
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [pixPaymentData, setPixPaymentData] = useState<{
    amount: number;
    description: string;
    orderId: string;
  } | null>(null);

  // Se o usuário já é premium, mostrar dashboard premium
  if (user?.isPremium) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Premium Dashboard Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-green-500 rounded-full">
                <Crown className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-green-800">
              Bem-vindo, Premium! 🎉
            </h1>
            <p className="text-xl text-green-700 mb-8">
              Você tem acesso completo a todos os recursos exclusivos
            </p>
            <div className="inline-flex items-center px-6 py-3 bg-green-500 text-white rounded-full">
              <Crown className="w-5 h-5 mr-2" />
              <span className="font-semibold">Status: Premium Ativo</span>
            </div>
          </div>

          {/* Life-Saving Tips Banner - Prominent placement */}
          <div className="mb-16">
            <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden">
              {/* Animated background elements */}
              <div className="absolute top-0 left-0 w-full h-full opacity-20">
                <div className="absolute top-4 left-4 w-16 h-16 bg-white rounded-full animate-pulse"></div>
                <div className="absolute top-8 right-8 w-12 h-12 bg-white rounded-full animate-pulse delay-500"></div>
                <div className="absolute bottom-6 left-1/3 w-8 h-8 bg-white rounded-full animate-pulse delay-1000"></div>
              </div>
              
              <div className="relative z-10 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-white bg-opacity-20 rounded-full backdrop-blur-sm animate-bounce">
                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-pulse">
                  🌟 DICAS PARA UMA VIDA MELHOR
                </h2>
                
                <p className="text-xl md:text-2xl mb-6 text-yellow-100 font-semibold">
                  Técnicas que transformam sua qualidade de vida diária
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm">
                    <div className="text-2xl mb-2">😴</div>
                    <div className="font-bold text-sm">SONO REPARADOR</div>
                    <div className="text-xs opacity-90">Técnicas para dormir melhor</div>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm">
                    <div className="text-2xl mb-2">🧘</div>
                    <div className="font-bold text-sm">CALMA INTERIOR</div>
                    <div className="text-xs opacity-90">Equilíbrio emocional</div>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm">
                    <div className="text-2xl mb-2">⚡</div>
                    <div className="font-bold text-sm">ENERGIA VITAL</div>
                    <div className="text-xs opacity-90">Vitalidade e disposição</div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => onPageChange('whatsapp-consultation')}
                    className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-2xl"
                  >
                    💬 CONSULTA ESPECIALIZADA
                  </button>
                  <button
                    onClick={() => onPageChange('acupressure')}
                    className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white hover:text-blue-600 transition-all duration-200 backdrop-blur-sm"
                  >
                    🫴 PONTOS PREMIUM
                  </button>
                </div>
                
                <div className="mt-6 bg-blue-600 bg-opacity-30 rounded-xl p-4 backdrop-blur-sm">
                  <p className="text-sm font-semibold text-yellow-100">
                    👑 EXCLUSIVO PREMIUM: Técnicas avançadas baseadas em 15+ anos de experiência clínica para transformar sua qualidade de vida
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Features Access */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* WhatsApp Consultation */}
            <div 
              onClick={() => onPageChange('whatsapp-consultation')}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-green-200 hover:border-green-300"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors">
                  <MessageCircle className="w-8 h-8 text-green-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900">Consulta Especializada</h3>
                  <p className="text-green-600 font-medium">Disponível Agora</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Formulário detalhado para casos complexos com atendimento personalizado via WhatsApp
              </p>
              <div className="flex items-center text-green-600 font-medium group-hover:text-green-700">
                <span>Acessar formulário</span>
                <Zap className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Premium Points */}
            <div 
              onClick={() => onPageChange('acupressure')}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-purple-200 hover:border-purple-300"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors">
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900">Pontos Exclusivos</h3>
                  <p className="text-purple-600 font-medium">11 Pontos Premium</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Acesso completo a pontos especializados: Septicemia, ATM, Cranioterapia e Neurologia
              </p>
              <div className="flex items-center text-purple-600 font-medium group-hover:text-purple-700">
                <span>Explorar pontos</span>
                <Zap className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Coming Soon Features */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gray-100 rounded-xl">
                  <Brain className="w-8 h-8 text-purple-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900">Recomendações IA</h3>
                  <p className="text-purple-600 font-medium">Demonstração Disponível</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Inteligência artificial que analisa seus padrões e sugere terapias personalizadas
              </p>
              <div className="flex items-center text-purple-600 font-medium">
                <button
                  onClick={() => setShowAIPanel(true)}
                  className="flex items-center space-x-2 bg-purple-100 hover:bg-purple-200 px-4 py-2 rounded-lg transition-colors"
                >
                  <Brain className="w-4 h-4" />
                  <span>Ver Demonstração</span>
                </button>
              </div>
            </div>
          </div>

          {/* Premium Stats */}
          <div className="bg-gradient-to-r from-white to-gray-50 rounded-3xl shadow-2xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Seus Benefícios Premium
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-2">11</div>
                <div className="text-sm text-gray-600">Pontos Exclusivos</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent mb-2">24/7</div>
                <div className="text-sm text-gray-600">Suporte WhatsApp</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent mb-2">∞</div>
                <div className="text-sm text-gray-600">Uso Ilimitado</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">🔜</div>
                <div className="text-sm text-gray-600">Novos Recursos</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* AI Recommendations Panel */}
        <AIRecommendationsPanel 
          isVisible={showAIPanel} 
          onClose={() => setShowAIPanel(false)} 
        />
      </div>
    );
  }

  const premiumFeatures = [
    {
      id: 'life-saving-tips',
      icon: (
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      title: '🚨 RECURSOS PREMIUM EXCLUSIVOS',
      description: 'Técnicas que podem salvar sua vida',
      benefits: [
        '🫁 Respiração de emergência para crises de pânico',
        '🫴 Pontos de alívio imediato para dor aguda',
        '🧠 Técnicas de ancoragem para ansiedade severa',
        '⚡ Baseado em 15+ anos de experiência clínica'
      ],
      status: 'emergency',
      action: () => onPageChange('acupressure'),
      isLifeSaving: true
    },
    {
      id: 'whatsapp-consultation',
      icon: <MessageCircle className="w-8 h-8 text-green-600" />,
      title: 'Consulta Especializada',
      description: 'Atendimento personalizado via WhatsApp com profissional qualificado',
      benefits: [
        'Formulário médico detalhado',
        'Resposta em até 24h',
        'Acompanhamento personalizado',
        'Casos complexos e específicos'
      ],
      status: 'active',
      action: () => onPageChange('whatsapp-consultation')
    },
    {
      id: 'premium-points',
      icon: <Target className="w-8 h-8 text-purple-600" />,
      title: 'Pontos Exclusivos Premium',
      description: '11 pontos especializados para condições específicas',
      benefits: [
        '🩸 Septicemia (3 pontos)',
        '🦷 ATM (3 pontos)',
        '🧠 Cranioterapia (3 pontos)',
        '⚡ Neurologia (2 pontos)'
      ],
      status: 'active',
      action: () => onPageChange('acupressure')
    },
    {
      id: 'ai-recommendations',
      icon: <Brain className="w-8 h-8 text-blue-600" />,
      title: 'Recomendações IA',
      description: 'Inteligência artificial personalizada para seu perfil',
      benefits: [
        'Análise de padrões comportamentais',
        'Sugestões de horários otimizados',
        'Pontos mais eficazes para você',
        'Rotinas personalizadas'
      ],
      status: 'demo',
      action: () => setShowAIPanel(true)
    },
    {
      id: 'sound-library',
      icon: <Zap className="w-8 h-8 text-orange-600" />,
      title: 'Biblioteca de Sons Premium',
      description: 'Mais de 50 sons + integração Spotify',
      benefits: [
        'Sons binaurais terapêuticos',
        'Mantras e vibrações sagradas',
        'Integração Spotify Premium',
        'Frequências personalizadas'
      ],
      status: 'coming-soon',
      action: () => onPageChange('sounds')
    },
    {
      id: 'offline-mode',
      icon: <Shield className="w-8 h-8 text-indigo-600" />,
      title: 'Modo Offline Avançado',
      description: 'Funcionalidades completas sem internet',
      benefits: [
        'Todos os pontos offline',
        'Timer sincronizado',
        'Histórico local',
        'Sincronização automática'
      ],
      status: 'coming-soon',
      action: () => {}
    }
  ];

  const pricingPlans = [
    {
      id: 'monthly',
      name: 'Premium Mensal',
      price: 'R$ 29,90',
      period: '/mês',
      features: [
        'Acesso a todos os 20 pontos de acupressão',
        'Consultas WhatsApp especializadas',
        'Terapia integrada completa',
        'Suporte prioritário',
        'Recursos em desenvolvimento'
      ],
      popular: false,
      savings: null
    },
    {
      id: 'annual',
      name: 'Premium Anual',
      price: 'R$ 297,00',
      period: '/ano',
      originalPrice: 'R$ 358,80',
      discount: '17% OFF',
      features: [
        'Tudo do plano mensal',
        'Economia de R$ 61,80 por ano',
        'Acesso prioritário a novos recursos',
        'Suporte VIP',
        'Garantia de satisfação'
      ],
      popular: true,
      savings: 'R$ 61,80'
    },
    {
      id: 'lifetime',
      name: 'Premium Vitalício',
      price: 'R$ 997,00',
      period: 'pagamento único',
      originalPrice: 'R$ 1.794,00',
      discount: '44% OFF',
      features: [
        'Acesso vitalício a todos os recursos',
        'Economia de R$ 797,00',
        'Todos os recursos futuros inclusos',
        'Suporte prioritário vitalício',
        'Melhor custo-benefício'
      ],
      popular: false,
      savings: 'R$ 797,00'
    }
  ];

  const testimonials = [
    {
      name: 'Maria S.',
      location: 'São Paulo',
      rating: 5,
      text: 'As consultas WhatsApp mudaram minha vida! Atendimento excepcional e resultados rápidos.'
    },
    {
      name: 'João M.',
      location: 'Rio de Janeiro', 
      rating: 5,
      text: 'Os pontos premium resolveram minha dor crônica. Investimento que vale cada centavo!'
    },
    {
      name: 'Ana L.',
      location: 'Belo Horizonte',
      rating: 5,
      text: 'Suporte incrível e técnicas que realmente funcionam. Recomendo para todos!'
    }
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    
    // Preparar dados do pagamento PIX
    const plan = pricingPlans.find(p => p.id === planId);
    if (plan) {
      const amount = parseFloat(plan.price.replace('R$ ', '').replace('.', '').replace(',', '.'));
      setPixPaymentData({
        amount,
        description: `XZenPress Premium - ${plan.name}`,
        orderId: `XZP-${Date.now()}-${planId.toUpperCase()}`
      });
    }
    
    setShowPayment(true);
  };

  const handlePayment = () => {
    // Simular processamento de pagamento bem-sucedido
    console.log('💳 Processando pagamento...');
    trackPremiumUpgrade(selectedPlan, paymentMethod);
    setTimeout(() => {
      console.log('✅ Pagamento confirmado, ativando Premium...');
      alert(`Pagamento ${paymentMethod.toUpperCase()} confirmado! Bem-vindo ao Premium!`);
      upgradeToPremium();
      setShowPayment(false);
    }, 2000);
  };

  const handlePixPaymentSuccess = (paymentData: any) => {
    console.log('🎯 PIX confirmado:', paymentData);
    trackPremiumUpgrade(selectedPlan, 'pix');
    alert('Pagamento PIX confirmado! Bem-vindo ao Premium!');
    upgradeToPremium();
    setShowPayment(false);
  };

  const handlePixPaymentError = (error: string) => {
    console.error('Erro no pagamento PIX:', error);
  };

  if (showPayment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <Crown className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Finalizar Pagamento Premium
              </h1>
              <p className="text-gray-600">
                {pricingPlans.find(p => p.id === selectedPlan)?.name} - {pricingPlans.find(p => p.id === selectedPlan)?.price}
              </p>
            </div>

            {/* Payment Methods */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Escolha o método de pagamento:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setPaymentMethod('pix')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === 'pix' 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Smartphone className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="font-semibold text-gray-800">PIX</div>
                    <div className="text-sm text-gray-600">Instantâneo e seguro</div>
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod('credit')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === 'credit' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <CreditCard className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="font-semibold text-gray-800">Cartão</div>
                    <div className="text-sm text-gray-600">Visa, Master, Amex</div>
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod('crypto')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === 'crypto' 
                      ? 'border-orange-500 bg-orange-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Bitcoin className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="font-semibold text-gray-800">Crypto</div>
                    <div className="text-sm text-gray-600">Bitcoin, Ethereum</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Payment Details */}
            {paymentMethod === 'pix' && pixPaymentData && (
              <div className="bg-green-50 rounded-xl p-6 mb-6">
                <h4 className="font-semibold text-green-800 mb-4">Pagamento via PIX</h4>
                <div className="bg-white rounded-lg p-3 mb-4 border border-green-200">
                  <div className="flex items-center space-x-2 text-green-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">PIX Real Ativo - Chave: aleksayevacupress@gmail.com</span>
                  </div>
                </div>
                <PixPaymentComponent
                  amount={pixPaymentData.amount}
                  description={pixPaymentData.description}
                  orderId={pixPaymentData.orderId}
                  customerEmail={user?.email}
                  customerName={user?.name}
                  onPaymentSuccess={handlePixPaymentSuccess}
                  onPaymentError={handlePixPaymentError}
                />
              </div>
            )}

            {paymentMethod === 'credit' && pixPaymentData && (
              <div className="bg-blue-50 rounded-xl p-6 mb-6">
                <h4 className="font-semibold text-blue-800 mb-4">Pagamento com Cartão</h4>
                <div className="bg-white rounded-lg p-3 mb-4 border border-green-200">
                  <div className="flex items-center space-x-2 text-green-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">✅ Stripe Real Ativo - Cartões Funcionais</span>
                  </div>
                </div>
                <CreditCardPaymentComponent
                  amount={pixPaymentData.amount}
                  description={pixPaymentData.description}
                  orderId={pixPaymentData.orderId}
                  customerEmail={user?.email}
                  customerName={user?.name}
                  onPaymentSuccess={(paymentData) => {
                    console.log('💳 Cartão aprovado:', paymentData);
                    alert('Pagamento com cartão aprovado! Bem-vindo ao Premium!');
                    upgradeToPremium();
                    setShowPayment(false);
                  }}
                  onPaymentError={(error) => {
                    console.error('Erro no pagamento com cartão:', error);
                  }}
                />
              </div>
            )}

            {paymentMethod === 'crypto' && (
              <div className="bg-orange-50 rounded-xl p-6 mb-6">
                <h4 className="font-semibold text-orange-800 mb-4">Pagamento com Criptomoedas</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span>Bitcoin (BTC)</span>
                    <span className="font-mono text-sm">bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span>Ethereum (ETH)</span>
                    <span className="font-mono text-sm">0x742d35Cc6634C0532925a3b8D4C9db</span>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setShowPayment(false)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Voltar
              </button>
              <button
                onClick={handlePayment}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all font-semibold"
              >
                Confirmar Pagamento
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 pt-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-600 via-orange-500 to-yellow-500 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
                <Crown className="w-16 h-16 text-yellow-200" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Desbloqueie Todo o Potencial
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-yellow-100">
              Acesso completo a consultas especializadas e pontos terapêuticos exclusivos
            </p>
            <div className="inline-flex items-center px-6 py-3 bg-white/20 rounded-full backdrop-blur-sm">
              <Crown className="w-5 h-5 mr-2 text-yellow-200" />
              <span className="font-semibold">Upgrade para Premium</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Premium Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Recursos Premium Exclusivos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {premiumFeatures.map((feature) => (
              <div
                key={feature.id}
                className={`rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 ${
                  feature.isLifeSaving
                    ? 'bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white border-red-300 hover:border-red-400 relative overflow-hidden'
                    : feature.status === 'active' 
                    ? 'bg-white border-green-200 hover:border-green-300' 
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
                onClick={feature.action}
              >
                {feature.isLifeSaving && (
                  <div className="absolute top-0 left-0 w-full h-full opacity-20">
                    <div className="absolute top-2 left-2 w-8 h-8 bg-white rounded-full animate-pulse"></div>
                    <div className="absolute top-4 right-4 w-6 h-6 bg-white rounded-full animate-pulse delay-500"></div>
                    <div className="absolute bottom-3 left-1/3 w-4 h-4 bg-white rounded-full animate-pulse delay-1000"></div>
                  </div>
                )}
                
                <div className="flex items-center justify-between mb-6">
                  <div className={`flex items-center justify-center w-16 h-16 rounded-2xl ${
                    feature.isLifeSaving 
                      ? 'bg-white bg-opacity-20 backdrop-blur-sm' 
                      : 'bg-gray-50'
                  }`}>
                    {feature.icon}
                  </div>
                  {feature.status === 'active' ? (
                    <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                      <CheckCircle className="w-3 h-3" />
                      <span>Disponível</span>
                    </div>
                  ) : feature.status === 'demo' ? (
                    <div className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                      <Brain className="w-3 h-3" />
                      <span>Demo</span>
                    </div>
                  ) : feature.status === 'emergency' ? (
                    <div className="flex items-center space-x-1 bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm animate-pulse">
                      <span>🆘</span>
                      <span>EMERGÊNCIA</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">
                      <Clock className="w-3 h-3" />
                      <span>Em breve</span>
                    </div>
                  )}
                </div>
                
                <h3 className={`text-xl font-semibold mb-4 ${
                  feature.isLifeSaving ? 'text-white animate-pulse' : 'text-gray-900'
                }`}>
                  {feature.title}
                </h3>
                
                <p className={`leading-relaxed ${
                  feature.isLifeSaving ? 'text-yellow-100' : 'text-gray-600'
                }`}>
                  {feature.description}
                </p>

                {feature.isLifeSaving && (
                  <div className="mt-6 bg-white text-red-600 px-4 py-2 rounded-full text-sm font-bold text-center animate-pulse shadow-lg">
                    🌟 RECURSOS PREMIUM
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Planos Premium
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Escolha o plano ideal para sua jornada de bem-estar
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-lg relative ${
                  plan.popular 
                    ? 'border-2 border-orange-500 transform scale-105' 
                    : 'border border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Mais Popular
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  {plan.originalPrice && (
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <span className="text-gray-500 line-through">{plan.originalPrice}</span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-semibold">
                        {plan.discount}
                      </span>
                    </div>
                  )}
                  {plan.savings && (
                    <div className="text-green-600 font-semibold text-sm">
                      Economize {plan.savings}
                    </div>
                  )}
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => handlePlanSelect(plan.id)}
                  className={`w-full py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>Escolher Plano</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            O que nossos usuários dizem
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div className="text-gray-600 text-sm">
                  <div className="text-yellow-600 font-semibold mb-1">👑 Exclusivo para usuários Premium</div>
                  <div>{testimonial.name}, {testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Perguntas Frequentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Como funciona o atendimento WhatsApp?</h3>
              <p className="text-gray-600 text-sm mb-4">Você preenche um formulário detalhado e recebe resposta personalizada em até 24h via WhatsApp.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Posso cancelar a qualquer momento?</h3>
              <p className="text-gray-600 text-sm mb-4">Sim, você pode cancelar sua assinatura a qualquer momento sem taxas adicionais.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Os pontos premium são seguros?</h3>
              <p className="text-gray-600 text-sm mb-4">Todos os pontos são baseados na Medicina Tradicional Chinesa com 15+ anos de experiência clínica.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Há garantia de resultados?</h3>
              <p className="text-gray-600 text-sm mb-4">Oferecemos 30 dias de garantia. Se não ficar satisfeito, devolvemos seu dinheiro.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* AI Recommendations Panel */}
      <AIRecommendationsPanel 
        isVisible={showAIPanel} 
        onClose={() => setShowAIPanel(false)} 
      />
    </div>
  );
};