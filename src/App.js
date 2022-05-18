import React, { useState } from "react";
import "./estilos/App.css";
import "./estilos/AppResponsive.css";
import { useQuery } from "@apollo/react-hooks";
import graphqlQuery from "./graphql";
import Paginacion from "./componentes/paginacion";

const App = () => {
  const [estadoInput, setEstadoInput] = useState({
    buscar: "",
  });
  const [estadoBotones, setEstadoBotones] = useState({
    SeleccionOrden: 0,
    EstadoPagina: 0,
    cantidadCard: 10,
  });
  const { loading, error, data } = useQuery(graphqlQuery().filtrarPorNombre);

  const cambiarOrden = (e) => {
    setEstadoBotones({
      ...estadoBotones,
      SeleccionOrden: e.currentTarget.name === "Continente" ? 0 : 1,
    });
  };

  const filtrarLista = (array, input) => {
    return array?.filter((str) => {
      return str.name.toLowerCase().indexOf(input) !== -1;
    });
  };
  const ordenarPaisesPor = (dataApollo) => {
    let nombre1 = null;
    let nombre2 = null;
    return dataApollo?.countries?.sort((a, b) => {
      switch (estadoBotones.SeleccionOrden) {
        case 0:
          nombre1 = a.continent.name.toLowerCase();
          nombre2 = b.continent.name.toLowerCase();
          break;
        case 1:
          nombre1 = a.languages[0]?.name.toLowerCase();
          nombre2 = b.languages[0]?.name.toLowerCase();

          break;

        default:
          break;
      }

      if (nombre1 < nombre2) {
        return -1;
      }
      if (nombre1 > nombre2) {
        return 1;
      }
      return 0;
    });
  };
  let configurarArrayDatos = (listaPaises) =>
    filtrarLista(ordenarPaisesPor(listaPaises), estadoInput.buscar);


  const ResultadoBusqueda = () => {
    if (loading) return <p className="parratoCargando">Loading ...</p>;
    if (error) return <p className="parratoError">error</p>;

    if (data) {
      return configurarArrayDatos(data)
        ?.slice(
          estadoBotones.EstadoPagina * 10,
          estadoBotones.EstadoPagina * 10 + 10
        )
        .map((listaBusqueda, index) => (
          <article key={index}>
            <div className="divContenedorDatosArticuloTitulo ">
              <h1>Pais {listaBusqueda.emoji}</h1>
              <h2>{listaBusqueda.name}</h2>
            </div>
            <div className="divContenedorDatosArticulo ">
              <h2>Capital:</h2>
              <h2>{listaBusqueda.capital}</h2>
            </div>
            <div className="divContenedorDatosArticulo ">
              <h2>lenguas:</h2>
              <h2>{listaBusqueda.languages[0]?.name}</h2>
            </div>

            <div className="divContenedorDatosArticulo ">
              <h2>Continente:</h2>
              <h2>{listaBusqueda.continent.name}</h2>
            </div>
          </article>
        ));
    } else {
      return <div>no data</div>;
    }
  };

  return (
    <div className="divContenedorApp">
      <header>
        <h1> Paises</h1>
      </header>
      <main>
        <div className="divContenedorBuscar">
          <input
            spellCheck={false}
            value={estadoInput.buscar}
            onChange={(e) => {
              setEstadoInput({ buscar: e.currentTarget.value });
              setEstadoBotones({ ...estadoBotones, EstadoPagina: 0 });
            }}
          />

          <div className="divContenedorOrdenarPor">
            <h3>Ordenar por</h3>
            <button
              style={
                estadoBotones.SeleccionOrden === 0
                  ? { backgroundColor: "antiquewhite" }
                  : { backgroundColor: "" }
              }
              name="Continente"
              onClick={cambiarOrden}
            >
              Continente
            </button>
            <button
              style={
                estadoBotones.SeleccionOrden === 1
                  ? { backgroundColor: "antiquewhite" }
                  : { backgroundColor: "" }
              }
              name="Lenguaje"
              onClick={cambiarOrden}
            >
              Lenguaje
            </button>
          </div>
        </div>
        <div className="divContenedorArticulos">
          <ResultadoBusqueda />
        </div>
        <div className="divContenedorPaginacion ">
          <Paginacion
            query={[loading, error]}
            hookEstadoPagina={estadoBotones}
            hookSetEstadoPagina={setEstadoBotones}
            datos={configurarArrayDatos(data)}
          />
        </div>
      </main>
      <footer></footer>
    </div>
  );
};
export default App;
