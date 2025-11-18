import React, { useState } from "react";
import "../styles/z_style.css";

function CategoryTab() {
    const categories = [
        "All",
        "Electronics",
        "Fashion",
        "Home",
        "Toys",
        "Books",
        "Beauty"
    ];

    const [active, setActive] = useState("All");

    return (
        <section className="z_catTab_section">
            <div className="z_catTab_wrapper">
                <ul className="z_catTab_list">
                    {categories.map((cat) => (
                        <li
                            key={cat}
                            className={`z_catTab_item ${active === cat ? "active" : ""}`}
                            onClick={() => setActive(cat)}
                        >
                            {cat}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default CategoryTab;
