
import { Card, CardContent } from "@/components/ui/card";
import { User, Settings, Bell, LucideIcon } from "lucide-react";

interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface DashboardNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const DashboardNavigation = ({ activeTab, onTabChange }: DashboardNavigationProps) => {
  const tabs: Tab[] = [
    { id: "overview", label: "Overview", icon: User },
    { id: "profile", label: "Profile", icon: Settings },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <Card>
      <CardContent className="p-4">
        <nav className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === tab.id
                  ? "bg-red-600 text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </CardContent>
    </Card>
  );
};
