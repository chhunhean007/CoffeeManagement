import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Download, TrendingUp, TrendingDown } from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const monthlySales = [
  { month: "Jan", revenue: 28400, orders: 284, avgOrder: 100 },
  { month: "Feb", revenue: 31200, orders: 312, avgOrder: 100 },
  { month: "Mar", revenue: 35800, orders: 358, avgOrder: 100 },
  { month: "Apr", revenue: 33600, orders: 336, avgOrder: 100 },
  { month: "May", revenue: 38900, orders: 389, avgOrder: 100 },
  { month: "Jun", revenue: 42100, orders: 421, avgOrder: 100 },
];

const productPerformance = [
  { product: "Espresso", sales: 3420, revenue: 11970 },
  { product: "Cappuccino", sales: 2980, revenue: 13410 },
  { product: "Latte", sales: 2650, revenue: 12587.5 },
  { product: "Americano", sales: 2140, revenue: 8025 },
  { product: "Mocha", sales: 1820, revenue: 9555 },
  { product: "Pastries", sales: 1650, revenue: 4950 },
];

const hourlyData = [
  { hour: "6 AM", orders: 12 },
  { hour: "7 AM", orders: 28 },
  { hour: "8 AM", orders: 45 },
  { hour: "9 AM", orders: 38 },
  { hour: "10 AM", orders: 32 },
  { hour: "11 AM", orders: 28 },
  { hour: "12 PM", orders: 42 },
  { hour: "1 PM", orders: 48 },
  { hour: "2 PM", orders: 35 },
  { hour: "3 PM", orders: 38 },
  { hour: "4 PM", orders: 32 },
  { hour: "5 PM", orders: 28 },
];

export function Reports() {
  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Sales Reports</h1>
          <p className="text-gray-500">Detailed analytics and performance metrics</p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <p className="text-sm text-gray-500 mb-1">Total Revenue (This Month)</p>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">$42,100</h3>
          <div className="flex items-center gap-1 text-sm text-green-600">
            <TrendingUp className="w-4 h-4" />
            <span>+8.2% from last month</span>
          </div>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-gray-500 mb-1">Total Orders</p>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">421</h3>
          <div className="flex items-center gap-1 text-sm text-green-600">
            <TrendingUp className="w-4 h-4" />
            <span>+6.5% from last month</span>
          </div>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-gray-500 mb-1">Average Order Value</p>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">$100.00</h3>
          <div className="flex items-center gap-1 text-sm text-green-600">
            <TrendingUp className="w-4 h-4" />
            <span>+1.5% from last month</span>
          </div>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-gray-500 mb-1">Customer Satisfaction</p>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">4.8/5.0</h3>
          <div className="flex items-center gap-1 text-sm text-red-600">
            <TrendingDown className="w-4 h-4" />
            <span>-0.1 from last month</span>
          </div>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card className="p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Overview (6 Months)</h3>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={monthlySales}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#d97706" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#d97706" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Area type="monotone" dataKey="revenue" stroke="#d97706" fillOpacity={1} fill="url(#colorRevenue)" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productPerformance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" stroke="#6b7280" />
              <YAxis dataKey="product" type="category" stroke="#6b7280" width={100} />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#3b82f6" name="Units Sold" />
              <Bar dataKey="revenue" fill="#d97706" name="Revenue ($)" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Peak Hours Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="hour" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Line type="monotone" dataKey="orders" stroke="#10b981" strokeWidth={2} name="Orders" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Top Products Table */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Selling Products</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Rank</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Product</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Units Sold</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Revenue</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Avg Price</th>
              </tr>
            </thead>
            <tbody>
              {productPerformance.map((product, index) => (
                <tr key={product.product} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-sm font-medium text-gray-700">
                      {index + 1}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{product.product}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{product.sales.toLocaleString()}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">${product.revenue.toFixed(2)}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    ${(product.revenue / product.sales).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
