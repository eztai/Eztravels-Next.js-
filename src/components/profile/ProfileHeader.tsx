
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Calendar, Edit, LogOut } from 'lucide-react';

interface ProfileHeaderProps {
  user: {
    name: string;
    email: string;
    joinDate: string;
    avatar: string;
  };
  onEditProfile: () => void;
  onLogout: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  onEditProfile,
  onLogout
}) => {
  return (
    <Card>
      <CardHeader className="flex items-center space-x-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <CardTitle className="text-2xl font-bold">{user.name}</CardTitle>
          <p className="text-muted-foreground">{user.email}</p>
          <Badge variant="secondary">
            <Calendar className="h-3 w-3 mr-1" />
            Member since {user.joinDate}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end gap-2">
          <Button size="sm" variant="outline" onClick={onEditProfile}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
          <Button size="sm" onClick={onLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Log Out
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
