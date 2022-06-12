import React, { useContext, createContext, useState } from "react";

type Props = { children: any };

export const MicroserviceDataContext = createContext<{
  microserviceId: string;
  setMicroserviceId: React.Dispatch<React.SetStateAction<string>>;
  microserviceName: string;
  setMicroserviceName: React.Dispatch<React.SetStateAction<string>>;
} | null>(null);

const MicroserviceDataProvider = (props: Props) => {
  const [microserviceId, setMicroserviceId] = useState("");
  const [microserviceName, setMicroserviceName] = useState("");

  return (
    <MicroserviceDataContext.Provider
      value={{
        microserviceId: microserviceId,
        setMicroserviceId: setMicroserviceId,
        microserviceName: microserviceName,
        setMicroserviceName: setMicroserviceName,
      }}
    >
      {props.children}
    </MicroserviceDataContext.Provider>
  );
};

export default MicroserviceDataProvider;
