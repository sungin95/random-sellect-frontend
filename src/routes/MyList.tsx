import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { getMyLists, getTotalMyListsCount } from "../api";
import { IListMyChoice } from "../types";
import ListSkeleton from "../components/ListSkeleton";
import { useQuery } from "@tanstack/react-query";
import ListMyChoice from "../components/ListMyChoice";
import { Link, useParams } from "react-router-dom";
import ProtectedPage from "../components/ProtectedPage";
import { Helmet } from "react-helmet";
import Pagination from "../components/Pagination";

export default function MyList() {
  const { page } = useParams();
  const { isLoading, data } = useQuery<IListMyChoice[]>(
    ["lists-my-choice", page],
    getMyLists
  );
  const { data: total_mylists_count } = useQuery<number[]>(
    ["lists-my-choice-total-count"],
    getTotalMyListsCount
  );
  const countSkeleton = [];
  for (let i = 1; i <= 20; i++) {
    countSkeleton.push(i); // 리스트에 숫자 추가
  }
  return (
    <ProtectedPage>
      <Helmet>
        <title>면접 질문</title>
      </Helmet>
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
            <Box>
              <Link to={"/my-list/start"}>
                <Button colorScheme="blue" fontSize={23}>
                  면접 시작
                </Button>
              </Link>
            </Box>
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
        {total_mylists_count &&
          total_mylists_count.map((total) => (
            <Pagination key={total} total={total} url={"/my-list/"} />
          ))}
      </VStack>
    </ProtectedPage>
  );
}
