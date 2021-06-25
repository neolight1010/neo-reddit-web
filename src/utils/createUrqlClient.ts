import { ClientOptions } from "@urql/core";

export function createUrqlClient(_ssrExchange: any): ClientOptions {
  return {
    url: "http://localhost:4000/graphql",
    fetchOptions: { credentials: "include" },
  };
}
