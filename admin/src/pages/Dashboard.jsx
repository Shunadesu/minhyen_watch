import { useEffect, useState } from 'react';
import { Package, Tag, Award, TrendingUp } from 'lucide-react';
import { productsAPI } from '../api/products';
import { categoriesAPI } from '../api/categories';
import { brandsAPI } from '../api/brands';

const Dashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    brands: 0,
    loading: true,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, categoriesRes, brandsRes] = await Promise.all([
          productsAPI.getAll({ limit: 1 }),
          categoriesAPI.getAll(),
          brandsAPI.getAll(),
        ]);

        setStats({
          products: productsRes.pagination?.total || 0,
          categories: categoriesRes.data?.length || 0,
          brands: brandsRes.data?.length || 0,
          loading: false,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        setStats({ ...stats, loading: false });
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Tổng sản phẩm',
      value: stats.products,
      icon: Package,
      color: 'bg-blue-500',
    },
    {
      title: 'Danh mục',
      value: stats.categories,
      icon: Tag,
      color: 'bg-green-500',
    },
    {
      title: 'Thương hiệu',
      value: stats.brands,
      icon: Award,
      color: 'bg-purple-500',
    },
    {
      title: 'Tổng quan',
      value: stats.products + stats.categories + stats.brands,
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      {stats.loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-full`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

