import { ClientOptions, Exchange } from "@urql/core";
import { pipe, tap } from "wonka";
import { dedupExchange, fetchExchange } from "urql";
import Router from "next/router";
import { cacheExchange } from "@urql/exchange-graphcache";
import { cursorPagination } from "./cursorPagination";
import { DeletePostMutationVariables } from "../generated/graphql";

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
    url: process.env.NEXT_PUBLIC_API_URL || "",
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
        updates: {
          Mutation: {
            deletePost: (
              _result,
              args: DeletePostMutationVariables,
              cache,
              _info
            ) => {
              cache.invalidate({ __typename: "Post", id: args.id });
            },
          },
        },
      }),
      errorExchange,
      fetchExchange,
    ],
  };
}
