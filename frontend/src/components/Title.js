import React from 'react';

/**
 * Reusable Title Component with Minimal Vertical Bar Accent
 * @param {string} text - The title text to display.
 * @param {('center'|'left')} [align='center'] - Alignment of the title container.
 * @param {('light'|'dark')} [theme='light'] - Defines the color theme.
 * @returns {JSX.Element}
 */
export default function Title({ text,  theme = 'light' }) {
  // Determine the alignment class for the container
//   const alignmentClass = align === 'left' ? 'text-start' : 'text-center';

  // Determine the theme class for CSS targeting
  const themeClass = theme === 'dark' ? 'dark-theme' : '';
  
  // Note: We are using a Bootstrap utility class (mb-md-4 mb-2) for margin-bottom
  return (
    <div className={`${themeClass} mb-md-4 mb-2`}>
      <h2 className="minimal-bar-title">
        {text}
      </h2>
    </div>
  );
}