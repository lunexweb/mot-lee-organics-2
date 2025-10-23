import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, DollarSign, TrendingUp, Users, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import { mockIbos, mockNetworkData } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

const ManageCommissions = () => {
  const { toast } = useToast();

  const totalCommissionsPaid = mockIbos.reduce((sum, ibo) => sum + ibo.totalCommission, 0);
  const pendingPayouts = mockNetworkData.reduce((sum, member) => sum + (member.sales * 0.05), 0);

  const handleProcessPayout = () => {
    toast({
      title: "Payouts Processed",
      description: `R${pendingPayouts.toLocaleString()} has been processed for payment`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/admin-dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Commission Management</h1>
          <p className="text-muted-foreground">Track and manage IBO commissions and payouts</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 lg:mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R{totalCommissionsPaid.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">R{pendingPayouts.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Commission</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R{Math.round(totalCommissionsPaid / mockIbos.length).toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Per IBO</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Earners</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockIbos.filter(ibo => ibo.status === 'Active').length}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Commission Structure */}
          <Card>
            <CardHeader>
              <CardTitle>Commission Structure</CardTitle>
              <CardDescription>Current payout rates by rank</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { rank: 'Bronze', personal: '20%', override: '5%', bonus: 'R0' },
                { rank: 'Silver', personal: '22%', override: '7%', bonus: 'R500' },
                { rank: 'Gold', personal: '25%', override: '10%', bonus: 'R1,000' },
                { rank: 'Platinum', personal: '30%', override: '15%', bonus: 'R2,500' },
              ].map((tier) => (
                <div key={tier.rank} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <p className="font-semibold">{tier.rank}</p>
                    <p className="text-sm text-muted-foreground">Personal: {tier.personal} | Override: {tier.override}</p>
                  </div>
                  <Badge>{tier.bonus}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Top Earners */}
          <Card>
            <CardHeader>
              <CardTitle>Top Earners This Month</CardTitle>
              <CardDescription>Highest commission earnings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockIbos
                .sort((a, b) => b.totalCommission - a.totalCommission)
                .slice(0, 5)
                .map((ibo) => (
                  <div key={ibo.iboNumber} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <p className="font-medium">{ibo.name}</p>
                      <p className="text-sm text-muted-foreground">{ibo.rank} - IBO #{ibo.iboNumber}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">R{ibo.totalCommission.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">earned</p>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>

          {/* Process Payouts */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Process Monthly Payouts</CardTitle>
              <CardDescription>Review and process pending commission payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-6 rounded-lg mb-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium">Total Pending</span>
                  <span className="text-3xl font-bold text-primary">R{pendingPayouts.toLocaleString()}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  This amount will be distributed to {mockIbos.filter(ibo => ibo.status === 'Active').length} active IBOs based on their sales and network performance.
                </p>
                <Button onClick={handleProcessPayout} size="lg" className="w-full">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Process All Payouts
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ManageCommissions;
