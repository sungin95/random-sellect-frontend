import {
  Box,
  Button,
  Divider,
  HStack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { getMyListsStart } from "../api";
import { IListMyChoice } from "../types";
import ListSkeleton from "../components/ListSkeleton";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
export default function Start() {
  const { isLoading, data } = useQuery<IListMyChoice>(
    ["lists-my-choice-start"],
    getMyListsStart
  );
  const countSkeleton = [];
  for (let i = 1; i <= 20; i++) {
    countSkeleton.push(i); // 리스트에 숫자 추가
  }
  //   const textRef = useRef<HTMLParagraphElement>(null);
  //   const handleCopy = () => {
  //     const textToCopy = textRef.current?.innerText;
  //     if (textToCopy) {
  //       navigator.clipboard.writeText(textToCopy);
  //     }
  //   };
  return (
    <VStack>
      {isLoading ? (
        <>
          <Box w={"50%"}>
            {countSkeleton.map((count) => (
              <ListSkeleton key={count} />
            ))}
          </Box>
        </>
      ) : (
        <Box w={"50%"}>
          <HStack justifyContent={"center"} m={5}>
            <Link to={"start"}>
              <Button colorScheme="blue" fontSize={23}>
                start
              </Button>
            </Link>
          </HStack>
          <HStack justifyContent={"space-between"} m={5}>
            <Text rounded="lg" width="60%" height={5} mb={1}>
              Q: {data?.description}
            </Text>
          </HStack>
          <Divider />
          {/* <Box>
            <Textarea cols={500} ref={textRef}></Textarea>
            <HStack justifyContent={"flex-end"}>
              <Button mt={5} onClick={handleCopy}>
                복사
              </Button>
            </HStack>
          </Box> */}
        </Box>
      )}
    </VStack>
  );
}
