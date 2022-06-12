import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
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
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { MicroserviceDataContext } from "../services/providers/MicroserviceDataProvider";

type Props = {};

const barChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "top" as const,
    },
    title: {
      display: false,
      text: "Jenis Event Data",
    },
  },
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Microservice = (props: Props) => {
  const { microserviceId } = useParams();
  const [microserviceDataCount, setMicroserviceDataCount] =
    useState<MicroserviceDataCount>();

  const [searchMessage, setSearchMessage] = useState("");
  const [eventLevel, setEventLevel] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [eventData, setEventData] = useState<EventData[][]>([]);
  const [totalEvents, setTotalEvents] = useState(0);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const microserviceData = useContext(MicroserviceDataContext);

  const handleNextPage = (e: any) => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = (e: any) => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    (async () => {
      if (!microserviceId) return;
      const resp = await LambdaAPI.getMicroservicesAnalytics(microserviceId);
      if (isBaseError(resp)) {
        return;
      }
      setMicroserviceDataCount(resp.eventDataCount);
    })();
    setTotalEvents(0);
    setCurrentPage(0);
    setEventData([]);
    if (microserviceData != null) {
      const name = microserviceId?.split("_").join(" ");
      microserviceData.setMicroserviceId(`${microserviceId}`);
      microserviceData.setMicroserviceName(`${name}`);
    }
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
      const pagedData: EventData[][] = [[]];
      let iterator = 0;
      let eventPerPage = 20;
      let currentPage = 0;
      if (resp.events != null) {
        resp.events.map((eventData) => {
          if (iterator == eventPerPage) {
            currentPage++;
            pagedData[currentPage] = [];
            iterator = 0;
          }
          pagedData[currentPage].push(eventData);
          iterator++;
        });
      }

      setEventData(pagedData);
      setTotalPages(currentPage);
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
        <Heading size="lg" mt="8">
          Grafik
        </Heading>
        <Heading size="md" fontWeight="normal">
          Grafik jenis Event Data
        </Heading>
        <Bar
          options={barChartOptions}
          data={{
            labels: ["error", "warn", "info", "unknown"],
            datasets: [
              {
                label: "nama microservice",
                data: [
                  microserviceDataCount?.totalErrorEventData,
                  microserviceDataCount?.totalWarnEventData,
                  microserviceDataCount?.totalInfoEventData,
                  microserviceDataCount?.totalUnknownEventData,
                ],
                backgroundColor: "rgba(53, 162, 235, 0.5)",
              },
            ],
          }}
        />
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
        <Box mt="4">
          {totalEvents !== 0 && <Text>{totalEvents} Event Data ditemukan</Text>}
        </Box>
        <Box
          mt="4"
          height="2xl"
          overflowY="scroll"
          display="flex"
          flexDir="column"
          gap={2}
        >
          {eventData[currentPage] &&
            eventData[currentPage].map((val, i) => (
              <EventCard
                key={i}
                level={val.level}
                message={val.message}
                serviceName={val.serviceName}
                timetamp={val.timestamp}
              />
            ))}
        </Box>
        <Box mt="4" mb="12">
          <ButtonGroup size="md" isAttached variant="solid">
            <Button onClick={handlePrevPage}>{"<"}</Button>
            <Button>{currentPage + 1}</Button>
            <Button onClick={handleNextPage}>{">"}</Button>
          </ButtonGroup>
        </Box>
      </Box>
    </Box>
  );
};

export default Microservice;
