import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/z_style.css";
import { productAPI, categoryAPI } from "../services/api";

function CategoryTab() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    const [active, setActive] = useState(localStorage.getItem('selectedCategory') || "All");
    console.log(active,'active');
    
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let mounted = true;
        async function fetchCategories() {
            setLoading(true);
            try {
                // fetch categories and many products to determine which categories are used
                const [catRes, prodRes] = await Promise.all([
                    categoryAPI.getAll(),
                    // request many items so we can see used categories; adjust limit as needed
                    productAPI.getAll({ limit: 10000 })
                ]);
          
                if (!mounted) return;

                // normalize responses (api returns { success : true, data: [...] })
                const catsList = Array.isArray(catRes) ? catRes : (catRes && catRes.data) || [];
         
                const productsList = Array.isArray(prodRes) ? prodRes : (prodRes && prodRes.data) || [];
                   
                // build set of product category IDs (categoryId may be populated object or an id string)
                const productCategorySet = new Set(
                    productsList
                        .map(p => {
                            if (!p || !p.categoryId) return null;
                            if (typeof p.categoryId === 'object') return p.categoryId._id || p.categoryId.id || null;
                            return p.categoryId;
                        })
                        .filter(Boolean)
                        .map(id => id.toString())
                );

                // categories from backend might be objects { _id, name, ... } or simple strings
                // build map of id -> name and list of category ids from backend
                const idToName = new Map(
                    catsList
                        .map(c => {
                            const id = (typeof c === "string" ? c : (c._id || c.id));
                            const name = (typeof c === "string" ? c : c.name);
                            return [id && id.toString(), name];
                        })
                        .filter(([id]) => id)
                );

                const catIds = Array.from(idToName.keys());

                // keep only category ids that exist in product categories
                const matchedIds = catIds.filter(id => productCategorySet.has(id));

                const uniqueIds = Array.from(new Set(matchedIds));
                const categoryObjects = uniqueIds.map(id => ({
                    id: id,
                    name: idToName.get(id)
                }));

                setCategories(categoryObjects);
                console.log('====================================');
                console.log(categoryObjects,'categories');
                console.log('====================================');
            } catch (err) {
                console.error("Failed to load categories:", err);
                // keep defaults on error
            } finally {
                if (mounted) setLoading(false);
            }
        }
        fetchCategories();
        return () => { mounted = false; };
    }, []);

    // Listen to localStorage changes for category updates
    useEffect(() => {
        const handleStorageChange = () => {
            setActive(localStorage.getItem('selectedCategory') || "All");
        };
        
        // Listen to custom event from Shop component (same tab)
        window.addEventListener('categoryChanged', handleStorageChange);
        // Also listen to storage event for multi-tab support
        window.addEventListener('storage', handleStorageChange);
        
        return () => {
            window.removeEventListener('categoryChanged', handleStorageChange);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleCategoryClick = (categoryId) => {
        // Update state immediately
        setActive(categoryId);
        // Update localStorage
        localStorage.setItem('selectedCategory', categoryId);
        // Dispatch custom event so Shop component can listen
        window.dispatchEvent(new Event('categoryChanged'));
        // Small delay to ensure state updates before navigation
        setTimeout(() => {
            navigate('/shop');
        }, 0);
    };

    return (
        <section className="z_catTab_section">
            <div className="z_catTab_wrapper">
                <ul className="z_catTab_list">
                    {loading ? (
                        <li className="z_catTab_item">Loading...</li>
                    ) : (
                        <>
                            <li
                                key="all"
                                className={`z_catTab_item ${active === "All" ? "active" : ""}`}
                                onClick={() => handleCategoryClick("All")}
                            >
                                All
                            </li>
                            {categories.map((cat) => (
                                <li
                                    key={cat.id}
                                    className={`z_catTab_item ${active === cat.id ? "active" : ""}`}
                                    onClick={() => handleCategoryClick(cat.id)}
                                >
                                    {cat.name}
                                </li>
                            ))}
                        </>
                    )}
                </ul>
            </div>
        </section>
    );
}

export default CategoryTab;
