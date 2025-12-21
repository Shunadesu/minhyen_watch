import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Image as ImageIcon, X, ZoomIn, Maximize2, CheckSquare, Square } from 'lucide-react';
import { productsAPI } from '../api/products';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedImages, setSelectedImages] = useState(new Set());
  const [isSelectMode, setIsSelectMode] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getById(id);
      setProduct(response.data);
    } catch (error) {
      toast.error('Không tìm thấy sản phẩm');
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) return;

    try {
      await productsAPI.delete(id);
      toast.success('Xóa sản phẩm thành công');
      navigate('/products');
    } catch (error) {
      toast.error('Lỗi khi xóa sản phẩm');
    }
  };

  const handleDeleteImage = async (imageIndex) => {
    if (!window.confirm('Bạn có chắc muốn xóa ảnh này?')) return;

    try {
      const updatedImages = product.images.filter((_, index) => index !== imageIndex);
      
      // Update product
      await productsAPI.update(id, { images: updatedImages });
      
      // Update local state
      setProduct({ ...product, images: updatedImages });
      
      // Adjust current image index if needed
      if (currentImageIndex >= updatedImages.length && updatedImages.length > 0) {
        setCurrentImageIndex(updatedImages.length - 1);
      } else if (updatedImages.length === 0) {
        setCurrentImageIndex(0);
      }
      
      toast.success('Xóa ảnh thành công');
    } catch (error) {
      toast.error('Lỗi khi xóa ảnh');
    }
  };

  const handleToggleSelectImage = (index) => {
    const newSelected = new Set(selectedImages);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedImages(newSelected);
  };

  const handleSelectAll = () => {
    if (product?.images) {
      if (selectedImages.size === product.images.length) {
        setSelectedImages(new Set());
      } else {
        setSelectedImages(new Set(product.images.map((_, index) => index)));
      }
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedImages.size === 0) {
      toast.error('Vui lòng chọn ảnh cần xóa');
      return;
    }

    const count = selectedImages.size;
    if (!window.confirm(`Bạn có chắc muốn xóa ${count} ảnh đã chọn?`)) return;

    try {
      // Sort indices in descending order to delete from end to start
      const indicesToDelete = Array.from(selectedImages).sort((a, b) => b - a);
      let updatedImages = [...product.images];
      
      // Delete images from end to start to maintain correct indices
      indicesToDelete.forEach(index => {
        updatedImages = updatedImages.filter((_, i) => i !== index);
      });
      
      // Update product
      await productsAPI.update(id, { images: updatedImages });
      
      // Update local state
      setProduct({ ...product, images: updatedImages });
      
      // Clear selection
      setSelectedImages(new Set());
      setIsSelectMode(false);
      
      // Adjust current image index if needed
      if (currentImageIndex >= updatedImages.length && updatedImages.length > 0) {
        setCurrentImageIndex(updatedImages.length - 1);
      } else if (updatedImages.length === 0) {
        setCurrentImageIndex(0);
      } else {
        // Check if current image was deleted
        const wasCurrentDeleted = indicesToDelete.includes(currentImageIndex);
        if (wasCurrentDeleted && updatedImages.length > 0) {
          // Set to first available image
          setCurrentImageIndex(0);
        }
      }
      
      toast.success(`Đã xóa ${count} ảnh thành công`);
    } catch (error) {
      toast.error('Lỗi khi xóa ảnh');
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Không tìm thấy sản phẩm</p>
      </div>
    );
  }

  // Helper function to fix image URL
  const fixImageUrl = (url) => {
    if (!url) return null;
    
    // Already a full URL
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    
    // Protocol-relative URL
    if (url.startsWith('//')) {
      return `https:${url}`;
    }
    
    // Absolute path
    if (url.startsWith('/')) {
      return url;
    }
    
    // Relative URL - return as is, browser will resolve
    return url;
  };

  // Get current image URL with fallback
  const getCurrentImage = () => {
    if (product?.images && product.images.length > 0) {
      const imageUrl = product.images[currentImageIndex];
      return fixImageUrl(imageUrl);
    }
    return null;
  };

  const currentImage = getCurrentImage();

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate('/products')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Quay lại</span>
        </button>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigate(`/products/${id}/edit`)}
            className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Edit className="w-5 h-5" />
            <span>Chỉnh sửa</span>
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
            <span>Xóa</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          {/* Images Section */}
          <div>
            {/* Main Image */}
            <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden mb-4 group">
              {currentImage ? (
                <>
                  <div className="relative w-full h-full">
                    <img
                      key={currentImageIndex} // Force re-render when index changes
                      src={currentImage}
                      alt={product.name}
                      className={`w-full h-full object-contain transition-transform duration-300 ${
                        isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
                      }`}
                      onClick={() => setIsZoomed(!isZoomed)}
                      onError={(e) => {
                        // Try next image if available
                        const nextIndex = currentImageIndex + 1;
                        if (product.images && product.images.length > nextIndex) {
                          setCurrentImageIndex(nextIndex);
                        } else {
                          // Show placeholder
                          e.target.style.display = 'none';
                        }
                      }}
                    />
                    {/* Image Actions */}
                    <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setIsFullscreen(true)}
                        className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
                        title="Xem toàn màn hình"
                      >
                        <Maximize2 className="w-4 h-4 text-gray-700" />
                      </button>
                      <button
                        onClick={() => setIsZoomed(!isZoomed)}
                        className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
                        title={isZoomed ? "Thu nhỏ" : "Phóng to"}
                      >
                        <ZoomIn className="w-4 h-4 text-gray-700" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="w-24 h-24 text-gray-400" />
                </div>
              )}
            </div>

            {/* Fullscreen Modal */}
            {isFullscreen && currentImage && (
              <div 
                className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
                onClick={() => setIsFullscreen(false)}
              >
                <button
                  onClick={() => setIsFullscreen(false)}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-6 h-6 text-gray-800" />
                </button>
                <img
                  src={currentImage}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
                {/* Navigation arrows */}
                {product.images && product.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex((prev) => 
                          prev > 0 ? prev - 1 : product.images.length - 1
                        );
                      }}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <ArrowLeft className="w-6 h-6 text-gray-800" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex((prev) => 
                          prev < product.images.length - 1 ? prev + 1 : 0
                        );
                      }}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white rounded-full hover:bg-gray-100 transition-colors rotate-180"
                    >
                      <ArrowLeft className="w-6 h-6 text-gray-800" />
                    </button>
                  </>
                )}
              </div>
            )}

            {/* Thumbnail Images */}
            {product.images && product.images.length > 0 && (
              <div>
                {isSelectMode && (
                  <div className="mb-2 text-sm text-gray-600">
                    Đã chọn: {selectedImages.size} / {product.images.length} ảnh
                  </div>
                )}
                <div className={`grid gap-2 ${product.images.length > 1 ? 'grid-cols-4' : 'grid-cols-1'}`}>
                  {product.images.map((image, index) => {
                    const imageUrl = fixImageUrl(image);
                    const isSelected = selectedImages.has(index);
                    
                    return (
                      <div
                        key={`thumb-${index}-${image}`}
                        className={`relative group h-20 bg-gray-100 rounded-lg overflow-hidden border-2 transition-all ${
                          isSelectMode && isSelected
                            ? 'border-blue-600 ring-2 ring-blue-200 bg-blue-50'
                            : currentImageIndex === index 
                            ? 'border-primary-600 ring-2 ring-primary-200' 
                            : 'border-transparent hover:border-gray-300'
                        }`}
                      >
                        {/* Checkbox in select mode */}
                        {isSelectMode && (
                          <div className="absolute top-1 left-1 z-20">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleSelectImage(index);
                              }}
                              className={`p-1 rounded ${
                                isSelected 
                                  ? 'bg-blue-600 text-white' 
                                  : 'bg-white text-gray-600 hover:bg-gray-100'
                              } transition-colors`}
                              type="button"
                            >
                              {isSelected ? (
                                <CheckSquare className="w-4 h-4" />
                              ) : (
                                <Square className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        )}
                        
                        <button
                          onClick={() => {
                            if (isSelectMode) {
                              handleToggleSelectImage(index);
                            } else {
                              setCurrentImageIndex(index);
                            }
                          }}
                          className="w-full h-full relative"
                          type="button"
                        >
                          {imageUrl ? (
                            <>
                              <img
                                src={imageUrl}
                                alt={`${product.name} ${index + 1}`}
                                className={`w-full h-full object-cover transition-opacity ${
                                  isSelectMode && isSelected ? 'opacity-60' : 'opacity-100'
                                }`}
                                loading="lazy"
                                onLoad={(e) => {
                                  e.target.style.display = 'block';
                                  e.target.style.opacity = '1';
                                }}
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  const placeholder = e.target.parentElement.querySelector('.image-placeholder');
                                  if (placeholder) {
                                    placeholder.classList.remove('hidden');
                                  }
                                }}
                              />
                              <div className="hidden image-placeholder w-full h-full flex items-center justify-center bg-gray-100 absolute inset-0">
                                <ImageIcon className="w-6 h-6 text-gray-400" />
                              </div>
                            </>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                              <ImageIcon className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                        </button>
                        {/* Delete button (only show when not in select mode) */}
                        {!isSelectMode && product.images.length > 1 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteImage(index);
                            }}
                            className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-10"
                            title="Xóa ảnh"
                            type="button"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

            {/* Price */}
            <div className="mb-6">
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {formatPrice(product.price)}
              </div>
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="text-lg text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </div>
              )}
              {product.discount > 0 && (
                <span className="inline-block mt-2 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                  Giảm {product.discount}%
                </span>
              )}
            </div>

            {/* Status */}
            <div className="mb-6">
              <span
                className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                  product.status === 'available'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {product.status === 'available' ? 'Có sẵn' : 'Hết hàng'}
              </span>
            </div>

            {/* Brand & Category */}
            <div className="mb-6 space-y-2">
              {product.brand && (
                <div>
                  <span className="text-sm text-gray-500">Thương hiệu:</span>
                  <span className="ml-2 font-medium">
                    {product.brand?.name || product.brand}
                  </span>
                </div>
              )}
              {product.category && (
                <div>
                  <span className="text-sm text-gray-500">Danh mục:</span>
                  <span className="ml-2 font-medium">
                    {product.category?.name || product.category}
                  </span>
                </div>
              )}
              {product.sku && (
                <div>
                  <span className="text-sm text-gray-500">SKU/Ref:</span>
                  <span className="ml-2 font-medium">{product.sku}</span>
                </div>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Mô tả</h2>
                <div className="text-gray-700 whitespace-pre-wrap">
                  {product.description}
                </div>
              </div>
            )}

            {/* Specifications */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Thông số kỹ thuật</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <dl className="space-y-2">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex">
                        <dt className="text-gray-600 font-medium w-1/3 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </dt>
                        <dd className="text-gray-900 flex-1">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            )}

            {/* Original URL */}
            {product.originalUrl && (
              <div className="mt-6 pt-6 border-t">
                <a
                  href={product.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-800 text-sm"
                >
                  Xem trên website gốc →
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

