
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Database, BarChart3, Settings, FileText, Shield } from 'lucide-react';

const AdminDashboard = () => {
  const adminFeatures = [
    {
      title: "User Management",
      description: "Manage users, roles, and permissions",
      icon: Users,
      path: "/users",
      color: "bg-blue-500"
    },
    {
      title: "Database Operations",
      description: "View and manage database tables",
      icon: Database,
      path: "/records",
      color: "bg-green-500"
    },
    {
      title: "System Reports",
      description: "Analytics and performance reports",
      icon: BarChart3,
      path: "/reporting",
      color: "bg-purple-500"
    },
    {
      title: "Security Settings",
      description: "RBAC and security configuration",
      icon: Shield,
      path: "/security",
      color: "bg-red-500"
    },
    {
      title: "System Logs",
      description: "View system activity logs",
      icon: FileText,
      path: "/logs",
      color: "bg-orange-500"
    },
    {
      title: "Configuration",
      description: "System settings and preferences",
      icon: Settings,
      path: "/settings",
      color: "bg-gray-500"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Manage your database system with full administrative access
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminFeatures.map((feature) => (
          <Card key={feature.title} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <div className={`p-2 rounded-md ${feature.color}`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{feature.description}</p>
              <Button variant="outline" size="sm" className="w-full">
                Access
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Total Users:</span>
                <span className="font-semibold">1,234</span>
              </div>
              <div className="flex justify-between">
                <span>Active Sessions:</span>
                <span className="font-semibold">45</span>
              </div>
              <div className="flex justify-between">
                <span>Database Size:</span>
                <span className="font-semibold">2.3 GB</span>
              </div>
              <div className="flex justify-between">
                <span>System Uptime:</span>
                <span className="font-semibold">99.9%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">User login: john@example.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">Database backup completed</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">New user registration</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm">System maintenance scheduled</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
