import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, UserCheck, UserX, Crown } from "lucide-react";
import Navbar from "@/components/Navbar";
import { mockIbos } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

const ManageIbos = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [ibos, setIbos] = useState(mockIbos);

  const filteredIbos = ibos.filter(ibo => 
    ibo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ibo.iboNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleIboStatus = (iboNumber: string) => {
    setIbos(ibos.map(ibo => 
      ibo.iboNumber === iboNumber 
        ? { ...ibo, status: ibo.status === 'Active' ? 'Inactive' : 'Active' }
        : ibo
    ));
    toast({
      title: "Status Updated",
      description: "IBO status has been changed successfully",
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
          <h1 className="text-3xl font-bold mb-2">Manage IBOs</h1>
          <p className="text-muted-foreground">View and manage all independent business owners</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or IBO number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Total IBOs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ibos.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Active IBOs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {ibos.filter(ibo => ibo.status === 'Active').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Inactive IBOs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-muted-foreground">
                {ibos.filter(ibo => ibo.status === 'Inactive').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* IBOs List */}
        <Card>
          <CardHeader>
            <CardTitle>All IBOs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredIbos.map((ibo) => (
                <div key={ibo.iboNumber} className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-border rounded-lg gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold">{ibo.name}</p>
                      {ibo.rank === 'Platinum' && <Crown className="w-4 h-4 text-primary" />}
                    </div>
                    <p className="text-sm text-muted-foreground">IBO #{ibo.iboNumber}</p>
                    <p className="text-sm text-muted-foreground">Sponsor: {ibo.sponsorId || 'Direct'}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <Badge variant={ibo.rank === 'Platinum' || ibo.rank === 'Gold' ? 'default' : 'secondary'}>
                        {ibo.rank}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">
                        R{ibo.totalSales.toLocaleString()} sales
                      </p>
                    </div>
                    <Button
                      variant={ibo.status === 'Active' ? 'destructive' : 'default'}
                      size="sm"
                      onClick={() => toggleIboStatus(ibo.iboNumber)}
                    >
                      {ibo.status === 'Active' ? (
                        <>
                          <UserX className="w-4 h-4 mr-1" />
                          Deactivate
                        </>
                      ) : (
                        <>
                          <UserCheck className="w-4 h-4 mr-1" />
                          Activate
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManageIbos;
