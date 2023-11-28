import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import { resolvers } from "./resolver";
import { ProductDataSource } from "./datasources";

// Note: this uses a path relative to the project's
// root directory, which is the current working directory
// if the server is executed using `npm run`.
const typeDefs = readFileSync("./schema.graphql", { encoding: "utf-8" });

interface MyContext {
  dataSources: {
    productAPI: ProductDataSource;
  };
}

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
});

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves Products from the "Products" array above.

const { url } = await startStandaloneServer(server, {
  context: async () => {
    return {
      // We are using a static data set for this example, but normally
      // this would be where you'd add your data source connections
      // or your REST API classes.
      dataSources: {
        productAPI: new ProductDataSource(),
      },
    };
  },
});
console.log(`🚀  Server ready at: ${url}`);
