import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
  level: string;
  message: string;
  serviceName: string;
  timetamp: number;
}

const EventCard = ({ level, message, serviceName, timetamp }: Props) => {
  return (
    <Box borderBottom="1px" borderColor="gray">
      <Heading size="md">{level}</Heading>
      <Text color="gray.700">{message}</Text>
      <Text color="gray.700" fontWeight="bold">
        {serviceName}
      </Text>
      <Text>{new Date(timetamp * 1000).toString()}</Text>
    </Box>
  );
};

export default EventCard;
