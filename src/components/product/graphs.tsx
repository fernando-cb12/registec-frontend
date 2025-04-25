import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { getProducts } from "../../api/products";
import { Product } from "my-types";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82ca9d",
];

const ProductCategoryGraphs: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchData();
  }, []);

  // Agrupar productos por categoría
  const categoryData = products.reduce<
    Record<string, { stock: number; count: number }>
  >((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = { stock: 0, count: 0 };
    }
    acc[product.category].stock += product.stock;
    acc[product.category].count += 1;
    return acc;
  }, {});

  // Datos para las gráficas
  const barData = Object.entries(categoryData).map(([category, { stock }]) => ({
    category,
    stock,
  }));

  const pieData = Object.entries(categoryData).map(([category, { count }]) => ({
    name: category,
    value: count,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-4">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Stock total por categoría
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="stock" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-4">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Productos por categoría
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {pieData.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend verticalAlign="bottom" height={36} />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProductCategoryGraphs;
