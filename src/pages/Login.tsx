import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [iboEmail, setIboEmail] = useState("");
  const [iboPassword, setIboPassword] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const handleIboLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock validation
    if (iboEmail && iboPassword) {
      toast({
        title: "Login Successful",
        description: "Welcome back to your IBO dashboard!",
      });
      navigate("/ibo-dashboard");
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock validation
    if (adminEmail && adminPassword) {
      toast({
        title: "Admin Login Successful",
        description: "Welcome to the admin dashboard!",
      });
      navigate("/admin-dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="h-10 w-10 text-primary" />
            <h1 className="text-3xl font-bold text-primary">Mot-Lee Organics</h1>
          </div>
          <p className="text-muted-foreground">Natural Beauty, Natural Business</p>
        </div>

        <Card className="w-full shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>Login to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="ibo" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="ibo">IBO Login</TabsTrigger>
                <TabsTrigger value="admin">Admin Login</TabsTrigger>
              </TabsList>
              
              <TabsContent value="ibo">
                <form onSubmit={handleIboLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ibo-email">Email</Label>
                    <Input
                      id="ibo-email"
                      type="email"
                      placeholder="your@email.com"
                      value={iboEmail}
                      onChange={(e) => setIboEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ibo-password">Password</Label>
                    <Input
                      id="ibo-password"
                      type="password"
                      placeholder="••••••••"
                      value={iboPassword}
                      onChange={(e) => setIboPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    Login as IBO
                  </Button>
                  <div className="text-center space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Don't have an account?{" "}
                      <Link to="/signup" className="text-primary hover:underline font-medium">
                        Join Mot-Lee Organics
                      </Link>
                    </p>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="admin">
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Admin Email</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      placeholder="admin@motlee.com"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Admin Password</Label>
                    <Input
                      id="admin-password"
                      type="password"
                      placeholder="••••••••"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    Login as Admin
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
