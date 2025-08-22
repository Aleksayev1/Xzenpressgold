import React, { useState } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import { BreathingExercise } from './components/BreathingExercise';
import { AcupressurePage } from './components/AcupressurePage';
import { WhatsAppConsultationPage } from './components/WhatsAppConsultationPage';
import { PremiumStructure } from './components/PremiumStructure';
import { CorporatePlansPage } from './components/CorporatePlansPage';
import { DashboardPage } from './components/DashboardPage';
import { SoundsLibraryPage } from './components/SoundsLibraryPage';
import { ProgressTrackingPage } from './components/ProgressTrackingPage';
import { PersonalizationPage } from './components/PersonalizationPage';
import { DataDeletionPage } from './components/DataDeletionPage';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { GoogleAnalytics } from './components/GoogleAnalytics';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    console.log('🔍 Renderizando página:', currentPage);
    
    switch (currentPage) {
      case 'home':
        return <HomePage onPageChange={setCurrentPage} />;
      case 'login':
        return <LoginPage onPageChange={setCurrentPage} />;
      case 'breathing':
        return <BreathingExercise onPageChange={setCurrentPage} />;
      case 'acupressure':
        return <AcupressurePage onPageChange={setCurrentPage} />;
      case 'premium':
        return <PremiumStructure onPageChange={setCurrentPage} />;
      case 'whatsapp-consultation':
        return <WhatsAppConsultationPage onPageChange={setCurrentPage} />;
      case 'corporate':
        return <CorporatePlansPage onPageChange={setCurrentPage} />;
      case 'dashboard':
        return <DashboardPage onPageChange={setCurrentPage} />;
      case 'sounds':
        return <SoundsLibraryPage onPageChange={setCurrentPage} />;
      case 'progress':
        return <ProgressTrackingPage onPageChange={setCurrentPage} />;
      case 'personalization':
        return <PersonalizationPage onPageChange={setCurrentPage} />;
      case 'data-deletion':
        return <DataDeletionPage onPageChange={setCurrentPage} />;
      default:
        console.log('⚠️ Página não encontrada, redirecionando para home:', currentPage);
        return <HomePage onPageChange={setCurrentPage} />;
    }
  };

  console.log('🚀 App iniciando, página atual:', currentPage);

  return (
    <LanguageProvider>
      <AuthProvider>
        <GoogleAnalytics />
        <div className="min-h-screen bg-gray-50">
          <Header currentPage={currentPage} onPageChange={setCurrentPage} />
          {renderPage()}
        </div>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;