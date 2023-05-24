import {
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useCookies } from "react-cookie";

interface FirstModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FirstModal({ isOpen, onClose }: FirstModalProps) {
  const handleInstructions = () => {
    window.open(
      "https://github.com/sungin95/random-question-document/blob/master/%EB%9E%9C%EB%8D%A4%EC%A7%88%EB%AC%B8%20%EB%AC%B8%EC%84%9C/%EC%82%AC%EC%9A%A9%EB%B2%95.md"
    );
    handleFirstModal();
  };
  const [cookies, setCookie] = useCookies(["isFirst"]);
  const handleFirstModal = () => {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 2);
    setCookie("isFirst", "true", {
      path: "/",
      expires: expires,
    });
    onClose();
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            <Box>사용법을 보시겠습니까?</Box>
            <br />
            <HStack justifyContent={"space-between"} w={"100%"}>
              <Button onClick={handleInstructions} colorScheme={"blue"}>
                네~
              </Button>
              <Button onClick={handleFirstModal} colorScheme={"red"}>
                알고 있어요
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
