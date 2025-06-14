
import { Card, CardContent } from "@/components/ui/card";
import { Package, Clock, CreditCard } from "lucide-react";

interface DashboardStatsProps {
  activeShipments: number;
  totalDeliveries: number;
  monthlySpending: number;
}

export const DashboardStats = ({ activeShipments, totalDeliveries, monthlySpending }: DashboardStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Shipments</p>
              <p className="text-2xl font-bold">{activeShipments}</p>
            </div>
            <Package className="h-8 w-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Deliveries</p>
              <p className="text-2xl font-bold">{totalDeliveries}</p>
            </div>
            <Clock className="h-8 w-8 text-green-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
              <p className="text-2xl font-bold">${monthlySpending.toFixed(2)}</p>
            </div>
            <CreditCard className="h-8 w-8 text-yellow-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
