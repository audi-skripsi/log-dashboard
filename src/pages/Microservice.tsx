import {
  Box,
  Button,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AnalyticsCard from "../components/AnalyticsCard";
import {
  EventData,
  isBaseError,
  MicroserviceDataCount,
} from "../services/apis/external-types";
import LambdaAPI from "../services/apis/LambdaAPI";
import { AiOutlineSearch } from "react-icons/ai";
import EventCard from "../components/EventCard";

type Props = {};

const Microservice = (props: Props) => {
  const { microserviceId } = useParams();
  const [microserviceDataCount, setMicroserviceDataCount] =
    useState<MicroserviceDataCount>();

  const [searchMessage, setSearchMessage] = useState("");
  const [eventLevel, setEventLevel] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [eventData, setEventData] = useState<EventData[]>([]);
  const [totalEvents, setTotalEvents] = useState(0);

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

  const handleMessage = (e: any) => {
    setSearchMessage(e.target.value);
  };

  const handleEventLevel = (e: any) => {
    setEventLevel(e.target.value);
  };

  const handleStartTime = (e: any) => {
    setStartTime(e.target.value);
  };

  const handleEndTime = (e: any) => {
    setEndTime(e.target.value);
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (!microserviceId) {
      return;
    }
    const parsedStartTime = Date.parse(startTime) / 1000;
    const parsedEndTime = Date.parse(endTime) / 1000;

    (async () => {
      const resp = await LambdaAPI.getMicroserviceEventData(
        microserviceId,
        searchMessage,
        eventLevel,
        parsedStartTime,
        parsedEndTime
      );
      if (isBaseError(resp)) {
        console.error();
        return;
      }
      setEventData(resp.events);
      setTotalEvents(resp.totalEventData);
    })();
  };

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
      <Box>
        <Heading size="lg" mt="12">
          Pencarian Event Data
        </Heading>
        <Box mt="2" display="flex" gap={4}>
          <Select
            placeholder="Level"
            w="96"
            value={eventLevel}
            onChange={handleEventLevel}
          >
            <option value="info">Info</option>
            <option value="warn">Warn</option>
            <option value="error">Error</option>
            <option value="unknown">Unknown</option>
          </Select>
          <InputGroup w="2xl">
            <InputLeftElement
              pointerEvents="none"
              children={<AiOutlineSearch />}
            />
            <Input
              id="message"
              value={searchMessage}
              type="text"
              onChange={handleMessage}
            />
          </InputGroup>
        </Box>
        <Box mt="2" display="flex" gap={4}>
          <Input
            value={startTime}
            onChange={handleStartTime}
            type="datetime-local"
            w="96"
          />
          <Input
            value={endTime}
            onChange={handleEndTime}
            type="datetime-local"
            w="96"
          />
          <Button onClick={handleSearch}>Search</Button>
        </Box>
        <Box height="64" overflowY="scroll">
          {eventData &&
            eventData.map((val, i) => (
              <EventCard
                key={i}
                level={val.level}
                message={val.message}
                serviceName={val.serviceName}
                timetamp={val.timestamp}
              />
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Microservice;
