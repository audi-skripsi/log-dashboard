import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AnalyticsCard from "../components/AnalyticsCard";
import {
  isBaseError,
  MicroserviceDataCount,
} from "../services/apis/external-types";
import LambdaAPI from "../services/apis/LambdaAPI";

type Props = {};

const Microservice = (props: Props) => {
  const { microserviceId } = useParams();
  const [microserviceDataCount, setMicroserviceDataCount] =
    useState<MicroserviceDataCount>();

  useEffect(() => {
    (async () => {
      if (!microserviceId) return;
      const resp = await LambdaAPI.getMicroservicesAnalytics(microserviceId);
      if (isBaseError(resp)) {
        return;
      }
      setMicroserviceDataCount(resp.eventDataCount);
    })();
  }, [microserviceId]);

  return (
    <Box>
      <Box mt="5">
        <Heading size="lg">Statistika</Heading>
        <SimpleGrid columns={3} gap={4} mt="4">
          <AnalyticsCard
            title="Total"
            value={microserviceDataCount?.totalEventData}
          />
          <AnalyticsCard
            title="Error"
            value={microserviceDataCount?.totalErrorEventData}
          />
          <AnalyticsCard
            title="Warn"
            value={microserviceDataCount?.totalWarnEventData}
          />
          <AnalyticsCard
            title="Info"
            value={microserviceDataCount?.totalInfoEventData}
          />
          <AnalyticsCard
            title="Unknown"
            value={microserviceDataCount?.totalUnknownEventData}
          />
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Microservice;
