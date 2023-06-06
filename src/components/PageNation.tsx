import { Box, Button, HStack, Text, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { IPageNation } from "../types";
import { useMutation } from "@tanstack/react-query";
import { AddList } from "../api";

export default function PageNation({ total }: IPageNation) {
  const [page, setPage] = useState(1);
  const numPages = Math.ceil(total / 10);
  const pageArray = [];
  for (let i = 1; i <= numPages; i++) {
    pageArray.push(i); // 리스트에 숫자 추가
  }

  return (
    <>
      <HStack>
        <Button onClick={() => setPage(page - 1)} hidden={page === 1}>
          &lt;
        </Button>
        {pageArray.map((i) => (
          <Button key={i} onClick={() => setPage(i)}>
            {i}
          </Button>
        ))}
        <Button onClick={() => setPage(page + 1)} hidden={page === numPages}>
          &gt;
        </Button>
      </HStack>
    </>
  );
}
