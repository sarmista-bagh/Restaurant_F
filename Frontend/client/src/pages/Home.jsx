import { useEffect, useState } from "react";
import axios from "axios";

import RestaurantListing, {
  withPromotedLabel,
} from "../components/RestaurantListing";

import Shimmer from "../components/Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

// React Icons instead of lucide-react
import { FiSearch, FiX } from "react-icons/fi";

const Home = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");

  const onlineStatus = useOnlineStatus();

  const RestaurantCardPromoted = withPromotedLabel(RestaurantListing);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING",
      );

      const json = response.data;

      const restaurants =
        json?.data?.cards?.find(
          (card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants,
        )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

      setListOfRestaurants(restaurants);
      setFilteredRestaurants(restaurants);
    } catch (error) {
      console.log("API Error:", error);
    }
  };

  if (!onlineStatus) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="bg-white shadow-xl border border-red-200 rounded-2xl px-8 py-6 text-center">
          <h1 className="text-3xl font-bold text-red-500 mb-2">
            You're Offline
          </h1>
          <p className="text-gray-600">
            Please check your internet connection.
          </p>
        </div>
      </div>
    );
  }

  if (listOfRestaurants.length === 0) {
    return <Shimmer />;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-12 py-8">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-800">
            Discover Restaurants
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            Find top-rated restaurants near you
          </p>
        </div>

        {/* SEARCH + FILTER */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 mt-1">
          {/* SEARCH BOX */}
          <div className="flex w-full md:w-[420px]">
            <div className="relative w-full">
              <input
                type="text"
                value={searchText}
                placeholder="Search restaurants, cuisines..."
                className="w-full bg-white border border-gray-200 rounded-l-2xl pl-11 pr-10 py-2 shadow-sm outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchText(value);

                  if (!value.trim()) {
                    setFilteredRestaurants(listOfRestaurants);
                  } else {
                    const filtered = listOfRestaurants.filter((res) =>
                      res?.info?.name
                        ?.toLowerCase()
                        .includes(value.toLowerCase()),
                    );
                    setFilteredRestaurants(filtered);
                  }
                }}
              />

              {/* SEARCH ICON */}
              <FiSearch
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              {/* CLEAR BUTTON */}
              {searchText && (
                <FiX
                  size={18}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-red-500"
                  onClick={() => {
                    setSearchText("");
                    setFilteredRestaurants(listOfRestaurants);
                  }}
                />
              )}
            </div>

            {/* SEARCH BUTTON */}
            <button
              className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white px-6 rounded-r-2xl font-semibold shadow-md transition-all"
              onClick={() => {
                const filtered = listOfRestaurants.filter((res) =>
                  res?.info?.name
                    ?.toLowerCase()
                    .includes(searchText.toLowerCase()),
                );
                setFilteredRestaurants(filtered);
              }}
            >
              Search
            </button>
          </div>

          {/* TOP RATED */}
          <button
            className="bg-green-500 hover:bg-green-600 active:scale-95 text-white px-6 py-2 rounded-2xl font-semibold shadow-md transition-all"
            onClick={() => {
              const filteredList = listOfRestaurants.filter(
                (res) => res?.info?.avgRating > 4.2,
              );
              setFilteredRestaurants(filteredList);
            }}
          >
            Top Rated
          </button>
        </div>
      </div>

      {/* RESTAURANTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredRestaurants?.map((restaurant, index) => (
          <Link
            key={restaurant?.info?.id}
            to={"/restaurants/" + restaurant?.info?.id}
            className="transform hover:scale-105 transition duration-300"
          >
            {restaurant?.info?.differentiatedUi?.displayType ===
              "ADS_UI_DISPLAY_TYPE_ENUM_DEFAULT" && index < 3 ? (
              <RestaurantCardPromoted resData={restaurant} />
            ) : (
              <RestaurantListing resData={restaurant} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
