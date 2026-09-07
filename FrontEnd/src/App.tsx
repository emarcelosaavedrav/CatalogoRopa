import { useState } from 'react'
import { obtenerProductos } from './data/catalogoLocal'
import './App.css'

function App() {
  const productos = obtenerProductos()
  const categorias = ['Todos', ...new Set(productos.map((producto) => producto.categoria))]
  const [categoriaActiva, setCategoriaActiva] = useState('Todos')
  const [busqueda, setBusqueda] = useState('')

  const productosVisibles = productos.filter((producto) => {
    const coincideCategoria = categoriaActiva === 'Todos' || producto.categoria === categoriaActiva
    const termino = busqueda.trim().toLowerCase()
    return coincideCategoria && (!termino || producto.codigo.toLowerCase().includes(termino))
  })

  return (
    <main>
      <header className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Colección artesanal · 2026</p>
          <h1>Hecho para vestir<br /><em>tu propia historia.</em></h1>
          <p className="intro">Prendas y accesorios confeccionados con cuidado, pieza por pieza.</p>
        </div>
        <div className="hero-mark" aria-hidden="true">CR<span>°</span></div>
      </header>
      <section className="catalog-section" aria-labelledby="catalogo-titulo">
        <div className="section-heading">
          <div><p className="eyebrow">Explora la colección</p><h2 id="catalogo-titulo">Piezas disponibles</h2></div>
          <span className="product-count">{productosVisibles.length} productos</span>
        </div>
        <div className="controls">
          <div className="categories" aria-label="Filtrar por categoría">
            {categorias.map((categoria) => <button className={categoria === categoriaActiva ? 'category active' : 'category'} key={categoria} onClick={() => setCategoriaActiva(categoria)} type="button">{categoria}</button>)}
          </div>
          <label className="search-box"><span aria-hidden="true">⌕</span><input aria-label="Buscar productos" onChange={(event) => setBusqueda(event.target.value)} placeholder="Buscar por código..." type="search" value={busqueda} /></label>
        </div>
        {productosVisibles.length > 0 ? <div className="product-grid">
          {productosVisibles.map((producto) => <article className="product-card" key={producto.codigo}>
            <div className="image-frame"><img src={producto.imagenUrl} alt={`${producto.categoria} ${producto.codigo}`} /><span className="category-tag">{producto.categoria}</span></div>
            <div className="product-info"><div><p className="product-code">{producto.codigo}</p><h3>{producto.descripcion}</h3></div><span className="arrow" aria-hidden="true">↗</span></div>
          </article>)}
        </div> : <div className="empty-state">No encontramos productos con esa búsqueda.</div>}
      </section>
      <footer>Confección independiente · Piezas hechas con intención</footer>
    </main>
  )
}

export default App
