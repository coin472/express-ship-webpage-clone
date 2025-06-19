
import { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { ExpressUser } from "@/lib/pocketbase";

interface AdminLayoutProps {
  children: ReactNode;
  user: ExpressUser | null;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const AdminLayout = ({ children, user, activeTab, onTabChange }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <AdminHeader user={user} />
        <div className="flex flex-col lg:flex-row gap-6">
          <AdminSidebar activeTab={activeTab} onTabChange={onTabChange} />
          <div className="flex-1">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
