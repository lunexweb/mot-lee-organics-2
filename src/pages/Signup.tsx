import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf, Users, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { mockIbos } from "@/lib/mockData";

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const sponsorCode = searchParams.get("sponsor");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
  });
  
  const [sponsor, setSponsor] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Find sponsor from URL parameter
    if (sponsorCode) {
      const foundSponsor = mockIbos.find(ibo => ibo.iboNumber === sponsorCode);
      setSponsor(foundSponsor);
      
      if (foundSponsor) {
        toast({
          title: "Sponsor Found!",
          description: `You'll be joining under ${foundSponsor.name}`,
        });
      }
    }
  }, [sponsorCode, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      return;
    }

    // Mock registration success
    toast({
      title: "Registration Successful!",
      description: sponsor 
        ? `Welcome to Mot-Lee Organics! You've joined under ${sponsor.name}` 
        : "Welcome to Mot-Lee Organics!",
    });

    // Redirect to login after 2 seconds
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const copyReferralLink = () => {
    const referralLink = `${window.location.origin}/signup?sponsor=IBO001`;
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast({
      title: "Link Copied!",
      description: "Share this link to invite new IBOs under you",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-8 px-4">
      <div className="container max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="h-10 w-10 text-primary" />
            <h1 className="text-3xl font-bold text-primary">Mot-Lee Organics</h1>
          </div>
          <p className="text-muted-foreground">Join Our Growing Community</p>
        </div>

        {sponsor && (
          <Card className="mb-6 border-primary/50 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Your Sponsor</p>
                  <p className="font-semibold text-lg">{sponsor.name}</p>
                  <p className="text-sm text-muted-foreground">IBO #{sponsor.iboNumber}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Become an IBO</CardTitle>
            <CardDescription>
              Start your journey to financial freedom with Mot-Lee Organics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+27 123 456 789"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Full Address *</Label>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="123 Main Street, City, Province, Postal Code"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">IBO Benefits:</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>✓ 20% commission on personal sales</li>
                  <li>✓ 5-15% override on team sales</li>
                  <li>✓ Rank advancement bonuses</li>
                  <li>✓ Exclusive IBO pricing on products</li>
                  <li>✓ Marketing tools and training</li>
                </ul>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Join Mot-Lee Organics
              </Button>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/" className="text-primary hover:underline font-medium">
                    Login here
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="mt-6 bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-primary mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Share Your Referral Link</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Invite others to join under you and earn override commissions on their sales
                </p>
                <div className="flex gap-2">
                  <Input
                    readOnly
                    value={`${window.location.origin}/signup?sponsor=IBO001`}
                    className="bg-background"
                  />
                  <Button 
                    onClick={copyReferralLink} 
                    variant="outline"
                    size="icon"
                    className="shrink-0"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
