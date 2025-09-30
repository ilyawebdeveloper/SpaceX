import { createPortal } from "react-dom";
import type { Data } from "./App";
import { Card, Flex, Text } from "@mantine/core";

const Modal = ({
  contact,
  onClose,
}: {
  contact?: Data;
  onClose: () => void;
}) => {
  console.log(contact, "contact");

  return (
    <>
      {contact !== undefined &&
        createPortal(
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            w={700}
            style={{ position: "fixed", top: "10%", left: "20%" }}
          >
            <Flex justify="end" align="center" onClick={onClose}>
              X
            </Flex>
            <Flex justify="center" align="center">
              <img
                src="https://www.polytechnique-insights.com/wp-content/uploads/2022/11/space-1024x640.jpeg"
                width="300px"
                height="300px"
                style={{ borderRadius: "50%" }}
                alt=""
              />
            </Flex>

            <Text fw={600} mt={10}>
              Mission name:
            </Text>
            <Text fw={400} mt={10} c="gray">
              {contact?.full_name}
            </Text>

            <Text fw={600} mt={10}>
              Rocket name:
            </Text>
            <Text fw={400} mt={10} c="gray">
              {contact?.landing_type}
            </Text>
            <Text fw={600} mt={10}>
              Rocket name:
            </Text>
            <Text fw={400} mt={10} c="gray">
              {contact?.details}
            </Text>
          </Card>,
          document.body
        )}
    </>
  );
};

export default Modal;
