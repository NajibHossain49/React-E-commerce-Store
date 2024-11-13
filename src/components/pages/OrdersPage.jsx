import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  ArrowUpDown,
  Package,
  Calendar,
  DollarSign,
  Clock,
} from "lucide-react";

const OrdersPage = () => {
  // State management
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "orderDate",
    direction: "desc",
  });
  const [statusFilter, setStatusFilter] = useState("all");
  const [orders, setOrders] = useState([]); // Store orders
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Error state if API call fails

  // Sort function
  const handleSort = (key) => {
    setSortConfig((currentSort) => ({
      key,
      direction:
        currentSort.key === key && currentSort.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  // Status color mapping
  const getStatusColor = (status) => {
    const colors = {
      Delivered: "bg-green-100 text-green-800",
      "In Transit": "bg-blue-100 text-blue-800",
      Processing: "bg-yellow-100 text-yellow-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  // Fetch orders from an API
  const fetchOrders = async () => {
    try {
      // Simulating an API call with fetch (replace with actual API endpoint)
      const response = await fetch("./initialOrders.json"); // Replace with actual URL
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      setOrders(data); // Update state with fetched orders
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch orders");
      setLoading(false);
    }
  };

  // Run the fetch when the component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  // Filtered and sorted orders
  const filteredOrders = useMemo(() => {
    return orders
      .filter((order) => {
        const matchesSearch = order.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesStatus =
          statusFilter === "all" || order.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (sortConfig.direction === "asc") {
          return aValue > bValue ? 1 : -1;
        }
        return aValue < bValue ? 1 : -1;
      });
  }, [searchQuery, statusFilter, sortConfig, orders]);

  // Calculate total value
  const totalValue = filteredOrders.reduce(
    (sum, order) => sum + order.price * order.quantity,
    0
  );

  return (
    <div className="min-h-screen border-4 border-transparent bg-gradient-to-r from-purple-600 to-pink-500 p-1 rounded-lg">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white">My Orders</h2>
          <p className="text-gray-300 mt-2">
            Total Order Value: ${totalValue.toFixed(2)}
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search orders..."
              className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select
            className="w-full md:w-auto px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="Delivered">Delivered</option>
            <option value="In Transit">In Transit</option>
            <option value="Processing">Processing</option>
          </select>
        </div>

        {/* Loading or Error */}
        {loading && (
          <div className="text-center py-12 text-gray-400">
            Loading orders...
          </div>
        )}
        {error && <div className="text-center py-12 text-red-400">{error}</div>}

        {/* Order List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-gray-700 rounded-lg shadow-lg p-6 transition-all hover:scale-[1.01] hover:bg-gray-600 border border-gray-600"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white">
                    {order.name}
                  </h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center text-gray-300">
                      <Package className="h-4 w-4 mr-2" />
                      <span>Quantity: {order.quantity}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Ordered: {order.orderDate}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>Estimated Delivery: {order.estimatedDelivery}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center text-white">
                    <DollarSign className="h-5 w-5" />
                    <span className="text-xl font-bold">
                      {(order.price * order.quantity).toFixed(2)}
                    </span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">
              No orders found matching your criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
