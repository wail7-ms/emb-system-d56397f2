import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import { User, Lock, Bell, Shield, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true
  });

  const [adminSettings, setAdminSettings] = useState({
    maintenanceMode: false,
    userRegistration: true,
    debugMode: false
  });

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    console.log('Updating profile:', { name: profile.name, email: profile.email });
    
    setTimeout(() => {
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully.",
      });
      setIsLoading(false);
    }, 1000);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (profile.newPassword !== profile.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    if (profile.newPassword.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    console.log('Changing password for user:', user?.email);
    
    setTimeout(() => {
      toast({
        title: "Password Changed",
        description: "Your password has been updated successfully.",
      });
      setProfile(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
      setIsLoading(false);
    }, 1000);
  };

  const handleNotificationToggle = (type: 'email' | 'sms' | 'push') => {
    setNotifications(prev => {
      const newSettings = { ...prev, [type]: !prev[type] };
      
      console.log('Updating notification settings:', newSettings);
      
      toast({
        title: "Notification Settings Updated",
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} notifications ${newSettings[type] ? 'enabled' : 'disabled'}.`,
      });
      
      return newSettings;
    });
  };

  const handleAdminSettingToggle = (type: 'maintenanceMode' | 'userRegistration' | 'debugMode') => {
    setAdminSettings(prev => {
      const newSettings = { ...prev, [type]: !prev[type] };
      
      console.log('Updating admin settings:', newSettings);
      
      toast({
        title: "Admin Settings Updated",
        description: `${type.replace(/([A-Z])/g, ' $1').toLowerCase()} ${newSettings[type] ? 'enabled' : 'disabled'}.`,
      });
      
      return newSettings;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto py-6 px-4">
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
              <p className="mt-2 text-gray-600">Manage your account settings and preferences</p>
            </div>
            <Button 
              onClick={handleBackToDashboard}
              variant="outline"
              className="flex items-center gap-2 transition-all duration-200 hover:scale-105"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-all duration-300 hover-scale">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                      className="transition-all duration-200 focus:scale-[1.02]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                      className="transition-all duration-200 focus:scale-[1.02]"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full transition-all duration-200 hover:scale-105"
                  >
                    {isLoading ? "Updating..." : "Update Profile"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover-scale">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Change Password
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={profile.currentPassword}
                      onChange={(e) => setProfile(prev => ({ ...prev, currentPassword: e.target.value }))}
                      className="transition-all duration-200 focus:scale-[1.02]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={profile.newPassword}
                      onChange={(e) => setProfile(prev => ({ ...prev, newPassword: e.target.value }))}
                      className="transition-all duration-200 focus:scale-[1.02]"
                      required
                      minLength={6}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={profile.confirmPassword}
                      onChange={(e) => setProfile(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="transition-all duration-200 focus:scale-[1.02]"
                      required
                      minLength={6}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full transition-all duration-200 hover:scale-105"
                  >
                    {isLoading ? "Changing..." : "Change Password"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover-scale">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Email Notifications</span>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={() => handleNotificationToggle('email')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span>SMS Notifications</span>
                  <Switch
                    checked={notifications.sms}
                    onCheckedChange={() => handleNotificationToggle('sms')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span>Push Notifications</span>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={() => handleNotificationToggle('push')}
                  />
                </div>
              </CardContent>
            </Card>

            {user?.role === 'admin' && (
              <Card className="hover:shadow-lg transition-all duration-300 hover-scale">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Admin Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>System Maintenance Mode</span>
                    <Switch
                      checked={adminSettings.maintenanceMode}
                      onCheckedChange={() => handleAdminSettingToggle('maintenanceMode')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>User Registration</span>
                    <Switch
                      checked={adminSettings.userRegistration}
                      onCheckedChange={() => handleAdminSettingToggle('userRegistration')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Debug Mode</span>
                    <Switch
                      checked={adminSettings.debugMode}
                      onCheckedChange={() => handleAdminSettingToggle('debugMode')}
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
