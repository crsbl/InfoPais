import { gql } from "apollo-boost";

const graphqlQuery = () => ({
  filtrarPorNombre: gql`
    query {
      countries {
        name,
        capital,
        continent {
          name
        },
        languages {
          name
        }
      }
    }
  `,
});

export default graphqlQuery;
