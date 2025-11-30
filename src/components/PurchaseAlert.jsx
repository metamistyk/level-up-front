import React, { useEffect } from 'react';

const PurchaseAlert = ({ show, message, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // desaparece después de 3 segundos
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      backgroundColor: '#111', // fondo oscuro
      color: 'var(--blue-electric)', // texto azul eléctrico
      border: '2px solid var(--blue-electric)',
      padding: '1rem 1.5rem',
      borderRadius: '8px',
      zIndex: 1000,
      boxShadow: '0 0 10px var(--blue-electric)',
      fontWeight: 'bold'
    }}>
      {message}
    </div>
  );
};

export default PurchaseAlert;
