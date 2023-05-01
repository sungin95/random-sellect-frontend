import { HStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React from "react";
import { IList } from "../types";

export default function List({ description, authon }: IList) {
  return (
    <HStack justifyContent={"space-between"} m={5}>
      <Text rounded="lg" width="60%" height={5} mb={1}>
        {description}
      </Text>
      <Text rounded="lg" width="15%" height={5}>
        {authon.username}
      </Text>
    </HStack>
  );
}
