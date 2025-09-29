import { useState } from 'react';
import { Search, MapPin, Filter, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PhysiotherapistCard } from '@/components/ui/PhysiotherapistCard';
import { MobileLayout } from '@/components/Layout/MobileLayout';
import { mockPhysiotherapists, specialties } from '@/data/mockData';

export const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Filtrar fisioterapeutas baseado na busca e especialidade
  const filteredPhysiotherapists = mockPhysiotherapists.filter(physio => {
    const matchesSearch = searchTerm === '' || 
      physio.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      physio.specialties.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSpecialty = selectedSpecialty === null || 
      physio.specialties.includes(selectedSpecialty);

    return matchesSearch && matchesSpecialty;
  });

  return (
    <MobileLayout showNavigation currentPage="search">
      <div className="flex flex-col h-full bg-background">
      {/* Header com busca */}
      <div className="sticky top-0 bg-background border-b border-border p-4 space-y-4">
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar fisioterapeutas ou especialidades..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? 'bg-primary text-primary-foreground' : ''}
          >
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* Filtros */}
        {showFilters && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Localização: São Paulo, SP</span>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Especialidades:</h3>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={selectedSpecialty === null ? "default" : "secondary"}
                  className="cursor-pointer"
                  onClick={() => setSelectedSpecialty(null)}
                >
                  Todas
                </Badge>
                {specialties.map((specialty) => (
                  <Badge
                    key={specialty}
                    variant={selectedSpecialty === specialty ? "default" : "secondary"}
                    className="cursor-pointer"
                    onClick={() => setSelectedSpecialty(specialty)}
                  >
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Resultados */}
      <div className="flex-1 p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            {filteredPhysiotherapists.length} fisioterapeutas encontrados
          </h2>
          {selectedSpecialty && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedSpecialty(null)}
              className="text-muted-foreground"
            >
              Limpar filtros
            </Button>
          )}
        </div>

        {filteredPhysiotherapists.length === 0 ? (
          <Card className="p-8 text-center">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhum resultado encontrado</h3>
            <p className="text-muted-foreground">
              Tente ajustar sua busca ou filtros para encontrar fisioterapeutas.
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredPhysiotherapists.map((physio) => (
              <PhysiotherapistCard
                key={physio.id}
                physiotherapist={physio}
                onViewProfile={() => {}}
                onBookAppointment={() => {}}
              />
            ))}
          </div>
        )}
      </div>
      </div>
    </MobileLayout>
  );
};
