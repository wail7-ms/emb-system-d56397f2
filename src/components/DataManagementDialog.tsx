
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Search, Save, X } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface DataManagementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  type: 'users' | 'records' | 'database' | 'security' | 'logs' | 'submit';
}

type UserRecord = { id: number; name: string; email: string; role: string; status: string; };
type ProjectRecord = { id: number; title: string; type: string; date: string; status: string; };
type DatabaseRecord = { id: number; table: string; records: number; size: string; lastUpdated: string; };
type LogRecord = { id: number; timestamp: string; user: string; action: string; status: string; };

type DataRecord = UserRecord | ProjectRecord | DatabaseRecord | LogRecord;

const DataManagementDialog = ({ open, onOpenChange, title, type }: DataManagementDialogProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingData, setEditingData] = useState<any>({});
  const [newRecord, setNewRecord] = useState<any>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const { toast } = useToast();

  const getSampleData = (): DataRecord[] => {
    switch (type) {
      case 'users':
        return [
          { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
          { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
          { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Manager', status: 'Active' },
          { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'Active' },
        ];
      case 'records':
        return [
          { id: 1, title: 'Project Alpha', type: 'Development', date: '2024-06-01', status: 'In Progress' },
          { id: 2, title: 'Database Migration', type: 'Infrastructure', date: '2024-05-28', status: 'Completed' },
          { id: 3, title: 'Security Audit', type: 'Security', date: '2024-06-02', status: 'Pending' },
          { id: 4, title: 'UI Redesign', type: 'Design', date: '2024-06-03', status: 'In Progress' },
          { id: 5, title: 'Performance Testing', type: 'QA', date: '2024-05-30', status: 'Completed' },
        ];
      case 'database':
        return [
          { id: 1, table: 'users', records: 1234, size: '2.5 MB', lastUpdated: '2024-06-01 14:30' },
          { id: 2, table: 'projects', records: 567, size: '1.8 MB', lastUpdated: '2024-06-01 12:15' },
          { id: 3, table: 'logs', records: 8901, size: '5.2 MB', lastUpdated: '2024-06-01 16:45' },
          { id: 4, table: 'sessions', records: 234, size: '0.9 MB', lastUpdated: '2024-06-01 17:00' },
        ];
      case 'logs':
        return [
          { id: 1, timestamp: '2024-06-01 16:45:23', user: 'john@example.com', action: 'Login', status: 'Success' },
          { id: 2, timestamp: '2024-06-01 16:30:12', user: 'jane@example.com', action: 'Data Update', status: 'Success' },
          { id: 3, timestamp: '2024-06-01 16:15:45', user: 'admin@example.com', action: 'User Creation', status: 'Failed' },
          { id: 4, timestamp: '2024-06-01 16:00:30', user: 'bob@example.com', action: 'Password Change', status: 'Success' },
          { id: 5, timestamp: '2024-06-01 15:45:18', user: 'alice@example.com', action: 'Data Export', status: 'Success' },
        ];
      default:
        return [];
    }
  };

  const [data, setData] = useState<DataRecord[]>(getSampleData());
  
  // Filter data based on search term
  const filteredData = data.filter(row => {
    return Object.values(row).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const headers = data.length > 0 ? Object.keys(data[0]).filter(key => key !== 'id') : [];

  const handleEdit = (row: any) => {
    setEditingId(row.id);
    setEditingData({ ...row });
  };

  const handleSave = () => {
    console.log('Updating record:', editingData);
    
    setData(prevData => 
      prevData.map(row => 
        row.id === editingId ? { ...editingData } as DataRecord : row
      )
    );
    
    toast({
      title: "Record Updated",
      description: "The record has been updated successfully.",
    });
    
    setEditingId(null);
    setEditingData({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditingData({});
  };

  const handleDelete = (id: number) => {
    console.log('Deleting record with id:', id);
    
    setData(prevData => prevData.filter(row => row.id !== id));
    
    toast({
      title: "Record Deleted",
      description: "The record has been deleted successfully.",
    });
  };

  const handleAdd = () => {
    if (type === 'logs') return;
    
    console.log('Adding new record:', newRecord);
    
    const newId = Math.max(...data.map(d => d.id)) + 1;
    setData(prevData => [...prevData, { id: newId, ...newRecord } as DataRecord]);
    
    toast({
      title: "Record Added",
      description: "The new record has been added successfully.",
    });
    
    setNewRecord({});
    setShowAddForm(false);
  };

  const handleSubmitData = () => {
    console.log('Submitting new data:', newRecord);
    
    toast({
      title: "Data Submitted",
      description: "Your data has been submitted successfully.",
    });
    
    setNewRecord({});
  };

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
                <Input 
                  id="title" 
                  placeholder="Enter title"
                  value={newRecord.title || ''}
                  onChange={(e) => setNewRecord(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input 
                  id="category" 
                  placeholder="Enter category"
                  value={newRecord.category || ''}
                  onChange={(e) => setNewRecord(prev => ({ ...prev, category: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input 
                  id="description" 
                  placeholder="Enter description"
                  value={newRecord.description || ''}
                  onChange={(e) => setNewRecord(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Input 
                  id="priority" 
                  placeholder="High/Medium/Low"
                  value={newRecord.priority || ''}
                  onChange={(e) => setNewRecord(prev => ({ ...prev, priority: e.target.value }))}
                />
              </div>
            </div>
            <Button onClick={handleSubmitData} className="w-full">Submit Data</Button>
          </CardContent>
        </Card>
      );
    }

    if (showAddForm && type !== 'logs') {
      return (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add New {type === 'users' ? 'User' : 'Record'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {headers.map(header => (
                <div key={header}>
                  <Label htmlFor={header}>{header.charAt(0).toUpperCase() + header.slice(1)}</Label>
                  <Input
                    id={header}
                    placeholder={`Enter ${header}`}
                    value={newRecord[header] || ''}
                    onChange={(e) => setNewRecord(prev => ({ ...prev, [header]: e.target.value }))}
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAdd} className="flex-1">Add Record</Button>
              <Button onClick={() => setShowAddForm(false)} variant="outline" className="flex-1">Cancel</Button>
            </div>
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
            {type !== 'logs' && !showAddForm && (
              <Button 
                onClick={() => setShowAddForm(true)}
                className="flex items-center space-x-2"
              >
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
                  {filteredData.map((row, index) => (
                    <TableRow key={index}>
                      {headers.map((header) => (
                        <TableCell key={header}>
                          {editingId === row.id ? (
                            <Input
                              value={editingData[header] || ''}
                              onChange={(e) => setEditingData(prev => ({ ...prev, [header]: e.target.value }))}
                              className="min-w-0"
                            />
                          ) : header === 'status' ? (
                            <span className={`px-2 py-1 rounded text-xs ${
                              String(row[header as keyof typeof row]) === 'Active' || String(row[header as keyof typeof row]) === 'Success' || String(row[header as keyof typeof row]) === 'Completed'
                                ? 'bg-green-100 text-green-800'
                                : String(row[header as keyof typeof row]) === 'Pending' || String(row[header as keyof typeof row]) === 'In Progress'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {String(row[header as keyof typeof row])}
                            </span>
                          ) : (
                            String(row[header as keyof typeof row])
                          )}
                        </TableCell>
                      ))}
                      {type !== 'logs' && (
                        <TableCell>
                          <div className="flex space-x-2">
                            {editingId === row.id ? (
                              <>
                                <Button variant="outline" size="sm" onClick={handleSave}>
                                  <Save className="h-3 w-3" />
                                </Button>
                                <Button variant="outline" size="sm" onClick={handleCancel}>
                                  <X className="h-3 w-3" />
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button variant="outline" size="sm" onClick={() => handleEdit(row)}>
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => handleDelete(row.id)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </>
                            )}
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
