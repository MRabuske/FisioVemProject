import { useState } from 'react';
import { Star, ThumbsUp, MessageSquare, Calendar, Filter, Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MobileLayout } from '@/components/Layout/MobileLayout';

interface Evaluation {
  id: string;
  physiotherapistName: string;
  physiotherapistImage: string;
  rating: number;
  comment: string;
  date: string;
  specialty: string;
  helpful: number;
  status: 'published' | 'pending' | 'draft';
}

const mockEvaluations: Evaluation[] = [
  {
    id: '1',
    physiotherapistName: 'Dr. Carlos Silva',
    physiotherapistImage: '/placeholder.svg',
    rating: 5,
    comment: 'Excelente profissional! Muito atencioso e competente. O atendimento foi perfeito, chegou no horário e trouxe todos os equipamentos necessários. Recomendo!',
    date: '2024-09-25',
    specialty: 'Ortopedia',
    helpful: 12,
    status: 'published'
  },
  {
    id: '2',
    physiotherapistName: 'Dra. Ana Costa',
    physiotherapistImage: '/placeholder.svg',
    rating: 4,
    comment: 'Profissional muito qualificada. A sessão foi produtiva e já senti melhora na primeira consulta. Única observação é que chegou alguns minutos atrasada.',
    date: '2024-09-20',
    specialty: 'Neurologia',
    helpful: 8,
    status: 'published'
  },
  {
    id: '3',
    physiotherapistName: 'Dr. Pedro Oliveira',
    physiotherapistImage: '/placeholder.svg',
    rating: 0,
    comment: 'Muito Energético e dedicado. Gostei bastante do atendimento, explicou tudo muito bem e fez um plano de personalizado pra mim.',
    date: '2024-09-30',
    specialty: 'Esportiva',
    helpful: 0,
    status: 'pending'
  }
];

export const EvaluationsScreen = () => {
  const [activeTab, setActiveTab] = useState('todas');
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');

  const StarRating = ({ rating, onRatingChange, readonly = true }: { 
    rating: number; 
    onRatingChange?: (rating: number) => void;
    readonly?: boolean;
  }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating 
                ? 'text-yellow-400 fill-yellow-400' 
                : 'text-gray-300'
            } ${!readonly ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => !readonly && onRatingChange?.(star)}
          />
        ))}
      </div>
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'draft':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published':
        return 'Publicada';
      case 'pending':
        return 'Pendente';
      case 'draft':
        return 'Rascunho';
      default:
        return status;
    }
  };

  const filterEvaluations = (status: string) => {
    if (status === 'todas') return mockEvaluations;
    return mockEvaluations.filter(evaluation => evaluation.status === status);
  };

  const EvaluationCard = ({ evaluation }: { evaluation: Evaluation }) => (
    <Card className="p-4 space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={evaluation.physiotherapistImage} />
            <AvatarFallback>
              {evaluation.physiotherapistName.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">
              {evaluation.physiotherapistName}
            </h3>
            <p className="text-sm text-muted-foreground">
              {evaluation.specialty}
            </p>
            <div className="flex items-center space-x-2 mt-1">
              <StarRating rating={evaluation.rating} />
              <span className="text-sm text-muted-foreground">
                {new Date(evaluation.date).toLocaleDateString('pt-BR')}
              </span>
            </div>
          </div>
        </div>
        <Badge className={getStatusColor(evaluation.status)}>
          {getStatusText(evaluation.status)}
        </Badge>
      </div>

      {evaluation.comment && (
        <p className="text-sm text-foreground leading-relaxed">
          {evaluation.comment}
        </p>
      )}

      {evaluation.status === 'pending' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-sm text-yellow-800 mb-3">
            Complete sua avaliação para ajudar outros usuários!
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline" className="w-full">
                Avaliar Agora
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Avaliar {evaluation.physiotherapistName}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Sua avaliação:</label>
                  <div className="mt-2">
                    <StarRating 
                      rating={newRating} 
                      onRatingChange={setNewRating}
                      readonly={false}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Comentário:</label>
                  <Textarea
                    placeholder="Conte como foi sua experiência..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="mt-2"
                    rows={4}
                  />
                </div>
                <Button className="w-full">
                  Publicar Avaliação
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}

      {evaluation.status === 'published' && evaluation.helpful > 0 && (
        <div className="flex items-center space-x-2 pt-2 border-t border-border">
          <ThumbsUp className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {evaluation.helpful} pessoas acharam útil
          </span>
        </div>
      )}

      {evaluation.status === 'published' && (
        <div className="flex space-x-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            Editar
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            Excluir
          </Button>
        </div>
      )}
    </Card>
  );

  return (
    <MobileLayout showNavigation currentPage="reviews">
      <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Minhas Avaliações</h1>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4" />
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-gradient-primary">
                  <Plus className="w-4 h-4 mr-1" />
                  Avaliar
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Nova Avaliação</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Selecione um fisioterapeuta que você consultou para avaliar.
                  </p>
                  <Button className="w-full" variant="outline">
                    Selecionar Fisioterapeuta
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gradient-card p-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">
              {mockEvaluations.filter(e => e.status === 'published').length}
            </div>
            <div className="text-sm text-muted-foreground">Publicadas</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-600">
              {mockEvaluations.filter(e => e.status === 'pending').length}
            </div>
            <div className="text-sm text-muted-foreground">Pendentes</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              {mockEvaluations.reduce((sum, e) => sum + e.helpful, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Curtidas</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex-1">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <div className="sticky top-16 bg-background border-b border-border">
            <TabsList className="w-full justify-start rounded-none bg-transparent p-0 h-auto">
              <TabsTrigger 
                value="todas" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Todas
              </TabsTrigger>
              <TabsTrigger 
                value="published"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Publicadas
              </TabsTrigger>
              <TabsTrigger 
                value="pending"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Pendentes
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="p-4">
            <TabsContent value="todas" className="mt-0 space-y-4">
              {filterEvaluations('todas').map(evaluation => (
                <EvaluationCard key={evaluation.id} evaluation={evaluation} />
              ))}
            </TabsContent>

            <TabsContent value="published" className="mt-0 space-y-4">
              {filterEvaluations('published').map(evaluation => (
                <EvaluationCard key={evaluation.id} evaluation={evaluation} />
              ))}
            </TabsContent>

            <TabsContent value="pending" className="mt-0 space-y-4">
              {filterEvaluations('pending').map(evaluation => (
                <EvaluationCard key={evaluation.id} evaluation={evaluation} />
              ))}
            </TabsContent>
          </div>
        </Tabs>
      </div>
      </div>
    </MobileLayout>
  );
};
