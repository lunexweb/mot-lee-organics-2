import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, Users, ShoppingCart, DollarSign } from "lucide-react";
import Navbar from "@/components/Navbar";
import { mockAdminData, products, mockIbos } from "@/lib/mockData";

const Analytics = () => {
  const monthlyData = [
    { month: 'Jan', revenue: 45000, orders: 120, ibos: 25 },
    { month: 'Feb', revenue: 52000, orders: 145, ibos: 28 },
    { month: 'Mar', revenue: 61000, orders: 168, ibos: 32 },
    { month: 'Apr', revenue: 73000, orders: 195, ibos: 38 },
    { month: 'May', revenue: 89000, orders: 234, ibos: 45 },
    { month: 'Jun', revenue: mockAdminData.totalRevenue, orders: mockAdminData.totalOrders, ibos: mockAdminData.totalIbos },
  ];

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
          <h1 className="text-3xl font-bold mb-2">Business Analytics</h1>
          <p className="text-muted-foreground">Comprehensive insights and performance metrics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 lg:mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R{mockAdminData.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-primary">+23% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12.5%</div>
              <p className="text-xs text-primary">+2.3% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R{Math.round(mockAdminData.totalRevenue / mockAdminData.totalOrders).toLocaleString()}</div>
              <p className="text-xs text-primary">+5.2% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">IBO Growth</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+18</div>
              <p className="text-xs text-primary">New IBOs this month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Monthly Growth */}
          <Card>
            <CardHeader>
              <CardTitle>6-Month Growth Trend</CardTitle>
              <CardDescription>Revenue, orders, and IBO growth</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyData.map((data) => (
                  <div key={data.month} className="p-4 border border-border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">{data.month}</span>
                      <span className="text-primary font-bold">R{data.revenue.toLocaleString()}</span>
                    </div>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span>{data.orders} orders</span>
                      <span>{data.ibos} IBOs</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Product Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Product Performance</CardTitle>
              <CardDescription>Sales by category</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {['Skincare', 'Wellness', 'Teas'].map((category) => {
                const categoryProducts = products.filter(p => p.category === category);
                const avgPrice = categoryProducts.reduce((sum, p) => sum + p.price, 0) / categoryProducts.length;
                
                return (
                  <div key={category} className="p-4 border border-border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">{category}</span>
                      <span className="text-muted-foreground">{categoryProducts.length} products</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Avg Price: R{Math.round(avgPrice)}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Network Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Network Distribution</CardTitle>
              <CardDescription>IBOs by rank</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {['Bronze', 'Silver', 'Gold', 'Platinum'].map((rank) => {
                const count = mockIbos.filter(ibo => ibo.rank === rank).length;
                const percentage = (count / mockIbos.length * 100).toFixed(1);
                
                return (
                  <div key={rank} className="p-4 border border-border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">{rank}</span>
                      <span className="text-primary">{count} IBOs</span>
                    </div>
                    <div className="text-sm text-muted-foreground">{percentage}% of network</div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Sales Forecast */}
          <Card>
            <CardHeader>
              <CardTitle>Growth Projections</CardTitle>
              <CardDescription>Expected performance next quarter</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Projected Revenue</div>
                <div className="text-2xl font-bold text-primary">R{Math.round(mockAdminData.totalRevenue * 1.23).toLocaleString()}</div>
                <div className="text-xs text-muted-foreground mt-1">Based on current growth rate</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Expected New IBOs</div>
                <div className="text-2xl font-bold text-primary">+54</div>
                <div className="text-xs text-muted-foreground mt-1">Next 3 months</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Estimated Orders</div>
                <div className="text-2xl font-bold text-primary">{Math.round(mockAdminData.totalOrders * 1.35).toLocaleString()}</div>
                <div className="text-xs text-muted-foreground mt-1">Next quarter</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
