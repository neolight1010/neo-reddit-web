import { ClientOptions, Exchange } from "@urql/core";
import { pipe, tap } from "wonka";
import { dedupExchange, fetchExchange, cacheExchange } from "urql";
import Router from "next/router";

const errorExchange: Exchange =
  ({ forward }) =>
  (ops$) => {
    return pipe(
      forward(ops$),
      tap(({ error }) => {
        if (error?.message.toLowerCase().includes("not authenticated")) {
          Router.replace("/login");
        }
      })
    );
  };

export function createUrqlClient(_ssrExchange: any): ClientOptions {
  return {
    url: "http://localhost:4000/graphql",
    fetchOptions: { credentials: "include" },
    exchanges: [dedupExchange, cacheExchange, errorExchange, fetchExchange],
  };
}
