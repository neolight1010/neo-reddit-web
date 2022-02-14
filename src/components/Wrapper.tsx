import { Box } from "@chakra-ui/layout";
import React, { ReactElement } from "react";

export type WrapperVariant = "small" | "regular";

export interface WrapperProps {
  variant?: WrapperVariant
  children?: React.ReactNode
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
