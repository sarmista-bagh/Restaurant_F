const Shimmer = () => {
  return (
    <div className="flex flex-wrap justify-center gap-8 p-6 bg-gray-50">
      {Array(12)
        .fill("")
        .map((_, index) => (
          <div
            key={index}
            className="w-[260px] overflow-hidden rounded-2xl bg-white shadow-lg"
          >
            {/* Restaurant Image */}
            <div className="h-44 w-full animate-pulse bg-gray-300"></div>

            {/* Content */}
            <div className="space-y-4 p-4">
              {/* Restaurant Name */}
              <div className="h-5 w-3/4 rounded bg-gray-300 animate-pulse"></div>

              {/* Cuisine */}
              <div className="h-4 w-full rounded bg-gray-200 animate-pulse"></div>
              <div className="h-4 w-5/6 rounded bg-gray-200 animate-pulse"></div>
              {/* Cuisine */}
              <div className="h-4 w-full rounded bg-gray-200 animate-pulse"></div>
              <div className="h-4 w-5/6 rounded bg-gray-200 animate-pulse"></div>

              {/* Rating + Delivery */}
              <div className="flex items-center justify-between pt-2">
                <div className="h-4 w-16 rounded bg-gray-300 animate-pulse"></div>
                <div className="h-4 w-20 rounded bg-gray-300 animate-pulse"></div>
              </div>

              {/* Price */}
              <div className="h-4 w-24 rounded bg-gray-200 animate-pulse"></div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Shimmer;
