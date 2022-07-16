import { ClientOptions, Exchange } from "@urql/core";
import { pipe, tap } from "wonka";
import { dedupExchange, fetchExchange } from "urql";
import Router from "next/router";
import { cacheExchange } from "@urql/exchange-graphcache";
import { cursorPagination } from "./cursorPagination";

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
    exchanges: [
      dedupExchange,
      cacheExchange({
        keys: {
          PaginatedPostsWithVoteInfo: () => null,
          FieldError: () => null,
          UserResponse: () => null,
        },
        resolvers: {
          Query: {
            posts: cursorPagination(),
          },
        },
      }),
      errorExchange,
      fetchExchange,
    ],
  };
}
