import { useEffect, useReducer, useState } from "react";
import "./App.css";
import { Button, Card, Flex, Text } from "@mantine/core";
import Modal from "./Modal";

export interface Data {
  attempted_landings: string;
  details: string;
  full_name: string;
  id: string;
  landing_type: string;
  location: {
    latitude: number;
    longitude: number;
    name: string;
    region: string;
  };
  status: string;
  successful_landings: number;
  wikipedia: string;
}

function App() {
  const initialState = {
    isOpen: false,
    modalContent: undefined,
  };

  function modalReducer(
    state: { modalContent: Data },

    action: { type: unknown; payload?: unknown }
  ) {
    switch (action.type) {
      case "OPEN_MODAL":
        return {
          ...state,
          isOpen: true,
          modalContent: action.payload,
        };
      case "CLOSE_MODAL":
        return {
          ...state,
          isOpen: false,
          modalContent: undefined,
        };
      default:
        return state;
    }
  }
  // @ts-expect-error @ts-expect-error
  const [state, dispatch] = useReducer(modalReducer, initialState);

  const openModal = (content: Data) => {
    dispatch({ type: "OPEN_MODAL", payload: content });
  };
  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };
  const [data, setData] = useState<Data[]>([]);
  const fetchVigatables = async () => {
    try {
      const response = await fetch(
        "https://api.spacexdata.com/v3/landpads?launch_year=2020"
      );
      const dataResponse = await response.json();

      setData(dataResponse);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    fetchVigatables();
  }, []);

  return (
    <Flex
      gap="sm"
      justify="flex-start"
      align="flex-start"
      direction="row"
      wrap="wrap"
    >
      {data.map((item) => (
        <Card shadow="sm" padding="lg" radius="md" withBorder w={300}>
          <Flex justify="center" align="center">
            <img
              src="https://www.polytechnique-insights.com/wp-content/uploads/2022/11/space-1024x640.jpeg"
              width="100px"
              height="100px"
              style={{ borderRadius: "50%" }}
              alt=""
            />
          </Flex>
          <Text mt={40}>{item.full_name}</Text>
          <Text fw={400} mt={10} c="gray">
            {item.landing_type}
          </Text>

          <Button
            mt={40}
            onClick={() => {
              openModal(item);
            }}
          >
            See More
          </Button>
        </Card>
      ))}
      <Modal contact={state.modalContent} onClose={() => closeModal()} />
    </Flex>
  );
}

export default App;
