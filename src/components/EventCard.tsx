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
    <Box>
      <Heading size="lg">{level}</Heading>
      <Text>{message}</Text>
      <Text>{serviceName}</Text>
    </Box>
  );
};

export default EventCard;
