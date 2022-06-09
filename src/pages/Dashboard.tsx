import { Box, Text } from "@chakra-ui/react";
import React from "react";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <Box>
      <Text>
        Pilih salah satu Microservice di sidebar di samping untuk melihat Event
        Data yang dimiliki dari Microservice tersebut. Jika anda tidak melihat
        Microservice apapun, maka kemungkinan besar bahwa anda basis data kosong
        karena belum pernah ada pemrosesan Big Data
      </Text>
    </Box>
  );
};

export default Dashboard;
