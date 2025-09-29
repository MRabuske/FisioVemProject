import { useState } from 'react';
import { ArrowLeft, Star, MapPin, Clock, Shield, Calendar, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/Layout/Header';
import { mockPhysiotherapists } from '@/data/mockData';
import { Physiotherapist } from '@/types';

interface PhysiotherapistProfileProps {
  physiotherapistId?: string;
  onBack: () => void;
  onBookAppointment: (physiotherapistId: string) => void;
}

export const PhysiotherapistProfile = ({ 
  physiotherapistId = 'physio_001', 
  onBack, 
  onBookAppointment 
}: PhysiotherapistProfileProps) => {
  const physiotherapist = mockPhysiotherapists.find(p => p.id === physiotherapistId);
  const [activeTab, setActiveTab] = useState<'about' | 'reviews'>('about');
  
  if (!physiotherapist) {
    return <div>Fisioterapeuta não encontrado</div>;
  }

  const getAvailabilityDay = (dayOfWeek: number) => {
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    return days[dayOfWeek];
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        title={physiotherapist.name}
        showBackButton
        onBack={onBack}
      />
      
      <div className="px-4 py-6 space-y-6">
        {/* Profile Header */}
        <Card className="bg-gradient-card">
          <CardContent className="p-6">
            <div className="flex gap-4 mb-4">
              <div className="relative">
                <img
                  src={physiotherapist.profileImage}
                  alt={physiotherapist.name}
                  className="w-20 h-20 rounded-2xl object-cover"
                />
                {physiotherapist.isVerified && (
                  <div className="absolute -top-2 -right-2 bg-success rounded-full p-1">
                    <Shield className="w-4 h-4 text-success-foreground" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <h2 className="text-xl font-bold text-foreground mb-1">
                  {physiotherapist.name}
                </h2>
                
                {/* Rating */}
                <div className="flex items-center mb-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-medium mr-1">{physiotherapist.rating}</span>
                  <span className="text-sm text-muted-foreground">
                    ({physiotherapist.totalReviews} avaliações)
                  </span>
                </div>

                {/* Experience & Distance */}
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="mr-4">{physiotherapist.experience} anos</span>
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>2.5 km de distância</span>
                </div>
              </div>
            </div>

            {/* Specialties */}
            <div className="flex flex-wrap gap-2 mb-4">
              {physiotherapist.specialties.map((specialty) => (
                <Badge key={specialty} variant="secondary" className="bg-primary/10 text-primary">
                  {specialty}
                </Badge>
              ))}
            </div>

            {/* Price */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-primary">
                  R$ {physiotherapist.pricePerSession.toFixed(0)}
                </span>
                <span className="text-muted-foreground ml-1">/sessão</span>
              </div>
              
              <Button 
                onClick={() => onBookAppointment(physiotherapist.id)}
                className="bg-gradient-primary px-6"
              >
                Agendar consulta
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab('about')}
            className={`flex-1 py-3 text-center font-medium border-b-2 transition-colors ${
              activeTab === 'about'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground'
            }`}
          >
            Sobre
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex-1 py-3 text-center font-medium border-b-2 transition-colors ${
              activeTab === 'reviews'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground'
            }`}
          >
            Avaliações
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'about' && (
          <div className="space-y-6">
            {/* Bio */}
            {physiotherapist.bio && (
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">Sobre o profissional</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {physiotherapist.bio}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Credentials */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-success" />
                  Credenciais Verificadas
                </h3>
                <div className="space-y-2">
                  {physiotherapist.credentials.map((credential, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-success rounded-full mr-3"></div>
                      <span>{credential}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-primary" />
                  Disponibilidade
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {physiotherapist.availability.map((slot) => (
                    <div
                      key={slot.dayOfWeek}
                      className="flex justify-between items-center py-2 px-3 bg-muted/50 rounded-lg"
                    >
                      <span className="text-sm font-medium">
                        {getAvailabilityDay(slot.dayOfWeek)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {slot.startTime} - {slot.endTime}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4">
            {/* Reviews Summary */}
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-primary mb-1">
                  {physiotherapist.rating}
                </div>
                <div className="flex justify-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= physiotherapist.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Baseado em {physiotherapist.totalReviews} avaliações
                </p>
              </CardContent>
            </Card>

            {/* Sample Reviews */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-primary">M</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">Maria S.</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      "Excelente profissional! Muito atenciosa e competente. O atendimento foi perfeito."
                    </p>
                    <span className="text-xs text-muted-foreground">Há 2 dias</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-accent">C</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">Carlos R.</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      "Profissional muito qualificada. Os exercícios realizados me ajudaram muito na recuperação."
                    </p>
                    <span className="text-xs text-muted-foreground">Há 1 semana</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Contact Button */}
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
        >
          <Phone className="w-4 h-4" />
          Entrar em contato
        </Button>
      </div>
    </div>
  );
};