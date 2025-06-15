import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit, 
  Settings, 
  LogOut,
  Plane,
  DollarSign,
  Camera,
  Facebook,
  Instagram
} from 'lucide-react';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Mock authentication state - replace with real auth later
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  
  // Check if user came from another page and should be redirected back after login
  const redirectTo = location.state?.redirectTo;

  // Mock user data - replace with real user data later
  const user = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    joinDate: 'March 2023',
    avatar: '/placeholder.svg',
    totalTrips: 12,
    totalSpent: 24500,
    upcomingTrips: 2
  };

  const handleLogin = (provider?: string) => {
    // Simulate login success
    setIsAuthenticated(true);
    console.log(`Signed in with ${provider || 'email'}`);
    
    // If user came from another page, redirect them back
    if (redirectTo && redirectTo !== '/profile') {
      setTimeout(() => {
        navigate(redirectTo, { replace: true });
      }, 500); // Small delay to show login success
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleEditProfile = () => {
    navigate('/profile/edit');
  };

  // If not authenticated, show login options
  if (!isAuthenticated) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Sign In to Your Account</CardTitle>
            <p className="text-muted-foreground">
              Access your trips, budgets, and personalized recommendations
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={() => handleLogin('email')} 
              className="w-full" 
              size="lg"
            >
              <User className="h-4 w-4 mr-2" />
              Sign In with Email
            </Button>
            <Button 
              onClick={() => handleLogin('google')} 
              variant="outline" 
              className="w-full" 
              size="lg"
            >
              <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign In with Google
            </Button>
            <Button 
              onClick={() => handleLogin('facebook')} 
              variant="outline" 
              className="w-full" 
              size="lg"
            >
              <Facebook className="h-4 w-4 mr-2" />
              Sign In with Facebook
            </Button>
            <Button 
              onClick={() => handleLogin('instagram')} 
              variant="outline" 
              className="w-full" 
              size="lg"
            >
              <Instagram className="h-4 w-4 mr-2" />
              Sign In with Instagram
            </Button>
            {redirectTo && redirectTo !== '/profile' && (
              <p className="text-sm text-muted-foreground text-center">
                You'll be redirected back to your previous page after signing in
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      {/* Profile Header */}
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
            <Button size="sm" variant="outline" onClick={handleEditProfile}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
            <Button size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Log Out
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{user.phone}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{user.location}</span>
          </div>
        </CardContent>
      </Card>

      {/* Travel Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Travel Stats</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold">{user.totalTrips}</div>
            <div className="text-sm text-muted-foreground">Total Trips</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">${user.totalSpent.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total Spent</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{user.upcomingTrips}</div>
            <div className="text-sm text-muted-foreground">Upcoming Trips</div>
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="w-full justify-start gap-2">
            <Settings className="h-4 w-4" />
            Account Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
