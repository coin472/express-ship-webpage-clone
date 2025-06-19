
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Trash2, Ban, LockOpen } from "lucide-react";
import { ExpressUser } from "@/lib/pocketbase";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface UserEditDialogProps {
  user: ExpressUser | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (userId: string, updates: Partial<ExpressUser>) => void;
  onDelete: (userId: string) => void;
  onRestrict: (userId: string) => void;
  onUnrestrict: (userId: string) => void;
}

export const UserEditDialog = ({ 
  user, 
  isOpen, 
  onClose, 
  onSave, 
  onDelete, 
  onRestrict, 
  onUnrestrict 
}: UserEditDialogProps) => {
  const [editedUser, setEditedUser] = useState<ExpressUser | null>(null);

  // Update local state when user prop changes
  useEffect(() => {
    if (user) {
      setEditedUser({ ...user });
    }
  }, [user]);

  if (!user || !editedUser) return null;

  const handleSave = () => {
    if (editedUser) {
      onSave(user.id, {
        name: editedUser.name,
        email: editedUser.email,
        role: "user",
        status: editedUser.status
      });
      onClose();
    }
  };

  const handleRestrict = () => {
    onRestrict(user.id);
    onClose();
  };

  const handleUnrestrict = () => {
    onUnrestrict(user.id);
    onClose();
  };

  const handleDelete = () => {
    onDelete(user.id);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={editedUser.name}
              onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={editedUser.email}
              onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Role
            </Label>
            <Select 
              value={editedUser.role} 
              onValueChange={(value) => setEditedUser({ ...editedUser, role: value })}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="moderator">Moderator</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select 
              value={editedUser.status} 
              onValueChange={(value) => setEditedUser({ ...editedUser, status: value })}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="restricted">Restricted</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t pt-4">
          <h4 className="text-sm font-medium text-gray-700">Quick Actions</h4>
          <div className="flex gap-2">
            {user.status !== 'restricted' ? (
              <Button 
                onClick={handleRestrict}
                variant="outline" 
                size="sm"
                className="text-orange-600"
              >
                <Ban className="h-3 w-3 mr-1" />
                Restrict User
              </Button>
            ) : (
              <Button 
                onClick={handleUnrestrict}
                variant="outline" 
                size="sm"
                className="text-green-600"
              >
                <LockOpen className="h-3 w-3 mr-1" />
                Unrestrict User
              </Button>
            )}
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-red-600">
                  <Trash2 className="h-3 w-3 mr-1" />
                  Delete User
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the user
                    account for {user.name} and remove all associated data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                    Delete User
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
