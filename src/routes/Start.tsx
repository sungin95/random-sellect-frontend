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
import { getMyListsStart, putMyListImportant } from "../api";
import { IListMyChoice } from "../types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ProtectedPage from "../components/ProtectedPage";
import { Helmet } from "react-helmet";

export default function Start() {
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
  // 알맞는 타입을 못찾겠다. e: any
  const handleImportent = (e: any) => {
    putMyListImportant([`${storedPK}`, e.target.value]);
    toast({
      title: "채점 되었습니다!",
      status: "success",
    });
    handleRestart();
  };

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
    <ProtectedPage>
      <Helmet>
        <title>면접 시작</title>
      </Helmet>
      <VStack>
        <Box w={"50%"}>
          <HStack justifyContent={"center"} m={5}>
            <Button colorScheme="blue" fontSize={23} onClick={handleRestart}>
              다시 시작
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
            <HStack justifyContent={"space-between"} mt={5}>
              <HStack>
                <Text>자체 채점 결과:</Text>
                <Button colorScheme="red" onClick={handleImportent} value={1}>
                  부족
                </Button>
                <Button colorScheme="blue" onClick={handleImportent} value={0}>
                  보통
                </Button>
                <Button
                  colorScheme="green"
                  onClick={handleImportent}
                  value={-1}
                >
                  잘함
                </Button>
              </HStack>
              <Box>
                <Button onClick={handleCopyClipBoard} colorScheme="blue">
                  ChatGPT로 이동
                </Button>
                <Text>
                  이동후 붙여넣기만<br></br> 하시면 됩니다.
                </Text>
              </Box>
            </HStack>
          </Box>
        </Box>
      </VStack>
    </ProtectedPage>
  );
}
