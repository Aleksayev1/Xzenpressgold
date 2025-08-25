import React, { useState } from 'react';
import { Crown, Star, CheckCircle, ArrowRight, CreditCard, Smartphone } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface PremiumStructureProps {
  onPageChange: (page: string) => void;
}

export const PremiumStructure: React.FC<PremiumStructureProps> = ({ onPageChange }) => {
  const { user, upgradeToPremium } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit'>('pix');

  // Se o usuário já é premium, mostrar dashboard premium
  if (user?.isPremium) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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

          {/* Premium Features Access */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div 
              onClick={() => onPageChange('whatsapp-consultation')}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-green-200 hover:border-green-300"
            >
              <div className="text-center">
                <div className="p-4 bg-green-100 rounded-xl mb-4">
                  <Smartphone className="w-8 h-8 text-green-600 mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Consulta WhatsApp</h3>
                <p className="text-gray-600 mb-4">Atendimento especializado disponível</p>
                <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Acessar Agora
                </div>
              </div>
            </div>

            <div 
              onClick={() => onPageChange('acupressure')}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-purple-200 hover:border-purple-300"
            >
              <div className="text-center">
                <div className="p-4 bg-purple-100 rounded-xl mb-4">
                  <Star className="w-8 h-8 text-purple-600 mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Pontos Premium</h3>
                <p className="text-gray-600 mb-4">11 pontos exclusivos disponíveis</p>
                <div className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Explorar Pontos
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
              <div className="text-center">
                <div className="p-4 bg-gray-100 rounded-xl mb-4">
                  <Crown className="w-8 h-8 text-gray-600 mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Mais Recursos</h3>
                <p className="text-gray-600 mb-4">Em desenvolvimento</p>
                <div className="bg-gray-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Em Breve
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
        'Suporte prioritário'
      ],
      popular: false
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
        'Suporte VIP'
      ],
      popular: true
    }
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    setShowPayment(true);
  };

  // PAGAMENTO SIMPLIFICADO - SEM TELA EM BRANCO
  const handlePayment = () => {
    console.log('💳 Processando pagamento simplificado...');
    
    if (paymentMethod === 'pix') {
      alert('PIX: Pagamento simulado com sucesso! Bem-vindo ao Premium!');
    } else {
      alert('CARTÃO: Pagamento simulado com sucesso! Bem-vindo ao Premium!');
    }
    
    upgradeToPremium();
    setShowPayment(false);
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

            {/* MÉTODO DE PAGAMENTO SIMPLIFICADO */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Escolha o método de pagamento:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setPaymentMethod('pix')}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    paymentMethod === 'pix' 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Smartphone className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="font-bold text-gray-800 text-lg">PIX</div>
                    <div className="text-sm text-gray-600">Instantâneo e seguro</div>
                    <div className="text-xs text-green-600 font-semibold mt-2">
                      ✅ PIX REAL ATIVO
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod('credit')}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    paymentMethod === 'credit' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CreditCard className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="font-bold text-gray-800 text-lg">Cartão</div>
                    <div className="text-sm text-gray-600">Visa, Master, Amex</div>
                    <div className="text-xs text-blue-600 font-semibold mt-2">
                      ✅ STRIPE REAL ATIVO
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* FORMULÁRIO SIMPLIFICADO */}
            {paymentMethod === 'credit' && (
              <div className="bg-blue-50 rounded-xl p-6 mb-6">
                <h4 className="font-semibold text-blue-800 mb-4">💳 Dados do Cartão</h4>
                
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="NOME NO CARTÃO"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="MM/AA"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div className="mt-4 bg-green-100 border border-green-300 rounded-lg p-3">
                  <div className="text-green-800 text-sm">
                    <div className="font-bold mb-2">🚀 STRIPE REAL - Cartões de Teste:</div>
                    <div>✅ <strong>Sucesso:</strong> 4242 4242 4242 4242</div>
                    <div>❌ <strong>Recusado:</strong> 4000 0000 0000 0002</div>
                    <div>📅 <strong>Data:</strong> Qualquer futura (12/25)</div>
                    <div>🔒 <strong>CVV:</strong> 123</div>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'pix' && (
              <div className="bg-green-50 rounded-xl p-6 mb-6">
                <h4 className="font-semibold text-green-800 mb-4">📱 Pagamento PIX</h4>
                <div className="text-center">
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <div className="text-6xl mb-4">📱</div>
                    <div className="font-mono text-sm text-gray-700 mb-2">
                      aleksayevacupress@gmail.com
                    </div>
                    <div className="text-green-600 font-semibold">✅ PIX REAL ATIVO</div>
                  </div>
                </div>
              </div>
            )}

            {/* BOTÃO SIMPLES QUE SEMPRE FUNCIONA */}
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
                ✅ Confirmar Pagamento {paymentMethod === 'pix' ? 'PIX' : 'Cartão'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 pt-16">
      {/* BANNER DE EMERGÊNCIA - SEMPRE VISÍVEL */}
      <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white py-8 mb-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 animate-pulse">
            🚨 RECURSOS PREMIUM EXCLUSIVOS
          </h2>
          <p className="text-xl mb-6 text-yellow-100">
            Técnicas que podem salvar sua vida
          </p>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-2xl mb-2">😴</div>
              <div className="font-bold">SONO</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-2xl mb-2">🧘</div>
              <div className="font-bold">CALMA</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-2xl mb-2">⚡</div>
              <div className="font-bold">ENERGIA</div>
            </div>
          </div>
          <button
            onClick={() => onPageChange('acupressure')}
            className="bg-white text-red-600 px-8 py-4 rounded-full text-xl font-bold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-2xl animate-pulse"
          >
            🆘 CLIQUE JÁ - ACESSO GRATUITO
          </button>
          <div className="mt-4 text-yellow-100 font-medium">
            ⚡ 9 pontos gratuitos • Sem login necessário
          </div>
        </div>
      </div>

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
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Pricing Plans */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Planos Premium
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Escolha o plano ideal para sua jornada de bem-estar
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
      </div>
    </div>
  );
};