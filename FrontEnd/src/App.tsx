import { useState } from "react";
import { obtenerProductos } from "./data/catalogoLocal";
import logoKriska from "./assets/marca/logo-kriska.png";
import "./App.css";

function App() {
  const productos = obtenerProductos();
  const categorias = [
    "Todos",
    ...new Set(productos.map((producto) => producto.categoria)),
  ];
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  const productosVisibles = productos.filter((producto) => {
    const coincideCategoria =
      categoriaActiva === "Todos" || producto.categoria === categoriaActiva;
    const termino = busqueda.trim().toLowerCase();
    return (
      coincideCategoria &&
      (!termino || producto.codigo.toLowerCase().includes(termino))
    );
  });

  return (
    <main>
      <header className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">KRISKA · Colección artesanal</p>
          <h1>
            Hecho para vestir
            <br />
            <em>tu propia historia.</em>
          </h1>
          <p className="intro">
            Prendas y accesorios confeccionados con cuidado, pieza por pieza.
          </p>
        </div>
        <div className="hero-mark">
          <img src={logoKriska} alt="KRISKA" />
        </div>
      </header>
      <section
        className="catalog-section container"
        aria-labelledby="catalogo-titulo"
      >
        <div className="section-heading row align-items-end g-3">
          <div className="col-md">
            <p className="eyebrow">Explora la colección</p>
            <h2 id="catalogo-titulo">Piezas disponibles</h2>
          </div>
          <span className="product-count">
            {productosVisibles.length} productos
          </span>
        </div>
        <div className="controls row align-items-center g-4">
          <div className="categories col-lg" aria-label="Filtrar por categoría">
            {categorias.map((categoria) => (
              <button
                className={
                  categoria === categoriaActiva
                    ? "category btn active"
                    : "category btn"
                }
                key={categoria}
                onClick={() => setCategoriaActiva(categoria)}
                type="button"
              >
                {categoria}
              </button>
            ))}
          </div>
          <label className="search-box col-lg-3">
            <span aria-hidden="true">⌕</span>
            <input
              className="form-control"
              aria-label="Buscar productos"
              onChange={(event) => setBusqueda(event.target.value)}
              placeholder="Buscar por código..."
              type="search"
              value={busqueda}
            />
          </label>
        </div>
        {productosVisibles.length > 0 ? (
          <div className="product-grid row row-cols-2 row-cols-md-3 row-cols-xl-4 g-4">
            {productosVisibles.map((producto) => (
              <article className="product-card col" key={producto.codigo}>
                <div className="image-frame">
                  <img
                    className="img-fluid"
                    src={producto.imagenUrl}
                    alt={`${producto.categoria} ${producto.codigo}`}
                  />
                  <span className="category-tag">{producto.categoria}</span>
                </div>
                <div className="product-info">
                  <div>
                    <p className="product-code">{producto.codigo}</p>
                    <h3>{producto.descripcion}</h3>
                  </div>
                  <span className="arrow" aria-hidden="true">
                    ↗
                  </span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            No encontramos productos con esa búsqueda.
          </div>
        )}
      </section>
      <footer>
        <span>KRISKA · Piezas hechas con intención</span>
        <a
          className="whatsapp-link"
          href="https://wa.me/59179981021"
          target="_blank"
          rel="noreferrer"
          aria-label="Contactar a KRISKA por WhatsApp"
        >
          WhatsApp: +591 79981021
        </a>
        <a
          className="whatsapp-link"
          href="https://www.facebook.com/profile.php?id=100054277701587"
          target="_blank"
          rel="noreferrer"
          aria-label="Visitar Facebook de KRISKA"
        >
          Facebook
        </a>
        <a
          className="whatsapp-link"
          href="mailto:mariela.va.saa@gmail.com"
          aria-label="Enviar correo a KRISKA"
        >
          mariela.va.saa@gmail.com
        </a>
      </footer>
    </main>
  );
}

export default App;
