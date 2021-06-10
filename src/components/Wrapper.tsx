import { Box } from "@chakra-ui/layout";
import React, { ReactElement } from "react";

export interface WrapperProps {
  children?: JSX.Element;
}

export function Wrapper(props: WrapperProps): ReactElement | null {
  return (
    <Box mt={8} mx="auto" maxW="800px" w="100%">
      {props.children}
    </Box>
  );
}
