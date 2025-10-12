import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Users, Mail, Lock, UserCheck, Loader2 } from 'lucide-react';

export const TestUsers: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [createdUsers, setCreatedUsers] = useState<any[]>([]);
  const { toast } = useToast();

  const createTestUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-test-users');

      if (error) throw error;

      setCreatedUsers(data.users);
      toast({
        title: 'Success',
        description: data.message
      });
    } catch (error: any) {
      console.error('Error creating test users:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to create test users',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Test Users</h1>
        <p className="text-muted-foreground">
          Create test users for development and testing purposes
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Generate Test Users
          </CardTitle>
          <CardDescription>
            This will create multiple test users with predefined credentials for testing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <h3 className="font-semibold text-sm">Test Users to be created:</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>admin@test.com</span>
                <Badge variant="default">Admin</Badge>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>john@test.com</span>
                <Badge variant="outline">User</Badge>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>jane@test.com</span>
                <Badge variant="outline">User</Badge>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>mike@test.com</span>
                <Badge variant="outline">User</Badge>
              </li>
            </ul>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-3">
              <Lock className="h-4 w-4" />
              <span>All passwords: <code className="bg-background px-2 py-1 rounded">User123!</code> (Admin: <code className="bg-background px-2 py-1 rounded">Admin123!</code>)</span>
            </div>
          </div>

          <Button 
            onClick={createTestUsers} 
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating Users...
              </>
            ) : (
              <>
                <UserCheck className="h-4 w-4 mr-2" />
                Create Test Users
              </>
            )}
          </Button>

          {createdUsers.length > 0 && (
            <div className="space-y-3 mt-6">
              <h3 className="font-semibold text-sm">Results:</h3>
              <div className="space-y-2">
                {createdUsers.map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-sm">{user.email}</p>
                        {user.fullName && (
                          <p className="text-xs text-muted-foreground">{user.fullName}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {user.role === 'admin' && (
                        <Badge variant="default">Admin</Badge>
                      )}
                      {user.status === 'created' && (
                        <Badge variant="default" className="bg-green-500">Created</Badge>
                      )}
                      {user.status === 'already_exists' && (
                        <Badge variant="secondary">Already Exists</Badge>
                      )}
                      {user.status === 'error' && (
                        <Badge variant="destructive">Error</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Login Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p>After creating the test users, you can log in with any of the following credentials:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
              <li><strong>Admin:</strong> admin@test.com / Admin123!</li>
              <li><strong>User:</strong> john@test.com / User123!</li>
              <li><strong>User:</strong> jane@test.com / User123!</li>
              <li><strong>User:</strong> mike@test.com / User123!</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};