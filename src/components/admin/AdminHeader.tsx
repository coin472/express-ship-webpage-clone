
import { Shield } from "lucide-react";
import { ExpressUser } from "@/lib/pocketbase";

interface AdminHeaderProps {
  user: ExpressUser | null;
}

export const AdminHeader = ({ user }: AdminHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        <Shield className="mr-2 h-6 w-6 text-red-600" />
        <h1 className="text-3xl font-bold">Admin Control Panel</h1>
      </div>
      <p className="text-muted-foreground">Welcome back, {user?.name}</p>
    </div>
  );
};
