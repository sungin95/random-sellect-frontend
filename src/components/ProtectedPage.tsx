import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../lib/useUser";
import { useToast } from "@chakra-ui/react";

interface IProtectedPaeProps {
  children: React.ReactNode;
}

export default function ProtectedPage({ children }: IProtectedPaeProps) {
  const toast = useToast();
  const { isLoggedIn, userLoading } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userLoading) {
      if (!isLoggedIn) {
        toast({
          title: "로그인을 해 주세요!",
          status: "error",
        });
        navigate("/");
      }
    }
  }, [userLoading, isLoggedIn, navigate]);
  return <>{children}</>;
}
