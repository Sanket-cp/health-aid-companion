
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { LogOut, User, Bell, Shield, Lock, Phone } from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const [profileForm, setProfileForm] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567"
  });
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    appointments: true,
    reminders: true,
    marketing: false
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleToggleChange = (field: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Profile updated successfully");
    }, 1000);
  };
  
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Passwords don't match", {
        description: "Please make sure your new passwords match"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      toast.success("Password updated successfully");
    }, 1000);
  };
  
  const handleLogout = () => {
    toast.info("Logging out", {
      description: "This would log you out in a real app."
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Account Settings</h1>
        
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <form onSubmit={handleProfileSubmit}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Profile Information
                    </CardTitle>
                    <CardDescription>
                      Update your personal information and contact details.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex justify-center">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-medimate-light flex items-center justify-center text-2xl font-bold text-medimate-primary">
                          {profileForm.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="absolute bottom-0 right-0 rounded-full h-8 w-8 p-0"
                          onClick={() => {
                            toast.info("Change profile picture", {
                              description: "This would open a file picker in a real app."
                            });
                          }}
                        >
                          <span className="sr-only">Change</span>
                          <span className="text-xs">+</span>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        name="name"
                        value={profileForm.name}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        name="email"
                        type="email"
                        value={profileForm.email}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        name="phone"
                        type="tel"
                        value={profileForm.phone}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>
                    
                    <div className="pt-4">
                      <h3 className="text-lg font-medium mb-4">Emergency Contact (Optional)</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="emergencyName">Contact Name</Label>
                          <Input 
                            id="emergencyName" 
                            placeholder="Name of emergency contact"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emergencyPhone">Contact Phone</Label>
                          <Input 
                            id="emergencyPhone" 
                            type="tel"
                            placeholder="Phone number"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="emergencyRelation">Relationship</Label>
                          <Input 
                            id="emergencyRelation" 
                            placeholder="e.g. Spouse, Parent, Sibling"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-6">
                    <Button 
                      type="button" 
                      variant="outline"
                      className="text-medimate-primary"
                      onClick={() => {
                        setProfileForm({
                          name: "John Doe",
                          email: "john.doe@example.com",
                          phone: "+1 (555) 123-4567"
                        });
                      }}
                    >
                      Reset
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-medimate-primary hover:bg-medimate-secondary"
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card className="mb-8">
                <form onSubmit={handlePasswordSubmit}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="h-5 w-5" />
                      Password
                    </CardTitle>
                    <CardDescription>
                      Change your password to improve account security.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input 
                        id="currentPassword" 
                        name="currentPassword"
                        type="password"
                        value={passwordForm.currentPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input 
                        id="newPassword" 
                        name="newPassword"
                        type="password"
                        value={passwordForm.newPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input 
                        id="confirmPassword" 
                        name="confirmPassword"
                        type="password"
                        value={passwordForm.confirmPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end border-t pt-6">
                    <Button 
                      type="submit" 
                      className="bg-medimate-primary hover:bg-medimate-secondary"
                      disabled={isLoading}
                    >
                      {isLoading ? "Updating..." : "Update Password"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Advanced Security
                  </CardTitle>
                  <CardDescription>
                    Additional security options to protect your account.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <div className="space-y-0.5">
                      <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Add an additional layer of security to your account.
                      </p>
                    </div>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        toast.info("Two-Factor Authentication", {
                          description: "This would enable 2FA in a real app."
                        });
                      }}
                    >
                      Enable
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="space-y-0.5">
                      <Label>Login History</Label>
                      <p className="text-sm text-muted-foreground">
                        View and manage your account login activities.
                      </p>
                    </div>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        toast.info("Login History", {
                          description: "This would show login history in a real app."
                        });
                      }}
                    >
                      View History
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="space-y-0.5">
                      <Label className="text-destructive font-semibold">Logout from All Devices</Label>
                      <p className="text-sm text-muted-foreground">
                        Sign out from all other devices where you're currently logged in.
                      </p>
                    </div>
                    <Button 
                      variant="destructive"
                      onClick={() => {
                        toast.success("Logged out from all devices", {
                          description: "You've been successfully logged out from all other devices."
                        });
                      }}
                    >
                      Logout All
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>
                    Control how and when you receive notifications from MediMate.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="font-medium">Notification Channels</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label 
                            htmlFor="email-notifications" 
                            className="text-base font-normal"
                          >
                            Email Notifications
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications and updates via email
                          </p>
                        </div>
                        <Switch 
                          id="email-notifications" 
                          checked={notifications.email}
                          onCheckedChange={() => handleToggleChange('email')}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label 
                            htmlFor="push-notifications" 
                            className="text-base font-normal"
                          >
                            Push Notifications
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Receive alerts on your device
                          </p>
                        </div>
                        <Switch 
                          id="push-notifications" 
                          checked={notifications.push}
                          onCheckedChange={() => handleToggleChange('push')}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label 
                            htmlFor="sms-notifications" 
                            className="text-base font-normal"
                          >
                            SMS Notifications
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Receive text messages for important updates
                          </p>
                        </div>
                        <Switch 
                          id="sms-notifications" 
                          checked={notifications.sms}
                          onCheckedChange={() => handleToggleChange('sms')}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <h3 className="font-medium">Notification Types</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label 
                            htmlFor="appointment-notifications" 
                            className="text-base font-normal"
                          >
                            Appointments
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Notifications about upcoming and changed appointments
                          </p>
                        </div>
                        <Switch 
                          id="appointment-notifications" 
                          checked={notifications.appointments}
                          onCheckedChange={() => handleToggleChange('appointments')}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label 
                            htmlFor="reminder-notifications" 
                            className="text-base font-normal"
                          >
                            Medication Reminders
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Reminders to take your medications
                          </p>
                        </div>
                        <Switch 
                          id="reminder-notifications" 
                          checked={notifications.reminders}
                          onCheckedChange={() => handleToggleChange('reminders')}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label 
                            htmlFor="marketing-notifications" 
                            className="text-base font-normal"
                          >
                            Marketing & Promotions
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Notifications about new features and special offers
                          </p>
                        </div>
                        <Switch 
                          id="marketing-notifications" 
                          checked={notifications.marketing}
                          onCheckedChange={() => handleToggleChange('marketing')}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end border-t pt-6">
                  <Button 
                    className="bg-medimate-primary hover:bg-medimate-secondary"
                    onClick={() => {
                      toast.success("Notification preferences saved");
                    }}
                  >
                    Save Preferences
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 flex justify-center">
            <Button 
              variant="outline" 
              className="text-destructive flex items-center gap-2"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout of MediMate
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
