import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Search, Image as ImageIcon, ChevronLeft, ChevronRight, Flame, Crown } from 'lucide-react';
import { productsAPI } from '../api/products';
import { ProductSkeleton } from '../components/Skeleton';
import toast from 'react-hot-toast';

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchProducts();
  }, [page, searchTerm]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getAll({
        page,
        limit: 10,
        q: searchTerm || undefined,
      });
      setProducts(response.data || []);
      setPagination(response.pagination || {});
    } catch (error) {
      toast.error('Lỗi khi tải sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFlag = async (id, key, value) => {
    try {
      await productsAPI.update(id, { [key]: value });
      toast.success('Đã cập nhật');
      fetchProducts();
    } catch (error) {
      toast.error('Lỗi khi cập nhật');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) return;

    try {
      await productsAPI.delete(id);
      toast.success('Xóa sản phẩm thành công');
      fetchProducts();
    } catch (error) {
      toast.error('Lỗi khi xóa sản phẩm');
    }
  };

  // Format price
  const formatPrice = (price) => {
    if (!price) return '0 VND';
    if (price >= 1000000000) {
      return `${(price / 1000000000).toFixed(1)} tỷ VND`;
    } else if (price >= 1000000) {
      return `${(price / 1000000).toFixed(1)} triệu VND`;
    } else if (price >= 1000) {
      return `${(price / 1000).toFixed(0)}k VND`;
    }
    return `${price.toLocaleString('vi-VN')} VND`;
  };

  // Get product image with fallback
  const getProductImage = (product) => {
    if (product.images && product.images.length > 0) {
      // Lấy hình ảnh đầu tiên và đảm bảo URL đúng
      let imageUrl = product.images[0];
      
      // Fix URL nếu cần
      if (imageUrl && !imageUrl.startsWith('http')) {
        imageUrl = imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl;
      }
      
      return imageUrl;
    }
    return null;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý sản phẩm</h1>
        <button className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
          <Plus className="w-5 h-5" />
          <span>Thêm sản phẩm</span>
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Products display */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-500">Không có sản phẩm nào</p>
        </div>
      ) : (
        <>
          {/* Horizontal List View */}
          <div className="space-y-3">
            {products.map((product) => {
              const imageUrl = getProductImage(product);
              return (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/products/${product._id}`)}
                >
                  <div className="flex items-center p-4">
                    {/* Product Image */}
                    <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 mr-4">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onError={(e) => {
                            const currentIndex = product.images?.indexOf(imageUrl) || 0;
                            if (product.images && product.images.length > currentIndex + 1) {
                              e.target.src = product.images[currentIndex + 1];
                            } else {
                              e.target.style.display = 'none';
                              e.target.nextSibling?.classList.remove('hidden');
                            }
                          }}
                        />
                      ) : null}
                      {(!imageUrl || product.images?.length === 0) && (
                        <div className="hidden w-full h-full flex items-center justify-center">
                          <ImageIcon className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0 mr-4">
                          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                            {product.name}
                          </h3>
                          
                          {/* Brand & Category */}
                          <div className="flex items-center space-x-2 mb-2 text-xs">
                            {product.brand && (
                              <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">
                                {product.brand.name || product.brand}
                              </span>
                            )}
                            {product.category && (
                              <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded">
                                {product.category.name || product.category}
                              </span>
                            )}
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                product.status === 'available'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {product.status === 'available' ? 'Có sẵn' : 'Hết hàng'}
                            </span>
                            {product.isHot && (
                              <span className="inline-flex items-center space-x-1 rounded-full bg-orange-50 px-2 py-1 font-semibold text-orange-700">
                                <Flame className="h-3 w-3" />
                                <span>Hot</span>
                              </span>
                            )}
                            {product.isExclusive && (
                              <span className="inline-flex items-center space-x-1 rounded-full bg-emerald-50 px-2 py-1 font-semibold text-emerald-700">
                                <Crown className="h-3 w-3" />
                                <span>Độc quyền</span>
                              </span>
                            )}
                          </div>

                          {/* Description */}
                          {product.shortDescription && (
                            <p className="text-sm text-gray-600 line-clamp-1 mb-2">
                              {product.shortDescription}
                            </p>
                          )}
                        </div>

                        {/* Price & Actions */}
                        <div className="flex items-center space-x-4 flex-shrink-0">
                          <div className="text-right">
                            <div className="text-lg font-bold text-primary-600">
                              {formatPrice(product.price)}
                            </div>
                            {product.originalPrice && product.originalPrice > product.price && (
                              <div className="text-sm text-gray-500 line-through">
                                {formatPrice(product.originalPrice)}
                              </div>
                            )}
                          </div>

                          {/* Actions */}
                          <div 
                            className="flex items-center space-x-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleFlag(product._id, 'isHot', !product.isHot);
                              }}
                              className={`p-2 rounded ${product.isHot ? 'bg-orange-50 text-orange-700' : 'text-gray-500 hover:text-orange-700 hover:bg-orange-50'}`}
                              title="Đánh dấu Hot"
                            >
                              <Flame className="w-5 h-5" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleFlag(product._id, 'isExclusive', !product.isExclusive);
                              }}
                              className={`p-2 rounded ${product.isExclusive ? 'bg-emerald-50 text-emerald-700' : 'text-gray-500 hover:text-emerald-700 hover:bg-emerald-50'}`}
                              title="Đánh dấu Độc quyền"
                            >
                              <Crown className="w-5 h-5" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/products/${product._id}`);
                              }}
                              className="text-primary-600 hover:text-primary-800 p-2 hover:bg-primary-50 rounded transition-colors"
                              title="Xem chi tiết"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(product._id);
                              }}
                              className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded transition-colors"
                              title="Xóa"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="mt-6 bg-white rounded-lg shadow px-4 py-3">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm text-gray-700">
                  Hiển thị {((pagination.page - 1) * pagination.limit) + 1} - {Math.min(pagination.page * pagination.limit, pagination.total)} trong tổng số {pagination.total} sản phẩm
                </div>
              </div>
              <div className="flex items-center justify-center space-x-1">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  title="Trang trước"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                {/* Page numbers */}
                {(() => {
                  const pages = [];
                  const totalPages = pagination.pages;
                  const currentPage = pagination.page;
                  
                  // Show first page
                  if (currentPage > 3) {
                    pages.push(
                      <button
                        key={1}
                        onClick={() => setPage(1)}
                        className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                      >
                        1
                      </button>
                    );
                    if (currentPage > 4) {
                      pages.push(
                        <span key="ellipsis1" className="px-2 text-gray-500">
                          ...
                        </span>
                      );
                    }
                  }
                  
                  // Show pages around current page
                  const start = Math.max(1, currentPage - 2);
                  const end = Math.min(totalPages, currentPage + 2);
                  
                  for (let i = start; i <= end; i++) {
                    pages.push(
                      <button
                        key={i}
                        onClick={() => setPage(i)}
                        className={`px-3 py-2 border rounded-lg transition-colors text-sm ${
                          i === currentPage
                            ? 'bg-primary-600 text-white border-primary-600'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {i}
                      </button>
                    );
                  }
                  
                  // Show last page
                  if (currentPage < totalPages - 2) {
                    if (currentPage < totalPages - 3) {
                      pages.push(
                        <span key="ellipsis2" className="px-2 text-gray-500">
                          ...
                        </span>
                      );
                    }
                    pages.push(
                      <button
                        key={totalPages}
                        onClick={() => setPage(totalPages)}
                        className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                      >
                        {totalPages}
                      </button>
                    );
                  }
                  
                  return pages;
                })()}
                
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === pagination.pages}
                  className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  title="Trang sau"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Products;
