import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
  title: string;
  value?: number;
}

const AnalyticsCard = ({ title, value }: Props) => {
  return (
    <Box
      boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
      p="8"
      borderRadius="md"
      bgColor="#ffffff"
      w="sm"
    >
      <Heading size="lg">{title}</Heading>
      <Text>{value ? value : 0}</Text>
    </Box>
  );
};

export default AnalyticsCard;
