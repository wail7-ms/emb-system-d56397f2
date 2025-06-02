
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Database, Shield, BarChart3, Users } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Database className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Advanced Database Management System
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A comprehensive web application demonstrating advanced SQL Server features, 
            role-based access control, and modern database management capabilities.
          </p>
          <Button size="lg" onClick={() => navigate('/login')} className="px-8 py-3 text-lg">
            Get Started
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Role-Based Security</h3>
            <p className="text-gray-600">Advanced RBAC and row-level security implementation</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <Database className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">SQL Server Integration</h3>
            <p className="text-gray-600">Stored procedures, triggers, and advanced features</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <BarChart3 className="h-12 w-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Analytics & Reports</h3>
            <p className="text-gray-600">Comprehensive reporting and data visualization</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">User Management</h3>
            <p className="text-gray-600">Complete user and role administration</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6">System Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-600">Database Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Advanced stored procedures and functions</li>
                <li>• Database triggers and automation</li>
                <li>• Full-text search capabilities</li>
                <li>• Performance optimization and indexing</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-green-600">Security & Access</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Role-based access control (RBAC)</li>
                <li>• Row-level security implementation</li>
                <li>• Data encryption and integrity</li>
                <li>• Audit logging and compliance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
