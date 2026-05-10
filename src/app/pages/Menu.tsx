import { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import {
  Search,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const initialMenuItems = [
  {
    id: 1,
    name: "Espresso",
    category: "Coffee",
    price: 3.5,
    description: "Rich and bold shot of espresso",
    status: "available",
    popular: true,
  },
  {
    id: 2,
    name: "Cappuccino",
    category: "Coffee",
    price: 4.5,
    description:
      "Espresso with steamed milk and foam",
    status: "available",
    popular: true,
  },
  {
    id: 3,
    name: "Latte",
    category: "Coffee",
    price: 4.75,
    description:
      "Smooth espresso with steamed milk",
    status: "available",
    popular: true,
  },
  {
    id: 4,
    name: "Croissant",
    category: "Pastries",
    price: 3.0,
    description:
      "Buttery and flaky French pastry",
    status: "available",
    popular: false,
  },
];

export function Menu() {
  const [menuItems, setMenuItems] = useState(
    initialMenuItems
  );

  const [searchQuery, setSearchQuery] =
    useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("all");

  const [editingItem, setEditingItem] =
    useState<any>(null);

  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
  });

  const categories = [
    "all",
    ...Array.from(
      new Set(
        menuItems.map((item) => item.category)
      )
    ),
  ];

  const filteredItems = menuItems.filter(
    (item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" ||
        item.category === categoryFilter;

      return matchesSearch && matchesCategory;
    }
  );

  // Add Item
  const handleAddItem = () => {
    if (
      !newItem.name ||
      !newItem.category ||
      !newItem.price
    ) {
      return;
    }

    const item = {
      id: Date.now(),
      name: newItem.name,
      category: newItem.category,
      price: Number(newItem.price),
      description: newItem.description,
      status: "available",
      popular: false,
    };

    setMenuItems((prev) => [...prev, item]);

    setNewItem({
      name: "",
      category: "",
      price: "",
      description: "",
    });
  };

  // Delete Item
  const handleDelete = (id: number) => {
    setMenuItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // Save Edit
  const handleEditSave = () => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === editingItem.id
          ? editingItem
          : item
      )
    );

    setEditingItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Menu Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage your coffee shop menu
          </p>
        </div>

        {/* Add Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-amber-600 hover:bg-amber-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Add New Menu Item
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">

              <div>
                <Label>Item Name</Label>

                <Input
                  value={newItem.name}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      name: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <Label>Category</Label>

                <Select
                  onValueChange={(value) =>
                    setNewItem({
                      ...newItem,
                      category: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Coffee">
                      Coffee
                    </SelectItem>

                    <SelectItem value="Pastries">
                      Pastries
                    </SelectItem>

                    <SelectItem value="Cold Drinks">
                      Cold Drinks
                    </SelectItem>

                    <SelectItem value="Specialty">
                      Specialty
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Price</Label>

                <Input
                  type="number"
                  value={newItem.price}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      price: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <Label>Description</Label>

                <Textarea
                  value={newItem.description}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <Button
                className="w-full"
                onClick={handleAddItem}
              >
                Add Item
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">

        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

          <Input
            placeholder="Search menu..."
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
            className="pl-10"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto">
          {categories.map((category) => (
            <Button
              key={category}
              variant={
                categoryFilter === category
                  ? "default"
                  : "outline"
              }
              onClick={() =>
                setCategoryFilter(category)
              }
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {filteredItems.map((item) => (
          <Card
            key={item.id}
            className="p-6 hover:shadow-lg transition"
          >
            {/* Top */}
            <div className="flex items-start justify-between mb-4">

              <div>
                <h3 className="font-semibold text-lg">
                  {item.name}
                </h3>

                <Badge
                  variant="outline"
                  className="mt-2"
                >
                  {item.category}
                </Badge>
              </div>

              <div className="flex gap-1">

                {/* Edit */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setEditingItem(item)
                  }
                >
                  <Edit className="w-4 h-4" />
                </Button>

                {/* Delete */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    handleDelete(item.id)
                  }
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </Button>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 min-h-[50px]">
              {item.description}
            </p>

            {/* Bottom */}
            <div className="flex items-center justify-between pt-4 mt-4 border-t">

              <div className="flex gap-2">

                <Badge
                  className={
                    item.status === "available"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }
                >
                  {item.status}
                </Badge>

                {item.popular && (
                  <Badge className="bg-amber-100 text-amber-700">
                    Popular
                  </Badge>
                )}
              </div>

              <p className="text-xl font-bold">
                ${item.price.toFixed(2)}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog
        open={!!editingItem}
        onOpenChange={() =>
          setEditingItem(null)
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Edit Menu Item
            </DialogTitle>
          </DialogHeader>

          {editingItem && (
            <div className="space-y-4 py-4">

              <Input
                value={editingItem.name}
                onChange={(e) =>
                  setEditingItem({
                    ...editingItem,
                    name: e.target.value,
                  })
                }
              />

              <Input
                value={editingItem.category}
                onChange={(e) =>
                  setEditingItem({
                    ...editingItem,
                    category: e.target.value,
                  })
                }
              />

              <Input
                type="number"
                value={editingItem.price}
                onChange={(e) =>
                  setEditingItem({
                    ...editingItem,
                    price: Number(
                      e.target.value
                    ),
                  })
                }
              />

              <Textarea
                value={editingItem.description}
                onChange={(e) =>
                  setEditingItem({
                    ...editingItem,
                    description:
                      e.target.value,
                  })
                }
              />

              <Button
                className="w-full"
                onClick={handleEditSave}
              >
                Save Changes
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}