import { Box, Text, Heading, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

type Props = {};

const Home = (props: Props) => {
  return (
    <Box
      backgroundColor="blue.900"
      w="100vw"
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      pb="12rem"
    >
      <Box color="white" textAlign="center">
        <Heading size="3xl">Dashboard - Home</Heading>
        <Text fontSize="2xl">
          Big Data Processing menggunakan Lambda Architecture dan <br />{" "}
          Event-Driven Microservices untuk Error-Event Data
        </Text>
        <Text fontSize="xl" mt="2rem">
          Putu Audi Pasuatmadi (1908561095)
        </Text>
        <Button colorScheme="facebook" mt="2rem" as={Link} to="/dashboard">
          Start
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
