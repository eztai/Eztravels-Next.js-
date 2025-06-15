import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Calendar, Star, Settings, Edit, LogOut, LogIn, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  // Mock authentication state - replace with real auth later
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '' });

  const userStats = {
    tripsCompleted: 12,
    countriesVisited: 8,
    totalDistance: 45000,
    memberSince: 'March 2023'
  };

  const recentTrips = [
    { name: 'Tokyo Adventure', date: 'June 2024', rating: 5 },
    { name: 'Bali Retreat', date: 'March 2024', rating: 4 },
    { name: 'Paris Weekend', date: 'January 2024', rating: 5 }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - replace with real authentication
    setIsAuthenticated(true);
    console.log('Login attempt:', loginForm);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock register - replace with real authentication
    setIsAuthenticated(true);
    console.log('Register attempt:', registerForm);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginForm({ email: '', password: '' });
    setRegisterForm({ name: '', email: '', password: '' });
    console.log('User logged out');
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // Mock social login - replace with real social authentication
    setIsAuthenticated(true);
  };

  const handleEditProfile = () => {
    navigate('/profile/edit');
  };

  if (!isAuthenticated) {
    return (
      <div className="p-6 max-w-md mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Welcome</h1>
          <p className="text-muted-foreground">Sign in to access your profile</p>
        </div>

        <div className="space-y-4">
          <div className="grid gap-3">
            <Button 
              variant="outline" 
              onClick={() => handleSocialLogin('Google')}
              className="w-full h-12 bg-white border-2 hover:bg-gray-50"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => handleSocialLogin('Facebook')}
              className="w-full h-12 bg-[#1877F2] text-white hover:bg-[#166FE5]"
            >
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Continue with Facebook
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => handleSocialLogin('Instagram')}
              className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
            >
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Continue with Instagram
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Email Login</TabsTrigger>
              <TabsTrigger value="register">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Sign In
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="register">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={registerForm.name}
                        onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="Enter your email"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="Create a password"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Create Account
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Profile</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleEditProfile} className="gap-2">
            <Edit className="h-4 w-4" />
            Edit Profile
          </Button>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <Avatar className="h-24 w-24 mx-auto">
                <AvatarImage src="" alt="John Doe" />
                <AvatarFallback className="text-2xl">JD</AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl">John Doe</CardTitle>
              <p className="text-muted-foreground">john.doe@email.com</p>
              <Badge className="w-fit mx-auto">Premium Member</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                <span>Member since {userStats.memberSince}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4" />
                <span>Based in San Francisco, CA</span>
              </div>
              <Button className="w-full gap-2">
                <Settings className="h-4 w-4" />
                Account Settings
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Stats and Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Travel Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Travel Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{userStats.tripsCompleted}</div>
                  <div className="text-sm text-muted-foreground">Trips Completed</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{userStats.countriesVisited}</div>
                  <div className="text-sm text-muted-foreground">Countries Visited</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{userStats.totalDistance.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Miles Traveled</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">4.8</div>
                  <div className="text-sm text-muted-foreground">Avg Rating</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Trips */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Trips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTrips.map((trip, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{trip.name}</p>
                      <p className="text-sm text-muted-foreground">{trip.date}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(trip.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Travel Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Favorite Destinations</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>• Beach destinations</p>
                    <p>• Cultural cities</p>
                    <p>• Mountain retreats</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Travel Style</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>• Mid-range budget</p>
                    <p>• Adventure seeker</p>
                    <p>• Food enthusiast</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
