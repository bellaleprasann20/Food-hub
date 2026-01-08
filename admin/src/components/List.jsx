import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { styles } from "../assets/dummyadmin";
import { FiTrash2, FiStar, FiHeart } from "react-icons/fi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const List = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = "http://localhost:4000";

  const fetchList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/items`);
      
      console.log('API Response:', response.data);
      
      const items = Array.isArray(response.data) ? response.data : response.data.data;
      
      // Log items for debugging
      if (items && items.length > 0) {
        console.log('First item:', items[0]);
        console.log('Image field:', items[0].image);
        console.log('ImgUrl field:', items[0].imgUrl);
      }
      
      setList(items || []);
    } catch (error) {
      console.error("Error fetching list:", error);
      toast.error("Failed to load inventory");
    } finally {
      setLoading(false);
    }
  };

  const removeItems = async (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`${url}/api/items/${itemId}`);
        toast.success("🗑️ Item removed successfully", { theme: "dark" });
        await fetchList(); 
      } catch (error) {
        console.error("Error deleting item:", error);
        toast.error("Could not delete item");
      }
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // Helper function to get image URL - handles both 'image' and 'imgUrl' fields
  const getImageUrl = (item) => {
    if (!item) return "https://placehold.co/100x60/3a2b2b/amber?text=No+Image";
    
    // Try 'image' field first (just filename)
    if (item.image) {
      const cleanPath = item.image.replace(/^\/?(uploads\/)?/, '');
      return `${url}/uploads/${cleanPath}`;
    }
    
    // Try 'imgUrl' field (might have /uploads/ prefix)
    if (item.imgUrl) {
      // If imgUrl already has full URL, return as-is
      if (item.imgUrl.startsWith('http')) {
        return item.imgUrl;
      }
      // If it starts with /uploads/, construct full URL
      const cleanPath = item.imgUrl.replace(/^\/?(uploads\/)?/, '');
      return `${url}/uploads/${cleanPath}`;
    }
    
    return "https://placehold.co/100x60/3a2b2b/amber?text=No+Image";
  };

  return (
    <div className={styles.pageWrapper}>
      <ToastContainer />
      <div className={styles.cardContainer}>
        <h2 className={styles.title}>Menu Inventory List</h2>

        <div className={styles.tableWrapper}>
          {loading ? (
            <div className={styles.emptyState}>Loading inventory...</div>
          ) : list.length > 0 ? (
            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr>
                  <th className={styles.th}>Image</th>
                  <th className={styles.th}>Details</th>
                  <th className={styles.th}>Category</th>
                  <th className={styles.th}>Price</th>
                  <th className={styles.th}>Stats</th>
                  <th className={styles.thCenter}>Action</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item) => (
                  <tr key={item._id} className={styles.tr}>
                    <td className={styles.imgCell}>
                      <img 
                        src={getImageUrl(item)}
                        alt={item.name} 
                        className={styles.img}
                        onError={(e) => {
                          console.error(`Failed to load image for ${item.name}`);
                          console.error('Attempted URL:', e.target.src);
                          console.error('Item data:', item);
                          e.target.onerror = null; 
                          e.target.src = "https://placehold.co/100x60/3a2b2b/amber?text=No+Image";
                        }}
                        onLoad={() => {
                          console.log(`✓ Image loaded for ${item.name}:`, getImageUrl(item));
                        }}
                      />
                    </td>
                    <td className={styles.nameCell}>
                      <p className={styles.nameText}>{item.name}</p>
                      <p className={styles.descText}>{item.description}</p>
                    </td>
                    <td className={styles.categoryCell}>{item.category}</td>
                    <td className={styles.priceCell}>₹{item.price}</td>
                    <td className={styles.ratingCell}>
                      <div className="flex flex-col gap-1">
                        <div className="flex text-amber-400 text-xs">
                          {[...Array(5)].map((_, i) => (
                            <FiStar key={i} fill={i < (item.rating || 0) ? "currentColor" : "none"} />
                          ))}
                        </div>
                        <div className={styles.heartsWrapper}>
                          <FiHeart className="fill-current text-pink-500" />
                          <span className="text-sm">{item.hearts || 0}</span>
                        </div>
                      </div>
                    </td>
                    <td className={styles.thCenter}>
                      <button onClick={() => removeItems(item._id)} className={styles.deleteBtn}>
                        <FiTrash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className={styles.emptyState}>No items found in the inventory.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default List;