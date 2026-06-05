// import { useState, useEffect } from "react";
// import axios from "axios";
// import { CDN_URL } from "./constants";

// const useRestaurantMenu = (resId) => {
//     const [items, setItems] = useState([]);
//     const [restaurantName, setRestaurantName] = useState("");
//     const [cuisines, setCuisines] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // ✅ Debug items update
//     useEffect(() => {
//         console.log("Updated items:", items);
//     }, [items]);

//     useEffect(() => {
//         if (!resId) {
//             setLoading(false);
//             return;
//         }

//         const controller = new AbortController();

//         const fetchMenu = async () => {
//             try {
//                 setLoading(true);

//                 // ✅ Axios API Call
//                 const res = await axios.get(
//                     // `http://localhost:5000/menu/${resId}`,

//                     `https://menu-gdbm.onrender.com/menu/${resId}`,
//                     {
//                         signal: controller.signal,
//                     }
//                 );

//                 const data = res.data;

//                 const cards = data?.data?.cards || [];

//                 // ✅ Restaurant Info
//                 const info =
//                     cards.find((c) => c?.card?.card?.info)
//                         ?.card?.card?.info;

//                 setRestaurantName(info?.name ?? "Unknown Restaurant");
//                 setCuisines(info?.cuisines ?? []);

//                 // ✅ Regular Menu Cards
//                 const regularCards =
//                     cards.find((c) => c?.groupedCard)
//                         ?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

//                 // ✅ Extract Item Categories
//                 const itemCategories = regularCards
//                     .map((c) => c?.card?.card)
//                     .filter(
//                         (block) =>
//                             block?.["@type"] ===
//                             "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
//                     );

//                 console.log("Categories:", itemCategories);

//                 // ✅ Flatten Menu Items
//                 const itemsList = itemCategories.flatMap((category) => {
//                     const title = category?.title;

//                     return (category?.itemCards || []).map((item) => {
//                         const info = item?.card?.info;

//                         return {
//                             id: info?.id,
//                             name: info?.name,
//                             price:
//                                 (info?.price || info?.defaultPrice || 0) / 100,
//                             description: info?.description,
//                             imageUrl: info?.imageId
//                                 ? CDN_URL + info.imageId
//                                 : null,
//                             category: title,
//                         };
//                     });
//                 });

//                 setItems(itemsList);
//                 setError(null);

//             } catch (err) {
//                 if (err.name !== "CanceledError") {
//                     console.error(err);
//                     setError("Failed to load menu");
//                 }
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchMenu();

//         return () => controller.abort();
//     }, [resId]);

//     return {
//         items,
//         restaurantName,
//         cuisines,
//         loading,
//         error,
//     };
// };

// export default useRestaurantMenu;






import { useState, useEffect } from "react";
import axios from "axios";
import { CDN_URL } from "./constants";

const useRestaurantMenu = (resId) => {
    const [items, setItems] = useState([]);
    const [restaurantName, setRestaurantName] = useState("");
    const [cuisines, setCuisines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!resId) {
            setLoading(false);
            return;
        }

        const controller = new AbortController();

        const fetchMenu = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await axios.get(
                    `https://menu-gdbm.onrender.com/menu/${resId}`,
                    {
                        signal: controller.signal,
                    }
                );

                const data = res.data;
                const cards = data?.data?.cards || [];

                // ================= RESTAURANT INFO =================
                const info =
                    cards.find((c) => c?.card?.card?.info)?.card?.card?.info || {};

                setRestaurantName(info.name || "Unknown Restaurant");
                setCuisines(info.cuisines || []);

                // ================= MENU CARDS =================
                const regularCards =
                    cards.find((c) => c?.groupedCard)?.groupedCard?.cardGroupMap
                        ?.REGULAR?.cards || [];

                // ================= ITEM CATEGORIES =================
                const itemCategories = regularCards
                    .map((c) => c?.card?.card)
                    .filter(
                        (block) =>
                            block?.["@type"] ===
                            "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
                    );

                // ================= FLATTEN ITEMS =================
                const itemsList = itemCategories.flatMap((category) => {
                    const categoryTitle = category?.title || "Others";

                    return (category?.itemCards || []).map((item) => {
                        const info = item?.card?.info || {};

                        return {
                            id: info.id,
                            name: info.name,
                            price: (info.price || info.defaultPrice || 0) / 100,
                            description: info.description || "",
                            imageUrl: info.imageId
                                ? `${CDN_URL}${info.imageId}`
                                : null,
                            category: categoryTitle,
                            rating: info.ratings?.aggregatedRating?.rating || null,
                            isVeg: info.isVeg || false,
                        };
                    });
                });

                setItems(itemsList);
            } catch (err) {
                if (
                    err.name !== "CanceledError" &&
                    err.code !== "ERR_CANCELED"
                ) {
                    console.error("Menu fetch error:", err);
                    setError("Failed to load menu");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchMenu();

        return () => {
            controller.abort();
        };
    }, [resId]);

    return {
        items,
        restaurantName,
        cuisines,
        loading,
        error,
    };
};

export default useRestaurantMenu;