import React, { useState, useEffect } from "react";
import "../styles/z_style.css";
import { productAPI } from "../services/api";

function CategoryTab() {
    const [categories, setCategories] = useState([
        "All",
        "Electronics",
        "Fashion",
        "Home",
        "Toys",
        "Books",
        "Beauty"
    ]);

    const [active, setActive] = useState("All");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let mounted = true;
        async function fetchCategories() {
            setLoading(true);
            try {
                // get all products and extract unique categories
                const products = await productAPI.getAll();
                if (!mounted) return;
                if (Array.isArray(products)) {
                    const unique = Array.from(new Set(products
                        .map(p => p.category)
                        .filter(Boolean)
                    ));
                    // ensure "All" is first
                    setCategories(["All", ...unique]);
                } else {
                    // API might return { data: [...] } depending on backend shape
                    const list = products.data || products.products || [];
                    const unique = Array.from(new Set(list
                        .map(p => p.category)
                        .filter(Boolean)
                    ));
                    setCategories(["All", ...unique]);
                }
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

    return (
        <section className="z_catTab_section">
            <div className="z_catTab_wrapper">
                <ul className="z_catTab_list">
                    {loading ? (
                        <li className="z_catTab_item">Loading...</li>
                    ) : (
                        categories.map((cat) => (
                            <li
                                key={cat}
                                className={`z_catTab_item ${active === cat ? "active" : ""}`}
                                onClick={() => setActive(cat)}
                            >
                                {cat}
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </section>
    );
}

export default CategoryTab;
