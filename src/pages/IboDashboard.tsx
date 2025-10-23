import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Users, TrendingUp, DollarSign, Award, ShoppingBag, Share2, Copy, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import { mockIboData, mockNetworkData, currentUser, mockIbos } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const IboDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const salesProgress = (mockIboData.currentSales / mockIboData.targetSales) * 100;
  const recruitsProgress = (mockIboData.recruits / mockIboData.targetRecruits) * 100;
  const myTeam = mockIbos.filter(ibo => ibo.sponsorId === currentUser.iboNumber);

  const copyReferralLink = () => {
    const referralLink = `${window.location.origin}/signup?sponsor=${currentUser.iboNumber}`;
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast({
      title: "Link Copied!",
      description: "Share this link to invite new IBOs under you",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShopNow = () => {
    navigate("/products");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {mockIboData.name}!</h1>
          <p className="text-muted-foreground">Here's your business overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 lg:mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Rank</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{mockIboData.rank}</div>
              <p className="text-xs text-muted-foreground">
                Next: {mockIboData.nextRank}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Commission</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R{mockIboData.commission.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Sales</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R{mockIboData.currentSales.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Target: R{mockIboData.targetSales.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Size</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockIboData.recruits}</div>
              <p className="text-xs text-muted-foreground">
                Active members
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Rank Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Rank Advancement Progress</CardTitle>
              <CardDescription>Track your progress to {mockIboData.nextRank} rank</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Sales Target</span>
                  <span className="text-sm text-muted-foreground">
                    R{mockIboData.currentSales.toLocaleString()} / R{mockIboData.targetSales.toLocaleString()}
                  </span>
                </div>
                <Progress value={salesProgress} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Recruits Target</span>
                  <span className="text-sm text-muted-foreground">
                    {mockIboData.recruits} / {mockIboData.targetRecruits}
                  </span>
                </div>
                <Progress value={recruitsProgress} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Network Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="h-5 w-5 text-primary" />
                Referral Link
              </CardTitle>
              <CardDescription>Share this link to invite new IBOs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  readOnly
                  value={`${window.location.origin}/signup?sponsor=${currentUser.iboNumber}`}
                  className="bg-muted"
                />
                <Button 
                  onClick={copyReferralLink}
                  size="icon"
                  variant="outline"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Earn 5-15% override commission on all sales made by your recruits!
              </p>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">Shop for products to maintain your IBO status</p>
              <p className="text-sm font-medium">Minimum: R500/month</p>
              <Button onClick={handleShopNow} className="w-full">
                Shop Now
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* My Network */}
          <Card>
            <CardHeader>
              <CardTitle>My Network</CardTitle>
              <CardDescription>Your team structure</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">Generation 1</p>
                    <p className="text-sm text-muted-foreground">Direct recruits</p>
                  </div>
                  <div className="text-2xl font-bold">{mockIboData.generation1}</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">Generation 2</p>
                    <p className="text-sm text-muted-foreground">Second level</p>
                  </div>
                  <div className="text-2xl font-bold">{mockIboData.generation2}</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">Generation 3</p>
                    <p className="text-sm text-muted-foreground">Third level</p>
                  </div>
                  <div className="text-2xl font-bold">{mockIboData.generation3}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Team Performance</CardTitle>
              <CardDescription>Recent activity from your network</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockNetworkData.map((member, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">Generation {member.generation}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">R{member.sales.toLocaleString()}</p>
                      <p className={`text-xs ${member.status === 'Active' ? 'text-primary' : 'text-muted-foreground'}`}>
                        {member.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IboDashboard;
