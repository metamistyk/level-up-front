import React, { useState } from 'react';
import '../utils/QuantitySelector.logic.js';

export default function QuantitySelector({ onAddToCart }) {

    const [cantidad, setCantidad] = useState(1);

    const aumentarCantidad = () =>
        setCantidad(c => window.QuantitySelectorLogic.aumentarCantidad(c));

    const disminuirCantidad = () =>
        setCantidad(c => window.QuantitySelectorLogic.disminuirCantidad(c));

    const handleAgregar = () =>
        window.QuantitySelectorLogic.handleAgregar(onAddToCart, cantidad);

    return (
        <div className="d-flex align-items-center mt-2">
            <button className="btn btn-outline-primary me-2" onClick={disminuirCantidad}>-</button>
            
            <span className="fs-5">{cantidad}</span>

            <button className="btn btn-outline-primary ms-2" onClick={aumentarCantidad}>+</button>

            <button
                className="btn btn-primary ms-3"
                onClick={handleAgregar}
            >
                Agregar
            </button>
        </div>
    );
}
