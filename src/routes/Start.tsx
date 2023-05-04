import {
  Box,
  Button,
  Divider,
  HStack,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { getMyListsStart } from "../api";
import { IListMyChoice } from "../types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Start() {
  const navigate = useNavigate();
  let storedDescription: string | null = null;
  let storedPK: string | null = null;
  const { data } = useQuery<IListMyChoice>(
    ["lists-my-choice-start"],
    getMyListsStart
  );
  if (localStorage.getItem("description") === null) {
    if (data !== undefined) {
      localStorage.setItem("description", `${data.description}`);
      localStorage.setItem("pk", `${data.pk}`);
    }
  }
  const handleRestart = () => {
    if (data?.description) {
      localStorage.removeItem("description");
      localStorage.removeItem("pk");
      window.location.reload();
    }
  };
  storedDescription = localStorage.getItem("description");
  storedPK = localStorage.getItem("pk");

  const toast = useToast();
  const [text, setText] = useState("");
  let copyText = "";
  const handleCopyClipBoard = async () => {
    copyText =
      '면접 상황을 가정했을 때 "' +
      `${storedDescription}` +
      '"라는 질문에 이렇게 답했어 "' +
      text +
      '" 피드백 해줘';
    await navigator.clipboard.writeText(copyText);
    toast({
      title: "복사되었습니다!",
      status: "success",
    });
    window.open("https://chat.openai.com/");
  };
  return (
    <VStack>
      <Box w={"50%"}>
        <HStack justifyContent={"center"} m={5}>
          <Button colorScheme="blue" fontSize={23} onClick={handleRestart}>
            start
          </Button>
        </HStack>
        <HStack justifyContent={"space-between"} m={5}>
          <Text rounded="lg" width="60%" height={5} mb={1}>
            Q: {storedDescription}
          </Text>
        </HStack>
        <Divider />
        <Box>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></Textarea>
          <HStack justifyContent={"flex-end"}>
            <Button mt={5} onClick={handleCopyClipBoard} colorScheme="blue">
              복사
            </Button>
          </HStack>
        </Box>
      </Box>
    </VStack>
  );
}
