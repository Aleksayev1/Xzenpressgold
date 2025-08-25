import { useState, useEffect } from 'react';
import { createCreditCardService, CreditCardData, PaymentData, PaymentResult } from '../services/creditCardService';

export const useCreditCardPayment = () => {
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [isStripeReady, setIsStripeReady] = useState(false);

  const creditCardService = createCreditCardService();

  // Verificar se Stripe está configurado
  useEffect(() => {
    const checkStripe = async () => {
      try {
        const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
        const provider = import.meta.env.VITE_CREDIT_CARD_PROVIDER;
        
        console.log('🔍 Verificando configuração Stripe:', {
          hasKey: !!stripeKey,
          keyPrefix: stripeKey?.substring(0, 10) + '...',
          provider: provider
        });
        
        if (stripeKey && stripeKey.startsWith('pk_') && provider === 'stripe') {
          setIsStripeReady(true);
          console.log('✅ Stripe configurado e pronto');
        } else {
          console.log('⚠️ Stripe não configurado completamente, usando modo demo');
          console.log('Configuração atual:', { provider, hasValidKey: stripeKey?.startsWith('pk_') });
        }
      } catch (error) {
        console.error('Erro ao verificar Stripe:', error);
      }
    };
    checkStripe();
  }, []);

  const processPayment = async (cardData: CreditCardData, paymentData: PaymentData) => {
    console.log('💳 Iniciando processamento de pagamento...');
    setLoading(true);
    setError('');
    setPaymentResult(null);
    
    try {
      console.log(`💳 Processando via ${creditCardService.getProviderName()}`);
      
      const result = await creditCardService.processPayment(cardData, paymentData);
      console.log('📊 Resultado do processamento:', result);
      
      setPaymentResult(result);
      
      if (result.status === 'declined' || result.status === 'error') {
        setError(result.errorMessage || 'Pagamento recusado');
      }
      
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro no processamento do pagamento';
      console.error('❌ Erro no hook de pagamento:', err);
      setError(errorMessage);
      
      // CRÍTICO: NUNCA fazer throw - sempre retornar resultado estruturado
      const errorResult: PaymentResult = {
        id: `error_${Date.now()}`,
        status: 'error',
        amount: paymentData.amount,
        currency: paymentData.currency,
        orderId: paymentData.orderId,
        paymentMethod: 'credit_card',
        processedAt: new Date().toISOString(),
        errorMessage
      };
      console.log('📊 Hook retornando erro estruturado:', errorResult);
      setPaymentResult(errorResult);
      return errorResult;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setPaymentResult(null);
    setError('');
    setLoading(false);
  };

  return {
    paymentResult,
    loading,
    error,
    isStripeReady,
    processPayment,
    reset,
    providerName: creditCardService.getProviderName()
  };
};