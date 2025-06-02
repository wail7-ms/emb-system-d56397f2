
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, User, Database, BarChart3 } from 'lucide-react';

const UserDashboard = () => {
  const userFeatures = [
    {
      title: "My Records",
      description: "View and edit your personal records",
      icon: FileText,
      path: "/my-records",
      color: "bg-blue-500"
    },
    {
      title: "Submit Data",
      description: "Add new data entries",
      icon: Database,
      path: "/submit",
      color: "bg-green-500"
    },
    {
      title: "My Reports",
      description: "View your personal analytics",
      icon: BarChart3,
      path: "/my-reports",
      color: "bg-purple-500"
    },
    {
      title: "Profile Settings",
      description: "Update your profile information",
      icon: User,
      path: "/profile",
      color: "bg-gray-500"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">User Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Access your personal data and submit new entries
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {userFeatures.map((feature) => (
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
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>My Records:</span>
                <span className="font-semibold">23</span>
              </div>
              <div className="flex justify-between">
                <span>Pending Submissions:</span>
                <span className="font-semibold">2</span>
              </div>
              <div className="flex justify-between">
                <span>Last Login:</span>
                <span className="font-semibold">2 hours ago</span>
              </div>
              <div className="flex justify-between">
                <span>Account Status:</span>
                <span className="font-semibold text-green-600">Active</span>
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
                <span className="text-sm">Record updated successfully</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">New data submission</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">Profile information updated</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;
