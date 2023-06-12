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
  const startPage = Math.floor((page - 1) / 5) * 5 + 1;
  console.log(startPage);
  let endPage = null;
  if (numPages > startPage + 4) {
    endPage = startPage + 4;
  } else {
    endPage = numPages;
  }
  for (let i = startPage; i <= endPage; i++) {
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
        <Link to={`${url}${startPage - 5}`}>
          <Button onClick={() => setPage(startPage - 5)} hidden={page === 1}>
            &hellip;
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
        <Link to={`${url}${startPage + 5}`}>
          <Button
            onClick={() => setPage(startPage + 5)}
            hidden={endPage >= numPages}
          >
            &hellip;
          </Button>
        </Link>
        <Link to={`${url}${page + 1}`}>
          <Button onClick={() => setPage(page + 1)} hidden={page === numPages}>
            &gt;
          </Button>
        </Link>
      </HStack>
    </>
  );
}
