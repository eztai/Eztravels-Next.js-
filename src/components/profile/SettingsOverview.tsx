
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  DollarSign, 
  Globe, 
  Plane, 
  Bell, 
  Shield, 
  Settings, 
  ChevronRight 
} from 'lucide-react';

interface SettingsOverviewProps {
  settings: {
    currency: string;
    language: string;
    maxBudget: number;
    emailNotifications: boolean;
    pushNotifications: boolean;
    locationSharing: boolean;
  };
  onOpenSettings: () => void;
}

export const SettingsOverview: React.FC<SettingsOverviewProps> = ({
  settings,
  onOpenSettings
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Settings Overview
          <Button variant="ghost" size="sm" onClick={onOpenSettings}>
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="font-medium">Currency</div>
                <div className="text-sm text-muted-foreground">{settings.currency}</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="font-medium">Language</div>
                <div className="text-sm text-muted-foreground">{settings.language}</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Plane className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="font-medium">Max Budget</div>
                <div className="text-sm text-muted-foreground">${settings.maxBudget.toLocaleString()}</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="font-medium">Notifications</div>
                <div className="text-sm text-muted-foreground">
                  {settings.emailNotifications && settings.pushNotifications ? 'All enabled' : 'Partial'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="font-medium">Privacy & Security</div>
              <div className="text-sm text-muted-foreground">
                Location sharing: {settings.locationSharing ? 'Enabled' : 'Disabled'}
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={onOpenSettings}>
            <Settings className="h-4 w-4 mr-2" />
            Manage
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
