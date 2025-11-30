import React from 'react';
import Hero from '../components/Hero';

export default function AudioSection() {
  return (
    <section className='fondo-completo custom-card-body'>
      <h2 className='titulos'>La importancia de un buen setup gamer</h2>

      <p className='titulos'>
        Tener un buen setup gamer no solo mejora tu experiencia de juego, sino que también puede aumentar tu rendimiento y 
        comodidad durante largas sesiones. Un equipo bien elegido — desde una silla ergonómica, un buen monitor con alta 
        tasa de refresco, hasta un mouse y teclado precisos — marca la diferencia entre jugar bien y disfrutar realmente del juego.
        <br /><br />
        Además, un setup adecuado ayuda a prevenir problemas físicos como dolores de espalda o tensión en las manos. 
        La combinación correcta de hardware y accesorios crea un entorno inmersivo, donde cada detalle cuenta: 
        la calidad del audio, la velocidad de respuesta, la iluminación, y hasta la comodidad de la silla.
        <br /><br />
        Invertir en un buen setup no es solo para profesionales o streamers, sino para cualquier jugador que quiera 
        maximizar su diversión y cuidar su salud mientras juega. ¿Listo para armar tu espacio ideal?
      </p>

      <Hero />
    </section>
  );
}
