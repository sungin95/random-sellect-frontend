import { Box, VStack } from "@chakra-ui/react";
import { getLists } from "../api";
import List from "../components/List";
import { IList } from "../types";
import ListSkeleton from "../components/ListSkeleton";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { isLoading, data } = useQuery<IList[]>(["lists"], getLists);
  const countSkeleton = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
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
