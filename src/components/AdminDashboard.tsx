import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Users, Database, BarChart3, Settings, FileText, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import ReportsDialog from './ReportsDialog';
import DataManagementDialog from './DataManagementDialog';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [dialogState, setDialogState] = useState({
    reports: false,
    users: false,
    database: false,
    security: false,
    logs: false
  });

  const adminFeatures = [
    {
      title: "User Management",
      description: "Manage users, roles, and permissions",
      icon: Users,
      path: "/users",
      color: "bg-blue-500",
      dialogType: 'users'
    },
    {
      title: "Database Operations",
      description: "View and manage database tables",
      icon: Database,
      path: "/records",
      color: "bg-green-500",
      dialogType: 'database'
    },
    {
      title: "System Reports",
      description: "Analytics and performance reports",
      icon: BarChart3,
      path: "/reporting",
      color: "bg-purple-500",
      dialogType: 'reports'
    },
    {
      title: "Security Settings",
      description: "RBAC and security configuration",
      icon: Shield,
      path: "/security",
      color: "bg-red-500",
      dialogType: 'security'
    },
    {
      title: "System Logs",
      description: "View system activity logs",
      icon: FileText,
      path: "/logs",
      color: "bg-orange-500",
      dialogType: 'logs'
    },
    {
      title: "Configuration",
      description: "System settings and preferences",
      icon: Settings,
      path: "/settings",
      color: "bg-gray-500",
      dialogType: null
    }
  ];

  const handleAccess = (feature: typeof adminFeatures[0]) => {
    if (feature.path === "/settings") {
      navigate('/settings');
    } else if (feature.dialogType) {
      if (feature.dialogType === 'reports') {
        setDialogState(prev => ({ ...prev, reports: true }));
      } else {
        setDialogState(prev => ({ ...prev, [feature.dialogType as keyof typeof dialogState]: true }));
      }
      toast({
        title: `${feature.title} Access`,
        description: `Opening ${feature.title.toLowerCase()} interface...`,
      });
    }
  };

  const closeDialog = (type: keyof typeof dialogState) => {
    setDialogState(prev => ({ ...prev, [type]: false }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Manage your database system with full administrative access
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminFeatures.map((feature, index) => (
          <Card 
            key={feature.title} 
            className="hover:shadow-lg transition-all duration-300 cursor-pointer hover-scale group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <div className={`p-2 rounded-md ${feature.color} transition-transform duration-300 group-hover:scale-110`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{feature.description}</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full transition-all duration-200 hover:scale-105 hover:bg-primary hover:text-primary-foreground"
                onClick={() => handleAccess(feature)}
              >
                Access
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300 hover-scale">
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

        <Card className="hover:shadow-lg transition-all duration-300 hover-scale">
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

      {/* Dialog Components */}
      <ReportsDialog
        open={dialogState.reports}
        onOpenChange={() => closeDialog('reports')}
        title="System Reports & Analytics"
      />

      <DataManagementDialog
        open={dialogState.users}
        onOpenChange={() => closeDialog('users')}
        title="User Management"
        type="users"
      />

      <DataManagementDialog
        open={dialogState.database}
        onOpenChange={() => closeDialog('database')}
        title="Database Operations"
        type="database"
      />

      <DataManagementDialog
        open={dialogState.security}
        onOpenChange={() => closeDialog('security')}
        title="Security & Access Control"
        type="records"
      />

      <DataManagementDialog
        open={dialogState.logs}
        onOpenChange={() => closeDialog('logs')}
        title="System Activity Logs"
        type="logs"
      />
    </div>
  );
};

export default AdminDashboard;
