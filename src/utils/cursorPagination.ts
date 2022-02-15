import { Resolver } from "@urql/exchange-graphcache"
import {stringifyVariables} from "urql";

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
    const isItInTheCache = !!cache.resolve(entityKey, fieldKey);
    info.partial = !isItInTheCache;

    const results: string[] = [];
    for (let fieldInfo of fieldInfos) {
      const data = cache.resolve(entityKey, fieldInfo.fieldKey) as string[];
      results.push(...data);
    }

    return results;
  };
};