
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getInitials } from "@/lib/utils";

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [college, setCollege] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Password change states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Set initial form values
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      // In a real app, these would come from the user object as well
      setBio("");
      setCollege("");
    }
  }, [user]);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a real app, this would make an API call to update the user profile
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully",
      });
    }, 1000);
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords don't match",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // In a real app, this would make an API call to update the password
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Password Updated",
        description: "Your password has been changed successfully",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }, 1000);
  };

  if (!user) {
    return null; // or loading indicator
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Profile Settings</h1>
          <p className="text-gray-600">Manage your account preferences</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarFallback className="text-2xl bg-eventx-purple text-white">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-lg">{user.name}</h3>
                  <p className="text-gray-500 mb-4">{user.email}</p>
                  <div className="w-full border-t pt-4 mt-2">
                    <ul className="space-y-2">
                      <li>
                        <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/dashboard")}>
                          Dashboard
                        </Button>
                      </li>
                      {user.role === "organizer" && (
                        <li>
                          <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/create-event")}>
                            Create Event
                          </Button>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <Tabs defaultValue="general">
              <TabsList className="mb-6">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                {user.role === "organizer" && (
                  <TabsTrigger value="payments">Payments</TabsTrigger>
                )}
              </TabsList>
              
              <TabsContent value="general">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Update your personal information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Input
                          id="bio"
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="college">College/University</Label>
                        <Input
                          id="college"
                          value={college}
                          onChange={(e) => setCollege(e.target.value)}
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="bg-eventx-purple hover:bg-eventx-dark-purple"
                        disabled={isLoading}
                      >
                        {isLoading ? "Saving..." : "Save Changes"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>
                      Update your password
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePasswordUpdate} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="bg-eventx-purple hover:bg-eventx-dark-purple"
                        disabled={isLoading}
                      >
                        {isLoading ? "Updating..." : "Update Password"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {user.role === "organizer" && (
                <TabsContent value="payments">
                  <Card>
                    <CardHeader>
                      <CardTitle>Payment Information</CardTitle>
                      <CardDescription>
                        Manage your payment details
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-500 mb-4">
                        Connect your bank account to receive payments from ticket sales.
                      </p>
                      <Button 
                        className="mb-6"
                      >
                        Connect Bank Account
                      </Button>
                      
                      <div className="border-t pt-4 mt-4">
                        <h3 className="font-medium mb-2">Payment History</h3>
                        <p className="text-gray-500">
                          No payment history available yet. Once you receive payments for your events, they will appear here.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}
            </Tabs>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
