
import { Package, MapPin, Truck, CheckCircle } from "lucide-react";

interface TrackingStep {
  icon: any;
  title: string;
  description: string;
  location: string;
  time: string;
  status: "completed" | "current" | "pending";
}

export const generateTrackingData = (trackingNum: string): TrackingStep[] => {
  const baseSteps = [
    {
      icon: Package,
      title: "Package Received",
      description: "Your package has been received at our facility",
      location: "Los Angeles, CA",
      time: "3 days ago, 2:15 PM",
      status: "completed" as const
    },
    {
      icon: Truck,
      title: "In Transit",
      description: "Package is on its way to destination",
      location: "Phoenix, AZ",
      time: "2 days ago, 8:30 AM",
      status: "completed" as const
    },
    {
      icon: MapPin,
      title: "Arrived at Facility",
      description: "Package arrived at local delivery center",
      location: "New York, NY",
      time: "Yesterday, 6:45 PM",
      status: "completed" as const
    }
  ];

  // Different scenarios based on tracking number
  if (trackingNum.toLowerCase().includes("delivered")) {
    return [
      ...baseSteps,
      {
        icon: Truck,
        title: "Out for Delivery",
        description: "Package is on the delivery vehicle",
        location: "New York, NY",
        time: "Today, 8:30 AM",
        status: "completed" as const
      },
      {
        icon: CheckCircle,
        title: "Delivered",
        description: "Package delivered to recipient",
        location: "New York, NY",
        time: "Today, 2:30 PM",
        status: "completed" as const
      }
    ];
  } else if (trackingNum.toLowerCase().includes("transit")) {
    return [
      ...baseSteps,
      {
        icon: Truck,
        title: "Out for Delivery",
        description: "Package is on the delivery vehicle",
        location: "New York, NY",
        time: "Today, 8:30 AM",
        status: "current" as const
      },
      {
        icon: CheckCircle,
        title: "Delivered",
        description: "Package will be delivered soon",
        location: "New York, NY",
        time: "Estimated: Today, 5:00 PM",
        status: "pending" as const
      }
    ];
  } else {
    return [
      ...baseSteps,
      {
        icon: Truck,
        title: "Out for Delivery",
        description: "Package is on the delivery vehicle",
        location: "New York, NY",
        time: "Today, 8:30 AM",
        status: "current" as const
      },
      {
        icon: CheckCircle,
        title: "Delivered",
        description: "Package delivered to recipient",
        location: "New York, NY",
        time: "Estimated: Today, 2:30 PM",
        status: "pending" as const
      }
    ];
  }
};
