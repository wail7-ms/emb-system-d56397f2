
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart3, TrendingUp, Users, Database } from 'lucide-react';

interface ReportsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
}

const ReportsDialog = ({ open, onOpenChange, title }: ReportsDialogProps) => {
  const sampleReports = [
    {
      title: "User Activity Report",
      description: "Last 30 days user engagement metrics",
      value: "1,234 active users",
      icon: Users,
      color: "bg-blue-500"
    },
    {
      title: "Database Performance",
      description: "Query execution times and optimization metrics",
      value: "97.8% efficiency",
      icon: Database,
      color: "bg-green-500"
    },
    {
      title: "Growth Analytics",
      description: "Monthly growth trends and projections",
      value: "+12.5% this month",
      icon: TrendingUp,
      color: "bg-purple-500"
    },
    {
      title: "System Usage",
      description: "Resource utilization and capacity planning",
      value: "76% utilization",
      icon: BarChart3,
      color: "bg-orange-500"
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {sampleReports.map((report, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 hover-scale">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <div className={`p-2 rounded-md ${report.color}`}>
                  <report.icon className="h-6 w-6 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold text-lg mb-2">{report.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{report.description}</p>
                <p className="text-2xl font-bold text-primary">{report.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Sample Data Table</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Metric</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Value</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">2024-06-01</td>
                      <td className="border border-gray-300 px-4 py-2">User Registrations</td>
                      <td className="border border-gray-300 px-4 py-2">156</td>
                      <td className="border border-gray-300 px-4 py-2">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Good</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">2024-06-01</td>
                      <td className="border border-gray-300 px-4 py-2">Database Queries</td>
                      <td className="border border-gray-300 px-4 py-2">2,847</td>
                      <td className="border border-gray-300 px-4 py-2">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Normal</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">2024-06-01</td>
                      <td className="border border-gray-300 px-4 py-2">Response Time</td>
                      <td className="border border-gray-300 px-4 py-2">0.8s</td>
                      <td className="border border-gray-300 px-4 py-2">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Excellent</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportsDialog;
