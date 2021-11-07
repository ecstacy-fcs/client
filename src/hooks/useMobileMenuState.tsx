import { useBoolean, useBreakpointValue } from "@chakra-ui/react";
import * as React from "react";

export const useMobileMenuState = () => {
  const [isOpen, actions] = useBoolean();
  const isMobile = useBreakpointValue({ base: true, lg: false });

  React.useEffect(() => {
    if (isMobile == false) {
      actions.off();
    }
  }, [isMobile, actions]);

  return { isOpen, ...actions };
};
