import { Box, Button, HStack, Text, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { IPaginNation } from "../types";
import { useMutation } from "@tanstack/react-query";
import { AddList } from "../api";
import { Link } from "react-router-dom";

export default function Pagination({ total, url }: IPaginNation) {
  const [page, setPage] = useState(1);
  const numPages = Math.ceil(total / 10);
  const pageArray = [];
  for (let i = 1; i <= numPages; i++) {
    pageArray.push(i); // 리스트에 숫자 추가
  }
  return (
    <>
      <HStack>
        <Link to={`${url}${page - 1}`}>
          <Button onClick={() => setPage(page - 1)} hidden={page === 1}>
            &lt;
          </Button>
        </Link>
        {pageArray.map((i) => (
          <Link to={`${url}${i}`}>
            <Button
              key={i}
              onClick={() => setPage(i)}
              aria-current={page === i}
            >
              {i}
            </Button>
          </Link>
        ))}
        <Link to={`${url}${page + 1}`}>
          <Button onClick={() => setPage(page + 1)} hidden={page === numPages}>
            &gt;
          </Button>
        </Link>
      </HStack>
    </>
  );
}
