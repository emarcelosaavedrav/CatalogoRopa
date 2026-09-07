export type Producto = {
  codigo: string;
  categoria: string;
  imagenUrl: string;
  descripcion: string;
};

const imagenes = import.meta.glob(
  "../assets/catalogo/**/*.{jpg,jpeg,png,webp}",
  {
    eager: true,
    import: "default",
    query: "?url",
  },
) as Record<string, string>;

const nombreCategoria = (categoria: string) =>
  categoria.charAt(0).toUpperCase() + categoria.slice(1);

export const obtenerProductos = (): Producto[] =>
  Object.entries(imagenes)
    .map(([ruta, imagenUrl]) => {
      const partes = ruta.split("/");
      const categoria = partes.at(-2) ?? "otros";
      const archivo = partes.at(-1) ?? "";
      const codigo = archivo.replace(/\.[^.]+$/, "");

      return {
        codigo,
        categoria: nombreCategoria(categoria),
        imagenUrl,
        descripcion: `.`,
      };
    })
    .sort((a, b) => a.codigo.localeCompare(b.codigo));
