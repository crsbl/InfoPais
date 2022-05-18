import { gql } from "apollo-boost";

const graphqlQuery = () => ({
  filtrarPorNombre: gql`
    query {
      countries {
        name,
        capital,
        emoji,
        emojiU,
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
