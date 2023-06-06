import { Box, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { getLists, getTotalListsCount } from "../api";
import List from "../components/List";
import { IList } from "../types";
import ListSkeleton from "../components/ListSkeleton";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import PageNation from "../components/PageNation";

export default function Home() {
  const { isLoading, data } = useQuery<IList[]>(["lists"], getLists);
  const { data: total_lists_count } = useQuery<number[]>(
    ["total_lists_count"],
    getTotalListsCount
  );

  const countSkeleton = [];
  for (let i = 1; i <= 20; i++) {
    countSkeleton.push(i); // 리스트에 숫자 추가
  }
  return (
    <VStack>
      <Helmet>
        <title>ChatGPT를 활용 개발자가 되기</title>
      </Helmet>
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
        <HStack justifyContent={"space-between"} m={5}>
          <Text rounded="lg" width="60%" height={5} mb={1}>
            내용
          </Text>
          <HStack width="25%" justifyContent={"space-between"}>
            <Text rounded="lg" height={5}>
              만든이
            </Text>
            <Text>카운트</Text>
            <Box> </Box>
            <Box> </Box>
          </HStack>
        </HStack>
        <Divider />
        {data?.map((list) => (
          <List
            key={list.pk}
            pk={list.pk}
            description={list.description}
            authon={list.authon}
            count={list.count}
          />
        ))}
      </Box>
      {total_lists_count &&
        total_lists_count.map((total) => (
          <PageNation key={total} total={total} />
        ))}
    </VStack>
  );
}
