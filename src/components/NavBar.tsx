import { Box, Link } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import NextLink from "next/link";

export interface NavBarProps {}

export function NavBar(_props: NavBarProps): ReactElement | null {
  return (
    <Flex bg="tomato" p="4">
      <Box ml="auto">
        <NextLink href="/login">
          <Link mr={5}>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>Register</Link>
        </NextLink>
      </Box>
    </Flex>
  );
}
