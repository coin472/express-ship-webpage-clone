
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";
import { FetchShipment } from "@/lib/pocketbase";

interface Shipment {
  id: string;
  customer: string;
  destination: string;
  status: string;
  date: string;
}

interface ShipmentManagementProps {
  shipments: FetchShipment[];
  onUpdateShipment: (shipmentId: string) => void;
}

export const ShipmentManagement = ({ shipments, onUpdateShipment }: ShipmentManagementProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredShipments = shipments.filter(shipment =>
    shipment.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Shipment Management</h2>
      
      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search by tracking ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tracking ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredShipments.map((shipment) => (
                <TableRow key={shipment.id}>
                  <TableCell className="font-mono">{shipment.trackingId}</TableCell>
                  <TableCell>{shipment.user}</TableCell>
                  <TableCell>{shipment.recipientAddress}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      shipment.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      shipment.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {shipment.status}
                    </span>
                  </TableCell>
                  <TableCell>{shipment.created}</TableCell>
                  <TableCell>
                    <Button 
                      onClick={() => onUpdateShipment(shipment.id)}
                      variant="outline" 
                      size="sm"
                    >
                      Update Status
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredShipments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    {searchTerm ? 'No shipments found matching your search.' : 'No shipments available.'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
