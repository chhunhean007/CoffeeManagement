import { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";

import {
  Search,
  MoreVertical,
  Clock,
  CheckCircle2,
  XCircle,
  ChefHat,
  Eye,
  Filter,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

const initialOrders = [
  {
    id: "#1240",
    customer: "Sarah Johnson",
    items: ["2x Cappuccino", "1x Chocolate Croissant"],
    total: 14.5,
    status: "pending",
    time: "2 mins ago",
    table: "Table 5",
  },
  {
    id: "#1239",
    customer: "Mike Chen",
    items: ["1x Espresso", "1x Blueberry Muffin"],
    total: 8.0,
    status: "preparing",
    time: "5 mins ago",
    table: "Table 12",
  },
  {
    id: "#1238",
    customer: "Emma Wilson",
    items: ["3x Latte", "2x Bagel"],
    total: 24.5,
    status: "ready",
    time: "8 mins ago",
    table: "Table 3",
  },
  {
    id: "#1237",
    customer: "David Lee",
    items: ["1x Americano"],
    total: 4.5,
    status: "completed",
    time: "15 mins ago",
    table: "Table 8",
  },
];

const statusConfig = {
  pending: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800",
    icon: Clock,
  },

  preparing: {
    label: "Preparing",
    color: "bg-blue-100 text-blue-800",
    icon: ChefHat,
  },

  ready: {
    label: "Ready",
    color: "bg-purple-100 text-purple-800",
    icon: CheckCircle2,
  },

  completed: {
    label: "Completed",
    color: "bg-green-100 text-green-800",
    icon: CheckCircle2,
  },

  cancelled: {
    label: "Cancelled",
    color: "bg-red-100 text-red-800",
    icon: XCircle,
  },
};

export function Orders() {
  const [orders, setOrders] =
    useState(initialOrders);

  const [searchQuery, setSearchQuery] =
    useState("");

  const [filterStatus, setFilterStatus] =
    useState("all");

  // Filter Orders
  const filteredOrders = orders.filter(
    (order) => {
      const matchesSearch =
        order.customer
          .toLowerCase()
          .includes(
            searchQuery.toLowerCase()
          ) ||
        order.id
          .toLowerCase()
          .includes(
            searchQuery.toLowerCase()
          );

      const matchesFilter =
        filterStatus === "all" ||
        order.status === filterStatus;

      return (
        matchesSearch && matchesFilter
      );
    }
  );

  // Update Status
  const updateOrderStatus = (
    id: string,
    status: string
  ) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id
          ? { ...order, status }
          : order
      )
    );
  };

  // Stats
  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (o) => o.status === "pending"
  ).length;

  const completedOrders = orders.filter(
    (o) => o.status === "completed"
  ).length;

  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.total,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Orders Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage and monitor customer
            orders
          </p>
        </div>

        <Button className="bg-amber-600 hover:bg-amber-700">
          <Eye className="w-4 h-4 mr-2" />
          View Reports
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        <Card className="p-6">
          <p className="text-sm text-gray-500 mb-2">
            Total Orders
          </p>

          <h2 className="text-3xl font-bold">
            {totalOrders}
          </h2>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-gray-500 mb-2">
            Pending Orders
          </p>

          <h2 className="text-3xl font-bold text-yellow-600">
            {pendingOrders}
          </h2>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-gray-500 mb-2">
            Completed
          </p>

          <h2 className="text-3xl font-bold text-green-600">
            {completedOrders}
          </h2>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-gray-500 mb-2">
            Revenue
          </p>

          <h2 className="text-3xl font-bold text-blue-600">
            ${totalRevenue.toFixed(2)}
          </h2>
        </Card>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">

        {/* Search */}
        <div className="relative flex-1">

          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

          <Input
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
            className="pl-10 bg-white"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 overflow-x-auto">

          {[
            "all",
            "pending",
            "preparing",
            "ready",
            "completed",
          ].map((status) => (
            <Button
              key={status}
              variant={
                filterStatus === status
                  ? "default"
                  : "outline"
              }
              onClick={() =>
                setFilterStatus(status)
              }
              className="capitalize"
            >
              <Filter className="w-4 h-4 mr-2" />
              {status}
            </Button>
          ))}
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {filteredOrders.map((order) => {
          const statusInfo =
            statusConfig[
              order.status as keyof typeof statusConfig
            ];

          const StatusIcon =
            statusInfo.icon;

          return (
            <Card
              key={order.id}
              className="p-6 border-0 shadow-sm hover:shadow-xl transition-all duration-300"
            >

              {/* Top */}
              <div className="flex items-start justify-between mb-5">

                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {order.id}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {order.time}
                  </p>
                </div>

                {/* Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger
                    asChild
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">

                    <DropdownMenuItem
                      onClick={() =>
                        updateOrderStatus(
                          order.id,
                          "pending"
                        )
                      }
                    >
                      Pending
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() =>
                        updateOrderStatus(
                          order.id,
                          "preparing"
                        )
                      }
                    >
                      Preparing
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() =>
                        updateOrderStatus(
                          order.id,
                          "ready"
                        )
                      }
                    >
                      Ready
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() =>
                        updateOrderStatus(
                          order.id,
                          "completed"
                        )
                      }
                    >
                      Completed
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() =>
                        updateOrderStatus(
                          order.id,
                          "cancelled"
                        )
                      }
                    >
                      Cancel Order
                    </DropdownMenuItem>

                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Customer */}
              <div className="mb-5">

                <h4 className="font-semibold text-gray-900">
                  {order.customer}
                </h4>

                <p className="text-sm text-gray-500 mb-3">
                  {order.table}
                </p>

                <div className="space-y-2">
                  {order.items.map(
                    (item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between text-sm bg-gray-50 rounded-lg px-3 py-2"
                      >
                        <span className="text-gray-700">
                          {item}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Bottom */}
              <div className="flex items-center justify-between pt-4 border-t">

                <Badge
                  className={`${statusInfo.color} px-3 py-1`}
                >
                  <StatusIcon className="w-4 h-4 mr-1" />

                  {statusInfo.label}
                </Badge>

                <h3 className="text-xl font-bold text-gray-900">
                  $
                  {order.total.toFixed(
                    2
                  )}
                </h3>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}