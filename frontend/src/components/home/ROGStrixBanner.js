import React from 'react';
import { FaAngleRight } from 'react-icons/fa';
import { LiaAngleRightSolid } from "react-icons/lia";

export default function GamingBanner() {
  const products = [
    {
      id: 1,
      title: 'ERGONOMIC PRECISION',
      subtitle: ['X6 GAMING', 'MOUSE'],
      price: '$49.99',
      accentColor: '#ff0000', // Red accent
      bgImage:
        'https://ap-razox.myshopify.com/cdn/shop/files/Mask_group_56_1.jpg?v=1716522402&width=330' // Placeholder image URL
    },
    {
      id: 2,
      title: 'FUTURE PERFECT',
      subtitle: ['NXSYS AERO', 'GAMING CHAIR'],
      price: null, // No price shown in the image for the chair
      accentColor: '#c4a747', // Gold/Yellow accent
      bgImage:
        'https://ap-razox.myshopify.com/cdn/shop/files/Mask_group_55_1.jpg?v=1716522402&width=690' // Placeholder image URL
    },
    {
      id: 3,
      title: 'VOLCANIC SOUND',
      subtitle: ['E910 5.8G', 'WIRELESS', 'HEADSET'],
      price: '$69.99',
      accentColor: '#ff0000', // Red accent
      bgImage:
        'https://ap-razox.myshopify.com/cdn/shop/files/Mask_group_54_1.jpg?v=1716522402&width=330' // Placeholder image URL
    }
  ];

  return (
    <div className='ROG' style={styles.container}>
      <style>{mediaStyles}</style>

      <div className="grid" style={styles.grid}>
        {products.map((product) => (
          <div
            key={product.id}
            className="card"
            style={{
              ...styles.card,
              backgroundImage: `
                linear-gradient(135deg, rgba(0,0,0,0.3), rgba(0,0,0,0.3)),
                url(${product.bgImage})
              `,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Hexagon Overlay */}
            <div style={styles.patternOverlay}>
              <svg width="100%" height="100%" style={styles.pattern}>
                <defs>
                  <pattern
                    id={`hexagon-${product.id}`}
                    x="0"
                    y="0"
                    width="40"
                    height="35"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M20 0 L30 8.66 L30 25.98 L20 34.64 L10 25.98 L10 8.66 Z"
                      fill="none"
                      stroke={`${product.accentColor}20`}
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect
                  width="100%"
                  height="100%"
                  fill={`url(#hexagon-${product.id})`}
                />
              </svg>
            </div>

            {/* CONTENT */}
            <div style={styles.content}>
              <div style={styles.textContainer}>
                <div
                  className="top-title"
                  style={{
                    ...styles.topTitle,
                    // The top title is white in the image, except for the accent color used in the glow/pattern
                    color: '#fff' 
                  }}
                >
                  {product.title}
                </div>

                <h2
                  className="subtitle"
                  style={{
                    ...styles.subtitle,
                    fontSize: '32px' // Consistent font size for all cards
                  }}
                >
                  {product.subtitle.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </h2>

                {product.price && (
                  <div className="price" style={{...styles.price, color: product.accentColor}}>
                    {product.price}
                  </div>
                )}
              </div>

              {/* BUTTON */}
              <button
                className="button"
                style={styles.button}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = product.accentColor;
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.transform = 'translateX(5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#fff';
                  e.currentTarget.style.color = '#000';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                Shop Now <span style={styles.arrow}><FaAngleRight size={18} style={{ marginBottom: '5px' }}/></span>
              </button>
            </div>

            {/* Glow/Image Placeholder (positioned for the visual) */}
            <div style={styles.productImageContainer}>
              <div
                style={{
                  ...styles.productGlow,
                  background: `radial-gradient(circle, ${product.accentColor}30 0%, transparent 70%)`
                }}
              />
              {/* Product image would be here, but is controlled by the background image style */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const styles = {
  container: {
    backgroundColor: '#faf3f3ff',
    padding: '20px',
    minHeight: '600px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)', // Set to 3 columns for desktop view
    gap: '20px',
    maxWidth: '1400px',
    width: '100%'
  },
  card: {
    borderRadius: '15px',
    overflow: 'hidden',
    position: 'relative',
    minHeight: '450px',
    display: 'flex',
    flexDirection: 'column',
    padding: '35px',
    transition: '0.3s ease',
    cursor: 'pointer'
  },
  patternOverlay: {
    position: 'absolute',
    inset: 0,
    opacity: 0.25
  },
  pattern: {
    width: '100%',
    height: '100%'
  },
  content: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', // To push the button to the bottom
    height: '100%'
  },
  textContainer: {
    // Allows text to take up space and leaves the button positioned by 'space-between'
  },
  topTitle: {
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '2.5px',
    marginBottom: '12px',
    textTransform: 'uppercase'
  },
  subtitle: {
    color: '#fff',
    fontWeight: 900,
    lineHeight: '1.1',
    marginBottom: '15px',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  price: {
    color: '#ff0000', // Overridden in the component based on product.accentColor, but kept here for default/fallback
    fontSize: '32px',
    fontWeight: '700',
    marginTop: '10px'
  },
  button: {
    backgroundColor: '#fff',
    color: '#000',
    border: 'none',
    borderRadius: '6px',
    padding: '7px 19px',
    fontWeight: '700',
    fontSize: '13px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    alignSelf: 'flex-start' // Aligns button to the left (start of the cross axis)
  },
  arrow: {
    fontSize: '20px',
    fontWeight: '900'
  },
  productImageContainer: {
    // Positioning to suggest the image is in the bottom-right corner as in the visual
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '100%', // Take up full width for proper background image scaling
    height: '100%', // Take up full height
    zIndex: 1, // Place below content
    pointerEvents: 'none' // Ignore mouse events
  },
  productGlow: {
    // Simulating the glow effect
    position: 'absolute',
    bottom: '0px',
    right: '0px',
    width: '100%', 
    height: '100%',
    opacity: 0.4
  }
};

/* ---------- MEDIA QUERIES ---------- */

const mediaStyles = `
  @media (max-width: 1024px) {
    .grid { grid-template-columns: repeat(2, 1fr) !important; } /* Two columns on tablets */
    .subtitle { font-size: 28px !important; }
  }

  @media (max-width: 576px) {
    .grid { grid-template-columns: repeat(1, 1fr) !important; } /* Single column on phones */
    .subtitle { font-size: 24px !important; }
    .ROG .card { min-height: 250px !important; }
  }

  @media (max-width: 480px) {
    .subtitle { font-size: 20px !important; }
    .ROG .card { min-height: 280px !important; padding: 25px !important; }
  }

  @media (max-width: 375px) {
    .subtitle { font-size: 18px !important; }
  }
`;