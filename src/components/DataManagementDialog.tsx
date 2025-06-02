
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { useState } from 'react';

interface DataManagementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  type: 'users' | 'records' | 'database' | 'security' | 'logs' | 'submit';
}

const DataManagementDialog = ({ open, onOpenChange, title, type }: DataManagementDialogProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const getSampleData = () => {
    switch (type) {
      case 'users':
        return [
          { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
          { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
        ];
      case 'records':
        return [
          { id: 1, title: 'Project Alpha', type: 'Development', date: '2024-06-01', status: 'In Progress' },
          { id: 2, title: 'Database Migration', type: 'Infrastructure', date: '2024-05-28', status: 'Completed' },
          { id: 3, title: 'Security Audit', type: 'Security', date: '2024-06-02', status: 'Pending' },
        ];
      case 'database':
        return [
          { id: 1, table: 'users', records: 1234, size: '2.5 MB', lastUpdated: '2024-06-01 14:30' },
          { id: 2, table: 'projects', records: 567, size: '1.8 MB', lastUpdated: '2024-06-01 12:15' },
          { id: 3, table: 'logs', records: 8901, size: '5.2 MB', lastUpdated: '2024-06-01 16:45' },
        ];
      case 'logs':
        return [
          { id: 1, timestamp: '2024-06-01 16:45:23', user: 'john@example.com', action: 'Login', status: 'Success' },
          { id: 2, timestamp: '2024-06-01 16:30:12', user: 'jane@example.com', action: 'Data Update', status: 'Success' },
          { id: 3, timestamp: '2024-06-01 16:15:45', user: 'admin@example.com', action: 'User Creation', status: 'Failed' },
        ];
      default:
        return [];
    }
  };

  const sampleData = getSampleData();
  const headers = sampleData.length > 0 ? Object.keys(sampleData[0]) : [];

  const renderForm = () => {
    if (type === 'submit') {
      return (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Submit New Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter title" />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input id="category" placeholder="Enter category" />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input id="description" placeholder="Enter description" />
              </div>
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Input id="priority" placeholder="High/Medium/Low" />
              </div>
            </div>
            <Button className="w-full">Submit Data</Button>
          </CardContent>
        </Card>
      );
    }
    return null;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
        </DialogHeader>
        
        {renderForm()}

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 flex-1 max-w-md">
              <Search className="h-4 w-4" />
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>
            {type !== 'logs' && (
              <Button className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add New</span>
              </Button>
            )}
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    {headers.map((header) => (
                      <TableHead key={header} className="capitalize">
                        {header}
                      </TableHead>
                    ))}
                    {type !== 'logs' && <TableHead>Actions</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleData.map((row, index) => (
                    <TableRow key={index}>
                      {headers.map((header) => (
                        <TableCell key={header}>
                          {header === 'status' ? (
                            <span className={`px-2 py-1 rounded text-xs ${
                              row[header as keyof typeof row] === 'Active' || row[header as keyof typeof row] === 'Success' || row[header as keyof typeof row] === 'Completed'
                                ? 'bg-green-100 text-green-800'
                                : row[header as keyof typeof row] === 'Pending' || row[header as keyof typeof row] === 'In Progress'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {row[header as keyof typeof row]}
                            </span>
                          ) : (
                            row[header as keyof typeof row]
                          )}
                        </TableCell>
                      ))}
                      {type !== 'logs' && (
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DataManagementDialog;
