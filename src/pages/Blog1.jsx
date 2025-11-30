import React from 'react';

export default function EvolucionConsolas() {
  return (
    <section
      className="fondo-completo d-flex flex-column align-items-center"
      style={{ paddingBottom: '100px', paddingTop: '20px' }}
    >
      <h1 className="titulos"><b>La evolución de las consolas</b></h1>
      <h2 className="titulos">Este es un resumen con las consolas más representativas por generación.</h2>

      {/* Atari Pong */}
      <div className="d-flex align-items-center gap-4" style={{ maxWidth: '800px' }}>
        <img src="/assets/ataripong.jpg" alt="Atari Pong" className="consola-img" />
        <div className="custom-card-body">
          <h5 className="card-title titulos">Atari Pong</h5>
          <p className="card-text titulos">
            Lanzada en 1975, fue la primera consola que solo incluía el juego Pong,
            parecido a los arcade de esa época. Se vendieron más de 35,000 unidades,
            marcando el inicio de la industria de videojuegos en casa.
          </p>
        </div>
      </div>

      {/* Atari 2600 */}
      <div className="d-flex align-items-center gap-4" style={{ maxWidth: '800px' }}>
        <img src="/assets/atari2600.jpg" alt="Atari2600" className="consola-img" />
        <div className="custom-card-body">
          <h5 className="card-title titulos">Atari 2600</h5>
          <p className="card-text titulos">
            En 1977 apareció esta consola, la primera con cartuchos intercambiables.
            Popularizó títulos como Pac-Man y Space Invaders.
          </p>
        </div>
      </div>

      {/* NES */}
      <div className="d-flex align-items-center gap-4" style={{ maxWidth: '800px' }}>
        <img src="/assets/nes.webp" alt="NES" className="consola-img" />
        <div className="custom-card-body">
          <h5 className="card-title titulos">Nintendo Entertainment System NES</h5>
          <p className="card-text titulos">
            Lanzada en 1983, revolucionó el mercado con mejoras en gráficos y sonido.
            Introdujo franquicias como Super Mario Bros. y The Legend of Zelda.
          </p>
        </div>
      </div>

      {/* Sega Genesis */}
      <div className="d-flex align-items-center gap-4" style={{ maxWidth: '800px' }}>
        <img src="/assets/segage.jpg" alt="Sega Genesis" className="consola-img" />
        <div className="custom-card-body">
          <h5 className="card-title titulos">Sega Genesis</h5>
          <p className="card-text titulos">
            En 1988, destacó por sus gráficos avanzados y juegos fluidos.
            Sonic the Hedgehog se convirtió en su mascota insignia.
          </p>
        </div>
      </div>

      {/* PlayStation 1 */}
      <div className="d-flex align-items-center gap-4" style={{ maxWidth: '800px' }}>
        <img src="/assets/ps1.jpg" alt="PS1" className="consola-img" />
        <div className="custom-card-body">
          <h5 className="card-title titulos">Sony PlayStation</h5>
          <p className="card-text titulos">
            Lanzada en 1994, popularizó juegos en 3D y el uso de CDs,
            ampliando enormemente el espacio para juegos complejos.
          </p>
        </div>
      </div>

      {/* PlayStation 2 */}
      <div className="d-flex align-items-center gap-4" style={{ maxWidth: '800px' }}>
        <img src="/assets/ps2.webp" alt="PS2" className="consola-img" />
        <div className="custom-card-body">
          <h5 className="card-title titulos">PlayStation 2</h5>
          <p className="card-text titulos">
            Lanzada en 2000, es la consola más vendida de la historia.
            Ofreció gráficos avanzados y un catálogo masivo de juegos icónicos.
          </p>
        </div>
      </div>

      {/* Xbox 360 */}
      <div className="d-flex align-items-center gap-4" style={{ maxWidth: '800px' }}>
        <img src="/assets/xbox.jpeg" alt="Xbox 360" className="consola-img" />
        <div className="custom-card-body">
          <h5 className="card-title titulos">Xbox 360</h5>
          <p className="card-text titulos">
            Lanzada en 2005, destacó por su conectividad online y juegos en HD,
            incluyendo Halo y Gears of War.
          </p>
        </div>
      </div>

      {/* PlayStation 4 */}
      <div className="d-flex align-items-center gap-4" style={{ maxWidth: '800px' }}>
        <img src="/assets/ps4.jpeg" alt="PS4" className="consola-img" />
        <div className="custom-card-body">
          <h5 className="card-title titulos">PlayStation 4</h5>
          <p className="card-text titulos">
            Lanzada en 2013, trajo mejoras sociales y gráficas.
            Juegos como God of War y The Last of Us II fueron grandes referentes.
          </p>
        </div>
      </div>

      {/* PlayStation 5 */}
      <div className="d-flex align-items-center gap-4" style={{ maxWidth: '800px' }}>
        <img src="/assets/ps5.webp" alt="PS5" className="consola-img" />
        <div className="custom-card-body">
          <h5 className="card-title titulos">PlayStation 5</h5>
          <p className="card-text titulos">
            Lanzada en 2020, ofrece gráficos 4K, tiempos de carga ultrarrápidos
            y soporte mejorado para experiencias inmersivas.
          </p>
        </div>
      </div>
    </section>
  );
}
