import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { isBaseError, MicroserviceName } from "../services/apis/external-types";
import LambdaAPI from "../services/apis/LambdaAPI";

type Props = {};

const DashboardLayout = (props: Props) => {
  const toast = useToast();

  const [microservicesData, setMicroservicesData] = useState<
    MicroserviceName[]
  >([]);

  useEffect(() => {
    (async () => {
      const resp = await LambdaAPI.getMicroservicesName();
      if (isBaseError(resp)) {
        toast({
          title: `${resp.code} Error`,
          description: resp.message,
          variant: "solid",
          status: "error",
          position: "bottom-end",
        });
        return;
      }
      setMicroservicesData(resp.microservices);
    })();
  }, []);

  return (
    <Box>
      <Box
        position="fixed"
        display="flex"
        w="full"
        h="full"
        top={0}
        left={0}
        pointerEvents="none"
      >
        <Box w="sm" textAlign="center" bgColor="#161c26" pointerEvents="all">
          <Box mt="1" textColor="white">
            <Heading as="h2">Dashboard</Heading>
          </Box>
          <Box mt="5">
            {microservicesData.map((microservice, key) => (
              <Button
                variant="solid"
                colorScheme="blackAlpha"
                w="full"
                borderRadius="none"
                py="6"
                as={Link}
                to={`/dashboard/${microservice.id}`}
              >
                {microservice.name}
              </Button>
            ))}
          </Box>
        </Box>
        <Box
          bgColor="white"
          boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"
          px="2"
          py="2"
          w="full"
          h="fit-content"
          zIndex={100}
          pointerEvents="all"
        >
          <Box>
            <Heading as="h2" size="lg" ml="8">
              Sub Bab
            </Heading>
          </Box>
        </Box>
      </Box>
      <Container
        ml={{ base: "52", sm: "60", md: "72", lg: "96" }}
        mt="28"
        h="full"
        maxW="container.xl"
      >
        <Outlet />
      </Container>
    </Box>
  );
};

export default DashboardLayout;
