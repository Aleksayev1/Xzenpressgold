import React from 'react';
import { Crown, MessageCircle, FileText, Zap, Star, CheckCircle } from 'lucide-react';

interface PremiumPageProps {
  onPageChange: (page: string) => void;
}

export const PremiumPage: React.FC<PremiumPageProps> = ({ onPageChange }) => {
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
              <span className="font-semibold">Premium</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Life-Saving Tips CTA - DESTAQUE */}
          <div 
            onClick={() => onPageChange('acupressure')}
            className="group bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 cursor-pointer border-2 border-red-300 hover:border-red-400 relative overflow-hidden"
          >
            {/* Animated background */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20">
              <div className="absolute top-2 left-2 w-8 h-8 bg-white rounded-full animate-pulse"></div>
              <div className="absolute top-4 right-4 w-6 h-6 bg-white rounded-full animate-pulse delay-500"></div>
              <div className="absolute bottom-3 left-1/3 w-4 h-4 bg-white rounded-full animate-pulse delay-1000"></div>
            </div>
            
            <div className="relative z-10 text-white text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-white bg-opacity-20 rounded-full backdrop-blur-sm animate-bounce">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 animate-pulse">
                🚨 DICAS QUE PODEM SALVAR SUA VIDA
              </h3>
              <p className="text-yellow-100 text-sm mb-4 font-semibold">
                Técnicas de emergência para crises de ansiedade, pânico e dor aguda
              </p>
              <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                <div className="bg-white bg-opacity-20 rounded-lg p-2 backdrop-blur-sm">
                  <div className="text-lg mb-1">🫁</div>
                  <div className="font-bold">PÂNICO</div>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-2 backdrop-blur-sm">
                  <div className="text-lg mb-1">🫴</div>
                  <div className="font-bold">DOR</div>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-2 backdrop-blur-sm">
                  <div className="text-lg mb-1">🧠</div>
                  <div className="font-bold">ANSIEDADE</div>
                </div>
              </div>
              <div className="bg-white text-red-600 px-4 py-2 rounded-full text-sm font-bold hover:bg-gray-100 transition-all animate-pulse shadow-lg">
                🆘 CLIQUE JÁ - ACESSO GRATUITO
              </div>
              <div className="mt-2 text-xs text-yellow-100 font-medium">
                ⚡ 9 pontos gratuitos • Sem login necessário
              </div>
            </div>
          </div>

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
                <h3 className="text-xl font-bold text-gray-900">Formulário Especializado</h3>
                <p className="text-green-600 font-medium">Consulta via WhatsApp</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Formulário detalhado para casos complexos que precisam de atenção personalizada
            </p>
            <div className="flex items-center text-green-600 font-medium group-hover:text-green-700">
              <span>Acessar formulário</span>
              <Zap className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Exclusive Points */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-amber-200">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-amber-100 rounded-xl">
                <Star className="w-8 h-8 text-amber-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold text-gray-900">Pontos Exclusivos</h3>
                <p className="text-amber-600 font-medium">Acesso Premium</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Pontos de acupressão avançados e técnicas especializadas para casos específicos
            </p>
            <div className="flex items-center text-amber-600 font-medium">
              <span>Em breve</span>
              <Star className="w-4 h-4 ml-2" />
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Benefícios Premium
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="p-3 bg-green-100 rounded-xl w-fit mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Atendimento Especializado</h3>
              <p className="text-gray-600 text-sm">Profissional qualificado com 15+ anos de experiência</p>
            </div>
            <div className="text-center">
              <div className="p-3 bg-blue-100 rounded-xl w-fit mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Resposta Rápida</h3>
              <p className="text-gray-600 text-sm">Prioridade de resposta máxima</p>
            </div>
            <div className="text-center">
              <div className="p-3 bg-purple-100 rounded-xl w-fit mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">WhatsApp Direto</h3>
              <p className="text-gray-600 text-sm">Atendimento personalizado via mensagem</p>
            </div>
            <div className="text-center">
              <div className="p-3 bg-amber-100 rounded-xl w-fit mx-auto mb-4">
                <Star className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Conteúdo Exclusivo</h3>
              <p className="text-gray-600 text-sm">Acesso a técnicas e pontos avançados</p>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="mt-16 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-xl text-gray-700 mb-4 italic">
              "Atendimento excepcional! Resolveu minha dor crônica em poucas sessões."
            </blockquote>
            <cite className="text-gray-600 font-medium">Maria S., São Paulo</cite>
          </div>
        </div>
      </div>
    </div>
  );
};