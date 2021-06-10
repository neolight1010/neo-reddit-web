import { Box } from "@chakra-ui/layout";
import React, { ReactElement } from "react";

export interface WrapperProps {
  variant?: "small" | "regular";
  children?: JSX.Element;
}

export function Wrapper({
  children,
  variant = "regular",
}: WrapperProps): ReactElement | null {
  return (
    <Box
      mt={8}
      mx="auto"
      maxW={variant === "regular" ? "800px" : "400px"}
      w="100%"
    >
      {children}
    </Box>
  );
}
