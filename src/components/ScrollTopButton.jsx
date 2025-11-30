import React, { useState, useEffect } from 'react';
import '../utils/ScrollTopButton.logic.js';

export default function ScrollTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      window.ScrollTopButtonLogic.toggleVisibility(window.pageYOffset, setIsVisible);
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.ScrollTopButtonLogic.scrollToTop();
  };

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '40px',
            right: '40px',
            padding: '10px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: 'black',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
            zIndex: 1000,
          }}
          aria-label="Subir al inicio"
        >
          <img
            src="/assets/flecha.png"
            alt="flecha"
            style={{ width: '50px', height: '50px' }}
          />
        </button>
      )}
    </div>
  );
}
