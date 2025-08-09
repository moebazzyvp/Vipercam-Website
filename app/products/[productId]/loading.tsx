export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-8"></div>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="aspect-[4/3] bg-gray-300 dark:bg-gray-700 rounded-lg mb-4"></div>
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-300 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
          <div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-6"></div>
            <div className="h-24 bg-gray-300 dark:bg-gray-700 rounded mb-6"></div>
            <div className="flex flex-wrap gap-2 mb-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
              ))}
            </div>
            <div className="flex gap-4 mb-8">
              <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded flex-1"></div>
              <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded flex-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
