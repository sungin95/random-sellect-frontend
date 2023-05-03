import { Button, HStack, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { IListMyChoice } from "../types";
import { useMutation } from "@tanstack/react-query";
import { DeleteList } from "../api";
import { useParams } from "react-router-dom";

export default function ListMyChoice({
  description,
  importance,
  pk,
}: IListMyChoice) {
  const toast = useToast();
  const mutation = useMutation(DeleteList, {
    onSuccess: (data) => {
      toast({
        title: "삭제되었습니다!",
        status: "success",
      });
    },
    onError: (error) => {
      console.log("mutation has an error");
    },
  });
  const handleClickDelete = () => {
    mutation.mutate(pk);
  };
  return (
    <HStack justifyContent={"space-between"} m={5}>
      <Text rounded="lg" width="60%" height={5} mb={1}>
        {description}
      </Text>
      <HStack width="15%" justifyContent={"space-between"}>
        <Text ml={5}>{importance}</Text>
        <Button onClick={handleClickDelete} colorScheme={"red"}>
          삭제
        </Button>
      </HStack>
    </HStack>
  );
}
