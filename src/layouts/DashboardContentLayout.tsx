import { Box, Heading } from "@chakra-ui/react";
import React from "react";

interface Props {
  title?: string;
  children: any;
}

const DashboardContentLayout = (props: Props) => {
  return (
    <Box>
      <Heading>{props.title}</Heading>
      {props.children}
    </Box>
  );
};

export default DashboardContentLayout;
