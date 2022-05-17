import ApolloClient from "apollo-boost";

const apollo = () => ({
  apolloClient: new ApolloClient({
    uri: "https://countries.trevorblades.com/",
  }),
});

export default apollo;
