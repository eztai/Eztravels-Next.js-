
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { 
  Globe, 
  DollarSign, 
  Bell, 
  Shield, 
  Eye, 
  Moon, 
  Sun, 
  Smartphone,
  Mail,
  MessageCircle,
  MapPin,
  Calendar,
  Plane,
  Save
} from 'lucide-react';

const SettingsPage: React.FC = () => {
  // Mock settings state - replace with real settings management later
  const [settings, setSettings] = useState({
    currency: 'USD',
    language: 'en',
    maxBudget: 5000,
    theme: 'system',
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    locationSharing: true,
    publicProfile: false,
    autoSaveItinerary: true,
    weatherUpdates: true,
    dealAlerts: true,
    tripReminders: true,
    budgetAlerts: true,
    shareTrips: false,
    defaultTripLength: 7,
    preferredTransport: 'any'
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    console.log('Saving settings:', settings);
    // Here you would save to your backend/storage
  };

  const currencies = [
    { value: 'USD', label: 'US Dollar ($)' },
    { value: 'EUR', label: 'Euro (€)' },
    { value: 'GBP', label: 'British Pound (£)' },
    { value: 'JPY', label: 'Japanese Yen (¥)' },
    { value: 'CAD', label: 'Canadian Dollar (C$)' },
    { value: 'AUD', label: 'Australian Dollar (A$)' },
    { value: 'CHF', label: 'Swiss Franc (CHF)' },
    { value: 'CNY', label: 'Chinese Yuan (¥)' }
  ];

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
    { value: 'de', label: 'Deutsch' },
    { value: 'it', label: 'Italiano' },
    { value: 'pt', label: 'Português' },
    { value: 'zh', label: '中文' },
    { value: 'ja', label: '日本語' }
  ];

  const themes = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Smartphone }
  ];

  const transportOptions = [
    { value: 'any', label: 'Any' },
    { value: 'flight', label: 'Flight' },
    { value: 'train', label: 'Train' },
    { value: 'car', label: 'Car' },
    { value: 'bus', label: 'Bus' }
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Settings</h1>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            General
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="currency">Preferred Currency</Label>
              <Select value={settings.currency} onValueChange={(value) => handleSettingChange('currency', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.value} value={currency.value}>
                      {currency.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select value={settings.language} onValueChange={(value) => handleSettingChange('language', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((language) => (
                    <SelectItem key={language.value} value={language.value}>
                      {language.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Maximum Budget per Trip: ${settings.maxBudget.toLocaleString()}</Label>
            <Slider
              value={[settings.maxBudget]}
              onValueChange={(value) => handleSettingChange('maxBudget', value[0])}
              max={20000}
              min={100}
              step={100}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>$100</span>
              <span>$20,000</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="theme">Theme</Label>
            <Select value={settings.theme} onValueChange={(value) => handleSettingChange('theme', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                {themes.map((theme) => {
                  const Icon = theme.icon;
                  return (
                    <SelectItem key={theme.value} value={theme.value}>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {theme.label}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Notifications
              </Label>
              <p className="text-sm text-muted-foreground">Receive updates via email</p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                Push Notifications
              </Label>
              <p className="text-sm text-muted-foreground">Receive push notifications on your device</p>
            </div>
            <Switch
              checked={settings.pushNotifications}
              onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                SMS Notifications
              </Label>
              <p className="text-sm text-muted-foreground">Receive important updates via SMS</p>
            </div>
            <Switch
              checked={settings.smsNotifications}
              onCheckedChange={(checked) => handleSettingChange('smsNotifications', checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Trip Reminders</Label>
              <p className="text-sm text-muted-foreground">Get reminded about upcoming trips</p>
            </div>
            <Switch
              checked={settings.tripReminders}
              onCheckedChange={(checked) => handleSettingChange('tripReminders', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Budget Alerts</Label>
              <p className="text-sm text-muted-foreground">Get notified when approaching budget limits</p>
            </div>
            <Switch
              checked={settings.budgetAlerts}
              onCheckedChange={(checked) => handleSettingChange('budgetAlerts', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Deal Alerts</Label>
              <p className="text-sm text-muted-foreground">Get notified about travel deals and discounts</p>
            </div>
            <Switch
              checked={settings.dealAlerts}
              onCheckedChange={(checked) => handleSettingChange('dealAlerts', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Weather Updates</Label>
              <p className="text-sm text-muted-foreground">Receive weather updates for your destinations</p>
            </div>
            <Switch
              checked={settings.weatherUpdates}
              onCheckedChange={(checked) => handleSettingChange('weatherUpdates', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location Sharing
              </Label>
              <p className="text-sm text-muted-foreground">Allow location sharing for better recommendations</p>
            </div>
            <Switch
              checked={settings.locationSharing}
              onCheckedChange={(checked) => handleSettingChange('locationSharing', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Public Profile
              </Label>
              <p className="text-sm text-muted-foreground">Make your profile visible to other users</p>
            </div>
            <Switch
              checked={settings.publicProfile}
              onCheckedChange={(checked) => handleSettingChange('publicProfile', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Share Trip Details</Label>
              <p className="text-sm text-muted-foreground">Allow sharing trip details with travel companions</p>
            </div>
            <Switch
              checked={settings.shareTrips}
              onCheckedChange={(checked) => handleSettingChange('shareTrips', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Travel Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plane className="h-5 w-5" />
            Travel Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Default Trip Length (days)</Label>
              <Input
                type="number"
                value={settings.defaultTripLength}
                onChange={(e) => handleSettingChange('defaultTripLength', parseInt(e.target.value) || 7)}
                min="1"
                max="365"
              />
            </div>

            <div className="space-y-2">
              <Label>Preferred Transportation</Label>
              <Select value={settings.preferredTransport} onValueChange={(value) => handleSettingChange('preferredTransport', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select transportation" />
                </SelectTrigger>
                <SelectContent>
                  {transportOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Auto-save Itinerary
              </Label>
              <p className="text-sm text-muted-foreground">Automatically save changes to your itinerary</p>
            </div>
            <Switch
              checked={settings.autoSaveItinerary}
              onCheckedChange={(checked) => handleSettingChange('autoSaveItinerary', checked)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
