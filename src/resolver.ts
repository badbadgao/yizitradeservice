// This is the file where our generated types live
// (specified in our `codegen.yml` file)
import { QueryResolvers } from "./__generated__/resolvers-types";

export const resolvers: QueryResolvers = {
  products: async (_, __, { dataSources }) => {
    return dataSources.productAPI.getProducts();
  },
};
