import React, { useState } from "react";

const Paginacion = ({
  query,
  hookSetEstadoPagina,
  hookEstadoPagina,
  datos,
}) => {
  const [estadoCantidad, setEstadoCantidad] = useState(0);
  if (query[0]) return <p className="parratoCargando">Loading ...</p>;
  if (query[1]) return <p className="parratoError">error</p>;

  let cantidadPaginas = [];

  let cantidadPaginaMod = datos.length % 10;
  let cantidadExactaPaginas = datos.length / 10;

  if (cantidadPaginaMod !== 0) {
    cantidadExactaPaginas = Math.floor(cantidadExactaPaginas) + 1;
  }

  for (let i = 0; i < cantidadExactaPaginas; i++) {
    cantidadPaginas.push([i]);
  }

  if (datos) {
    return cantidadPaginas.map((paginas, index) => (
      <button
        name={[paginas[0]]}
        key={index}
        style={
          hookEstadoPagina.EstadoPagina == paginas[0]
            ? { backgroundColor: "rgb(95, 149, 170)" }
            : { backgroundColor: "" }
        }
        onClick={() => {
          hookSetEstadoPagina({
            ...hookEstadoPagina,
            EstadoPagina: paginas[0],
          });
        }}
      >
        {paginas[0] + 1}
      </button>
    ));
  }
};

export default Paginacion;
