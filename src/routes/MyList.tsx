import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { getMyLists } from "../api";
import { IListMyChoice } from "../types";
import ListSkeleton from "../components/ListSkeleton";
import { useQuery } from "@tanstack/react-query";
import ListMyChoice from "../components/ListMyChoice";
import { Link, useParams } from "react-router-dom";

export default function MyList() {
  const { isLoading, data } = useQuery<IListMyChoice[]>(
    ["lists-my-choice"],
    getMyLists
  );
  const countSkeleton = [];
  for (let i = 1; i <= 20; i++) {
    countSkeleton.push(i); // 리스트에 숫자 추가
  }
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
      ) : null}
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
            내용
          </Text>
          <HStack width="15%" justifyContent={"space-between"}>
            <Text>중요도</Text>
          </HStack>
        </HStack>
        <Divider />
        {data?.map((list) => (
          <ListMyChoice
            key={list.pk}
            pk={list.pk}
            description={list.description}
            importance={list.importance}
          />
        ))}
      </Box>
    </VStack>
  );
}
