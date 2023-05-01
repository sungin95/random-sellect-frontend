import { Box, HStack, VStack, useQuery } from "@chakra-ui/react";
import { getLists } from "../api";
import List from "../components/List";
import { IList } from "../types";
import { useEffect, useState } from "react";
import ListSkeleton from "../components/ListSkeleton";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [rooms, setRooms] = useState<IList[]>([]);
  const fetchRooms = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/v1/questions/");
    const json = await response.json();
    setRooms(json);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchRooms();
  }, []);
  //   const { isLoading, data } = useQuery<IList[]>(["lists"], getLists);
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
        {rooms?.map((list) => (
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
