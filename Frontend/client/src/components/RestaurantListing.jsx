// import React from "react";
// import { Star, Clock, MapPin } from "lucide-react";

// /* =========================
//    MAIN COMPONENT
// ========================= */

// import { CDN_URL } from "../utils/constants";

// const RestaurantListing = ({ resData }) => {
//   const {
//     name,
//     cuisines,
//     costForTwo,
//     avgRating,
//     sla,
//     cloudinaryImageId,
//     locality,
//   } = resData?.info || {};

//   return (
//     <div className="w-82 bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer overflow-hidden group">
//       {/* IMAGE */}
//       <div className="relative overflow-hidden">
//         <img
//           src={cloudinaryImageId ? CDN_URL + cloudinaryImageId : ""}
//           alt={name || "restaurant"}
//           className="h-40 w-full object-cover group-hover:scale-105 transition-transform duration-300"
//         />

//         {/* Rating Badge */}
//         <div className="absolute bottom-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1 shadow">
//           <Star size={12} fill="white" />
//           {avgRating || "--"}
//         </div>
//       </div>

//       {/* CONTENT */}
//       <div className="p-3 space-y-1">
//         {/* NAME */}
//         <h3 className="font-semibold text-gray-800 truncate">
//           {name || "Restaurant"}
//         </h3>

//         {/* CUISINES */}
//         <p className="text-sm text-gray-500 truncate">
//           {cuisines?.join(", ") || "Various cuisines"}
//         </p>

//         {/* LOCATION */}
//         <div className="flex items-center gap-1 text-xs text-gray-500">
//           <MapPin size={14} />
//           <span>{locality || "Nearby"}</span>
//         </div>

//         {/* FOOTER INFO */}
//         <div className="flex items-center justify-between text-xs text-gray-600 mt-2">
//           {/* DELIVERY TIME */}
//           <div className="flex items-center gap-1">
//             <Clock size={14} />
//             <span>{sla?.slaString || "N/A"}</span>
//           </div>

//           {/* COST */}
//           <span className="font-medium">{costForTwo || "N/A"}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RestaurantListing;

// /* =========================
//    HOC: PROMOTED LABEL
// ========================= */
// export const withPromotedLabel = (RestaurantCardComponent) => {
//   return (props) => {
//     return (
//       <div className="relative">
//         {/* Badge */}
//         <div className="absolute z-10 bg-black text-white text-xs px-2 py-1 rounded-md m-2">
//           Promoted
//         </div>

//         <RestaurantCardComponent {...props} />
//       </div>
//     );
//   };
// };

import React from "react";
import { Star, Clock, MapPin } from "lucide-react";

const RestaurantListing = ({ resData }) => {
  const { name, address, rating, delivery_time, image } = resData;

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer overflow-hidden group">
      {/* IMAGE */}
      <div className="relative overflow-hidden">
        <img
          src={
            image ||
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800"
          }
          alt={name}
          className="h-40 w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <div className="absolute bottom-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1 shadow">
          <Star size={12} fill="white" />
          {rating || "0.0"}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-3 space-y-2">
        <h3 className="font-semibold text-gray-800 truncate">{name}</h3>

        <div className="flex items-center gap-1 text-sm text-gray-500">
          <MapPin size={14} />
          <span>{address}</span>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{delivery_time} mins</span>
          </div>

          <span className="font-medium">⭐ {rating || "0.0"}</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantListing;

export const withPromotedLabel = (RestaurantCardComponent) => {
  return (props) => {
    return (
      <div className="relative">
        <div className="absolute z-10 bg-black text-white text-xs px-2 py-1 rounded-md m-2">
          Promoted
        </div>

        <RestaurantCardComponent {...props} />
      </div>
    );
  };
};
