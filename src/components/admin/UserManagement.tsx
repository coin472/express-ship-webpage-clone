
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2, UserPlus } from "lucide-react";
import { UserEditDialog } from "./UserEditDialog";
import { ExpressUser } from "@/lib/pocketbase";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface UserManagementProps {
  users: ExpressUser[];
  onEditUser: (userId: string, updates: Partial<ExpressUser>) => void;
  onDeleteUser: (userId: string) => void;
  onAddUser?: (email: string,password: string,confirmPassword:string,name:string) => void;
  onRestrictUser: (userId:string) => void;
  onUnrestrictUser: (userId: string) => void;
}

export const UserManagement = ({ 
  users, 
  onEditUser, 
  onDeleteUser, 
  // onAddUser, 
  onRestrictUser, 
  onUnrestrictUser 
}: UserManagementProps) => {
  const [editingUser, setEditingUser] = useState<ExpressUser | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEditClick = (userId: string) => {
    console.log(users)
    const user = users.find(u => u.id === userId);
    if (user) {
      setEditingUser(user);
      setIsEditDialogOpen(true);
    }
  };

  const handleSaveUser = (userId: string, updates: Partial<ExpressUser>) => {
    onEditUser(userId, updates);
    setIsEditDialogOpen(false);
    setEditingUser(null);
  };

  const handleCloseDialog = () => {
    setIsEditDialogOpen(false);
    setEditingUser(null);
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">User Management</h2>
          {/* <Button onClick={onAddUser}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button> */}
        </div>
        
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  {/* <TableHead>Status</TableHead> */}
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>user</TableCell>
                    {/* <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user?.status === 'active' ? 'bg-green-100 text-green-800' : 
                        user?.status === 'restricted' ? 'bg-orange-100 text-orange-800' :
                        user?.status === 'suspended' ? 'bg-purple-100 text-purple-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {user?.status}
                      </span>
                    </TableCell> */}
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          onClick={() => handleEditClick(user.id)}
                          variant="outline" 
                          size="sm"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button 
                          onClick={() => onDeleteUser(user?.id)}
                          variant="outline" 
                          size="sm"
                          className="text-red-600"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <UserEditDialog
        user={editingUser}
        isOpen={isEditDialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSaveUser}
        onDelete={onDeleteUser}
        onRestrict={onRestrictUser}
        onUnrestrict={onUnrestrictUser}
      />
    </>
  );
};
