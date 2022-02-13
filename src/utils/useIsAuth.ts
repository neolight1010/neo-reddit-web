import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";

/**
 * When used, it replaces the current page with /login if the user is not logged in.
 */
export const useIsAuth = () => {
  const [{ fetching, data }] = useMeQuery();
  const router = useRouter();

  useEffect(() => {
    if (!data?.me.user && !fetching) {
      router.replace("/login?next=" + router.pathname);
    }
  }, [fetching, data, router]);
};
