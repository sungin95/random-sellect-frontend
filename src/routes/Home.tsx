import { Box, VStack } from "@chakra-ui/react";
import { getLists } from "../api";
import List from "../components/List";
import { IList } from "../types";
import ListSkeleton from "../components/ListSkeleton";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { isLoading, data } = useQuery<IList[]>(["lists"], getLists);
  const countSkeleton = [...Array(20)];
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
        {data?.map((list) => (
          <List
            key={list.pk}
            pk={list.pk}
            description={list.description}
            authon={list.authon}
          />
        ))}
      </Box>
    </VStack>
  );
}
