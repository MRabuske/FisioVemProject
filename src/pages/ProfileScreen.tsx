import { useState } from 'react';
import { User, Settings, Bell, CreditCard, HelpCircle, LogOut, Edit, Camera, Phone, Mail, MapPin, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MobileLayout } from '@/components/Layout/MobileLayout';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
  memberSince: string;
  totalConsultations: number;
  preferredSpecialties: string[];
}

const mockUser: UserProfile = {
  name: 'Maria Silva',
  email: 'maria.silva@email.com',
  phone: '(11) 99999-9999',
  address: 'Rua das Flores, 123 - Vila Madalena, São Paulo',
  avatar: '/placeholder.svg',
  memberSince: '2025-01-15',
  totalConsultations: 12,
  preferredSpecialties: ['Ortopedia', 'Neurologia']
};

export const ProfileScreen = () => {
  const [user, setUser] = useState(mockUser);
  const [notifications, setNotifications] = useState({
    appointments: true,
    promotions: false,
    reminders: true
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const MenuOption = ({ 
    icon: Icon, 
    title, 
    subtitle, 
    onClick, 
    showArrow = true,
    rightElement 
  }: {
    icon: any;
    title: string;
    subtitle?: string;
    onClick?: () => void;
    showArrow?: boolean;
    rightElement?: React.ReactNode;
  }) => (
    <div 
      className="flex items-center justify-between p-4 hover:bg-muted/50 cursor-pointer transition-colors"
      onClick={onClick}
    >
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-medium text-foreground">{title}</h3>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>
      {rightElement || (showArrow && (
        <div className="text-muted-foreground">›</div>
      ))}
    </div>
  );

  return (
    <MobileLayout showNavigation currentPage="profile">
      <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Meu Perfil</h1>
          <Dialog open={isEditingProfile} onOpenChange={setIsEditingProfile}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <Edit className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editar Perfil</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    value={user.name}
                    onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={user.phone}
                    onChange={(e) => setUser(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="address">Endereço</Label>
                  <Input
                    id="address"
                    value={user.address}
                    onChange={(e) => setUser(prev => ({ ...prev, address: e.target.value }))}
                  />
                </div>
                <div className="flex space-x-2 pt-4">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setIsEditingProfile(false)}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={() => setIsEditingProfile(false)}
                  >
                    Salvar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Profile Header */}
        <div className="bg-gradient-card p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative">
              <Avatar className="w-20 h-20">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-xl">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button 
                size="sm" 
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full p-0"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant="secondary" className="text-xs">
                  Membro desde {new Date(user.memberSince).toLocaleDateString('pt-BR')}
                </Badge>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-3 text-center bg-background/50">
              <div className="text-2xl font-bold text-primary">{user.totalConsultations}</div>
              <div className="text-sm text-muted-foreground">Consultas</div>
            </Card>
            <Card className="p-3 text-center bg-background/50">
              <div className="text-2xl font-bold text-primary">{user.preferredSpecialties.length}</div>
              <div className="text-sm text-muted-foreground">Especialidades</div>
            </Card>
          </div>
        </div>

        {/* Contact Info */}
        <Card className="mx-4 my-4">
          <div className="p-4 space-y-3">
            <h3 className="font-semibold text-foreground mb-3">Informações de Contato</h3>
            
            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-foreground">{user.phone}</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-foreground">{user.email}</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-foreground">{user.address}</span>
            </div>
          </div>
        </Card>

        {/* Menu Options */}
        <Card className="mx-4 mb-4">
          <MenuOption
            icon={Settings}
            title="Configurações da Conta"
            subtitle="Privacidade, segurança e dados"
          />
          <Separator />
          <MenuOption
            icon={Bell}
            title="Notificações"
            subtitle="Gerencie suas preferências"
            rightElement={
              <Switch 
                checked={notifications.appointments}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, appointments: checked }))
                }
              />
            }
            showArrow={false}
          />
          <Separator />
          <MenuOption
            icon={CreditCard}
            title="Pagamentos"
            subtitle="Métodos de pagamento e histórico"
          />
          <Separator />
          <MenuOption
            icon={Calendar}
            title="Histórico de Consultas"
            subtitle="Veja todas suas consultas anteriores"
          />
        </Card>

        <Card className="mx-4 mb-4">
          <MenuOption
            icon={HelpCircle}
            title="Ajuda e Suporte"
            subtitle="FAQ, contato e tutoriais"
          />
          <Separator />
          <MenuOption
            icon={LogOut}
            title="Sair"
            subtitle="Fazer logout da conta"
          />
        </Card>

        {/* Preferred Specialties */}
        <Card className="mx-4 mb-20">
          <div className="p-4">
            <h3 className="font-semibold text-foreground mb-3">Especialidades de Interesse</h3>
            <div className="flex flex-wrap gap-2">
              {user.preferredSpecialties.map((specialty) => (
                <Badge key={specialty} variant="secondary">
                  {specialty}
                </Badge>
              ))}
              <Button variant="outline" size="sm" className="h-6 text-xs">
                + Adicionar
              </Button>
            </div>
          </div>
        </Card>
      </div>
      </div>
    </MobileLayout>
  );
};
