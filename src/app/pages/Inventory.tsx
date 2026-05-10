import { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import {
  Search,
  Plus,
  AlertCircle,
  Package,
} from "lucide-react";
import { Progress } from "../components/ui/progress";

const initialInventory = [
  {
    id: 1,
    name: "Coffee Beans (Arabica)",
    category: "Ingredients",
    quantity: 45,
    unit: "kg",
    minStock: 20,
    price: 25.0,
    supplier: "Premium Coffee Co.",
    lastRestocked: "2024-03-20",
  },
  {
    id: 2,
    name: "Milk (Whole)",
    category: "Dairy",
    quantity: 80,
    unit: "L",
    minStock: 50,
    price: 3.5,
    supplier: "Local Dairy Farm",
    lastRestocked: "2024-03-24",
  },
  {
    id: 3,
    name: "Sugar",
    category: "Ingredients",
    quantity: 15,
    unit: "kg",
    minStock: 25,
    price: 2.0,
    supplier: "Sweet Supply Inc.",
    lastRestocked: "2024-03-18",
  },
  {
    id: 4,
    name: "Paper Cups (12oz)",
    category: "Supplies",
    quantity: 450,
    unit: "pcs",
    minStock: 200,
    price: 0.15,
    supplier: "Eco Packaging",
    lastRestocked: "2024-03-22",
  },
  {
    id: 5,
    name: "Chocolate Syrup",
    category: "Ingredients",
    quantity: 12,
    unit: "bottles",
    minStock: 15,
    price: 8.5,
    supplier: "Flavor Masters",
    lastRestocked: "2024-03-19",
  },
];

export function Inventory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [inventory, setInventory] = useState(initialInventory);

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lowStockItems = inventory.filter(
    (item) => item.quantity < item.minStock
  );

  const handleRestock = (id: number) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + item.minStock,
              lastRestocked: new Date()
                .toISOString()
                .split("T")[0],
            }
          : item
      )
    );
  };

  const getStockStatus = (
    quantity: number,
    minStock: number
  ) => {
    const percentage = (quantity / minStock) * 100;

    if (percentage < 50) {
      return {
        label: "Critical",
        color: "bg-red-100 text-red-700",
      };
    }

    if (percentage < 100) {
      return {
        label: "Low",
        color: "bg-yellow-100 text-yellow-700",
      };
    }

    return {
      label: "Good",
      color: "bg-green-100 text-green-700",
    };
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Inventory Management
          </h1>

          <p className="text-gray-500 mt-1">
            Track and manage your stock levels
          </p>
        </div>

        <Button className="bg-amber-600 hover:bg-amber-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Total Items
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {inventory.length}
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Low Stock
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {lowStockItems.length}
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Inventory Value
              </p>

              <h2 className="text-3xl font-bold mt-2">
                $
                {inventory
                  .reduce(
                    (sum, item) =>
                      sum + item.quantity * item.price,
                    0
                  )
                  .toFixed(2)}
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <Package className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

          <Input
            placeholder="Search inventory items..."
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
            className="pl-10"
          />
        </div>
      </Card>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <Card className="p-4 mb-6 border-red-200 bg-red-50">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-1" />

            <div>
              <h3 className="font-semibold text-red-800">
                Low Stock Alert
              </h3>

              <p className="text-sm text-red-700 mt-1">
                {lowStockItems.map((item) => item.name).join(", ")}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">

          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-6 py-4 text-sm text-gray-500">
                  Item
                </th>

                <th className="text-left px-6 py-4 text-sm text-gray-500">
                  Category
                </th>

                <th className="text-left px-6 py-4 text-sm text-gray-500">
                  Stock
                </th>

                <th className="text-left px-6 py-4 text-sm text-gray-500">
                  Status
                </th>

                <th className="text-left px-6 py-4 text-sm text-gray-500">
                  Supplier
                </th>

                <th className="text-left px-6 py-4 text-sm text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredInventory.map((item) => {
                const stockStatus = getStockStatus(
                  item.quantity,
                  item.minStock
                );

                const stockPercentage = Math.min(
                  (item.quantity / item.minStock) * 100,
                  100
                );

                return (
                  <tr
                    key={item.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {item.name}
                        </p>

                        <p className="text-sm text-gray-500">
                          Last Restocked:{" "}
                          {item.lastRestocked}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <Badge variant="outline">
                        {item.category}
                      </Badge>
                    </td>

                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <p className="text-sm font-medium">
                          {item.quantity} {item.unit}
                        </p>

                        <Progress
                          value={stockPercentage}
                          className="h-2"
                        />
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <Badge className={stockStatus.color}>
                        {stockStatus.label}
                      </Badge>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.supplier}
                    </td>

                    <td className="px-6 py-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleRestock(item.id)
                        }
                      >
                        Restock
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

        </div>
      </Card>
    </div>
  );
}