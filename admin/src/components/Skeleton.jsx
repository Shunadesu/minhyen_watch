// Skeleton component for loading states
export const ProductSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
    <div className="flex items-center p-4">
      <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0 mr-4"></div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0 mr-4">
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="flex items-center space-x-2 mb-2">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
          <div className="flex items-center space-x-4 flex-shrink-0">
            <div className="h-6 bg-gray-200 rounded w-24"></div>
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 bg-gray-200 rounded"></div>
              <div className="w-9 h-9 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const CategorySkeleton = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
    <div className="flex items-center p-4">
      <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0 mr-4"></div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0 mr-4">
            <div className="h-5 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-9 h-9 bg-gray-200 rounded"></div>
            <div className="w-9 h-9 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const BrandSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
    <div className="flex items-center p-4">
      <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0 mr-4"></div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0 mr-4">
            <div className="h-5 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-9 h-9 bg-gray-200 rounded"></div>
            <div className="w-9 h-9 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

