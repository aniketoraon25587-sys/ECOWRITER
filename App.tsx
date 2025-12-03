import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { GeneratorForm } from './components/GeneratorForm';
import { LoadingScreen } from './components/LoadingScreen';
import { ResultsView } from './components/ResultsView';
import { PaymentModal } from './components/PaymentModal';
import { AppState, ProductFormData, GeneratedContent } from './types';
import { generateProductDescription } from './services/geminiService';

const App: React.FC = () => {
  const [view, setView] = useState<AppState>('LANDING');
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [lastFormData, setLastFormData] = useState<ProductFormData | null>(null);
  
  // Payment Modal State
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: string } | null>(null);

  const startCreation = () => setView('FORM');

  const handlePlanSelect = (plan: { name: string; price: string }) => {
    if (plan.price === '₹0') {
        // Free plan, go directly to app
        setView('FORM');
    } else {
        // Paid plan, show payment modal
        setSelectedPlan(plan);
        setShowPaymentModal(true);
    }
  };

  const handleFormSubmit = async (data: ProductFormData) => {
    setLastFormData(data);
    setView('LOADING');
    try {
      const content = await generateProductDescription(data);
      setGeneratedContent(content);
      setView('RESULTS');
    } catch (error) {
      console.error("Generation failed", error);
      alert("Something went wrong with the AI. Please try again.");
      setView('FORM');
    }
  };

  const handleBackToForm = () => setView('FORM');

  const handleReset = () => {
    setGeneratedContent(null);
    setView('LANDING');
  };

  const handleRegenerate = async () => {
    if (lastFormData) {
        await handleFormSubmit(lastFormData);
    } else {
        setView('FORM');
    }
  };

  return (
    <div className="bg-dark min-h-screen text-white font-sans selection:bg-primary/30 relative">
      {view === 'LANDING' && (
        <Hero 
            onStart={startCreation} 
            onPlanSelect={handlePlanSelect} 
        />
      )}
      {view === 'FORM' && (
        <GeneratorForm 
            onSubmit={handleFormSubmit} 
            onBack={handleReset} 
            isLoading={false} 
        />
      )}
      {view === 'LOADING' && <LoadingScreen />}
      {view === 'RESULTS' && generatedContent && (
        <ResultsView 
            content={generatedContent} 
            onReset={handleBackToForm} 
            onRegenerate={handleRegenerate}
        />
      )}

      {/* Payment Modal */}
      {selectedPlan && (
        <PaymentModal 
            isOpen={showPaymentModal}
            onClose={() => setShowPaymentModal(false)}
            plan={selectedPlan}
        />
      )}
    </div>
  );
};

export default App;
