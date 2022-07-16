import { Resolver } from "@urql/exchange-graphcache";
import { stringifyVariables } from "urql";

export const cursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;

    const allFields = cache.inspectFields(entityKey);
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const isItInTheCache = !!cache.resolve(
      cache.resolve(entityKey, fieldKey) as string,
      "posts"
    );

    info.partial = !isItInTheCache;

    let hasMore = true;

    const results: string[] = [];
    for (let fieldInfo of fieldInfos) {
      const key = cache.resolve(entityKey, fieldInfo.fieldKey) as string;
      const data = cache.resolve(key, "postsWithUserVote") as string[];

      const _hasMore = !!cache.resolve(key, "hasMore");
      if (!_hasMore) {
        hasMore = _hasMore;
      }

      results.push(...data);
    }

    return {
      __typename: "PaginatedPostsWithVoteInfo",
      hasMore,
      posts: results,
    };
  };
};
