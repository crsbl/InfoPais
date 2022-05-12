import React, { useState } from "react";
import "./App.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const client = new ApolloClient({
  uri: "https://48p1r2roz4.sse.codesandbox.io",
});

const App = () => {
  const Buscador = () => {
    const [estadoInput, setEstadoInput] = useState({
      buscar: "",
    });
    const [estadoBotones, setEstadoBotones] = useState({
      SeleccionOrden: 0,
    });
    const cambiarOrden = (e) => {
      setEstadoBotones({
        SeleccionOrden: e.currentTarget.name == "Continente" ? 0 : 1,
      });
    };
    return (
      <div className="divContenedorBuscar flexBoxColumn">
        <input
          spellCheck={false}
          value={estadoInput.buscar}
          onChange={(e) => {
            setEstadoInput({ buscar: e.currentTarget.value });
          }}
        />

        <div className="divContenedorOrdenarPor flexBoxRow">
          <h3>Ordenar por</h3>
          <button name="Continente" onClick={cambiarOrden}>
            Continente
          </button>
          <button name="Lenguaje" onClick={cambiarOrden}>
            Lenguaje
          </button>
        </div>
      </div>
    );
  };
  return (
    <ApolloProvider client={client}>
      <div className="divContenedorApp flexBoxColumn">
        <header>
          <h1> Paises</h1>
        </header>
        <main className="flexBoxColumn">
          <div className="divContenedorArticulos flexBoxRowWrap"></div>
        </main>
        <footer></footer>
      </div>
    </ApolloProvider>
  );
};
export default App;
