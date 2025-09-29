import { useState } from 'react';
import { ChevronLeft, ChevronRight, Home, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OnboardingStep {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  color: string;
}

const onboardingSteps: OnboardingStep[] = [
  {
    icon: Home,
    title: 'Atendimento Domiciliar',
    description: 'Receba atendimento de um fisioterapeuta no conforto da sua casa, sem precisar se deslocar.',
    color: 'text-primary'
  },
  {
    icon: Shield,
    title: 'Profissionais Verificados',
    description: 'Todos os fisioterapeutas são certificados e passam por uma rigorosa verificação de credenciais.',
    color: 'text-accent'
  },
  {
    icon: Clock,
    title: 'Agendamento Flexível',
    description: 'Escolha o dia e horário que melhor se adequam à sua rotina, incluindo fins de semana.',
    color: 'text-success'
  }
];

interface OnboardingScreenProps {
  onComplete: () => void;
}

export const OnboardingScreen = ({ onComplete }: OnboardingScreenProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const isLastStep = currentStep === onboardingSteps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const step = onboardingSteps[currentStep];
  const Icon = step.icon;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Skip button */}
      <div className="flex justify-end p-4">
        <Button 
          variant="ghost" 
          onClick={onComplete}
          className="text-muted-foreground"
        >
          Pular
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-20">
        {/* Icon */}
        <div className={`mb-8 p-6 rounded-2xl bg-gradient-card shadow-lg`}>
          <Icon className={`w-16 h-16 ${step.color}`} />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-foreground mb-4">
          {step.title}
        </h2>

        {/* Description */}
        <p className="text-center text-muted-foreground text-lg leading-relaxed max-w-sm">
          {step.description}
        </p>
      </div>

      {/* Bottom Controls */}
      <div className="px-6 pb-8">
        {/* Progress Dots */}
        <div className="flex justify-center space-x-2 mb-6">
          {onboardingSteps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-normal ${
                index === currentStep 
                  ? 'w-8 bg-primary' 
                  : 'w-2 bg-muted'
              }`}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Anterior
          </Button>

          <Button
            onClick={handleNext}
            className="bg-gradient-primary flex items-center px-6"
          >
            {isLastStep ? 'Começar' : 'Próximo'}
            {!isLastStep && <ChevronRight className="w-4 h-4 ml-1" />}
          </Button>
        </div>
      </div>
    </div>
  );
};