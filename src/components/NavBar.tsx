import { Box, Heading, HStack, Link } from "@chakra-ui/layout";
import { Button, Flex, Spinner } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { useRouter } from "next/dist/client/router";
import isServer from "../utils/isServer";

export interface NavBarProps {}

export function NavBar(_props: NavBarProps): ReactElement | null {
  const [meData, _execMeQuery] = useMeQuery({ pause: isServer() });
  const [, execLogout] = useLogoutMutation();
  const router = useRouter();

  let body = null;
  if (meData.fetching) {
    body = <Spinner />;
  } else {
    if (meData.data?.me.user) {
      body = (
        <HStack spacing={5}>
          <NextLink href="/create-post">
            <Link ml="auto">Create Post</Link>
          </NextLink>

          <Box>{meData.data.me.user?.username}</Box>
          <Button
            variant="link"
            color="black"
            onClick={async () => {
              const logoutData = await execLogout();

              if (logoutData.data?.logout === true) {
                router.reload();
              } else {
                console.log("Logout error!");
              }
            }}
          >
            Logout
          </Button>
        </HStack>
      );
    } else {
      body = (
        <>
          <NextLink href="/login">
            <Link mr={5}>Login</Link>
          </NextLink>
          <NextLink href="/register">
            <Link>Register</Link>
          </NextLink>
        </>
      );
    }
  }

  return (
    <Flex bg="salmon" p="4" align="center">
      <Box>
        <Heading mr={6} size="md">
          <NextLink href="/">
            NeoReddit
          </NextLink>
        </Heading>
      </Box>
      <Box ml="auto">{body}</Box>
    </Flex>
  );
}
