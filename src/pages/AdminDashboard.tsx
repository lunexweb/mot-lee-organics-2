import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, Users, ShoppingCart, TrendingUp, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import { mockAdminData } from "@/lib/mockData";

const AdminDashboard = () => {
  return (
    <div className="bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Mot-Lee Organics Business Overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 lg:mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R{mockAdminData.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +15% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total IBOs</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAdminData.totalIbos}</div>
              <p className="text-xs text-muted-foreground">
                {mockAdminData.activeIbos} active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAdminData.totalOrders}</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+23%</div>
              <p className="text-xs text-muted-foreground">
                Month over month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
              <CardDescription>Best performing products this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAdminData.topProducts.map((product, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium line-clamp-2 break-words">{product.name}</p>
                      <p className="text-sm text-muted-foreground">#{idx + 1} best seller</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{product.sales} units</p>
                      <p className="text-xs text-muted-foreground">sold</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top IBOs */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing IBOs</CardTitle>
              <CardDescription>Highest earning distributors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAdminData.topIbos.map((ibo, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <p className="font-medium">{ibo.name}</p>
                      <p className="text-sm text-muted-foreground">{ibo.rank} Rank</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">R{ibo.sales.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">monthly sales</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your MLM business</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                <Link to="/manage-ibos" className="w-full">
                  <Button variant="outline" className="h-auto py-4 flex-col w-full">
                    <Users className="w-6 h-6 mb-2" />
                    <span>Manage IBOs</span>
                  </Button>
                </Link>
                <Link to="/manage-products" className="w-full">
                  <Button variant="outline" className="h-auto py-4 flex-col w-full">
                    <ShoppingCart className="w-6 h-6 mb-2" />
                    <span>Products</span>
                  </Button>
                </Link>
                <Link to="/manage-commissions" className="w-full">
                  <Button variant="outline" className="h-auto py-4 flex-col w-full">
                    <DollarSign className="w-6 h-6 mb-2" />
                    <span>Commissions</span>
                  </Button>
                </Link>
                <Link to="/analytics" className="w-full">
                  <Button variant="outline" className="h-auto py-4 flex-col w-full">
                    <TrendingUp className="w-6 h-6 mb-2" />
                    <span>Analytics</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
