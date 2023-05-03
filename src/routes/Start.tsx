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
import ListSkeleton from "../components/ListSkeleton";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useState } from "react";
export default function Start() {
  const { isLoading, data } = useQuery<IListMyChoice>(
    ["lists-my-choice-start"],
    getMyListsStart
  );
  const toast = useToast();
  const [text, setText] = useState("");
  let copyText = "";
  const handleCopyClipBoard = async () => {
    copyText =
      '면접 상황을 가정했을 때 "' +
      `${data?.description}` +
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
          <Link to={"start"}>
            <Button colorScheme="blue" fontSize={23}>
              start
            </Button>
          </Link>
        </HStack>
        <HStack justifyContent={"space-between"} m={5}>
          {isLoading ? (
            <Text>loding...</Text>
          ) : (
            <Text rounded="lg" width="60%" height={5} mb={1}>
              Q: {data?.description}
            </Text>
          )}
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
