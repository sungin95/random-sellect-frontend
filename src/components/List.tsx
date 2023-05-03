import { Button, HStack, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { IList } from "../types";
import { useMutation } from "@tanstack/react-query";
import { AddList } from "../api";

export default function List({ description, authon, count, pk }: IList) {
  const toast = useToast();
  const mutation = useMutation(AddList, {
    onSuccess: (data) => {
      toast({
        title: "추가되었습니다!",
        status: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "이미 추가 되었습니다...",
        status: "error",
      });
    },
  });
  const handleClickAdd = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    mutation.mutate(pk);
  };
  return (
    <HStack justifyContent={"space-between"} m={5}>
      <Text rounded="lg" width="60%" height={5} mb={1}>
        {description}
      </Text>
      <HStack width="25%" justifyContent={"space-between"}>
        <Text rounded="lg" height={5}>
          {authon.username}
        </Text>
        <HStack justifyContent={"space-between"}>
          <Text>{count}</Text>
          <Text> </Text>
          <Text> </Text>
          <Button onClick={handleClickAdd} colorScheme={"red"}>
            추가
          </Button>
        </HStack>
      </HStack>
    </HStack>
  );
}
