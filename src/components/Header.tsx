import { AiOutlineExclamationCircle } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { BsPersonVcard } from "react-icons/bs";
import {
  Box,
  Button,
  HStack,
  IconButton,
  LightMode,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  ToastId,
  VStack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import useUser from "../lib/useUser";
import { logOut } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import Cookie from "js-cookie";
import FirstModal from "./FirstModal";
import { start_my_page, start_page } from "../constants";

export default function Header() {
  const [cookies, setCookie] = useCookies(["isFirst"]);
  if (Cookie.get("isFirst") === undefined) {
    setCookie("isFirst", "false", { path: "/" });
  }
  const { userLoading, isLoggedIn, user } = useUser();
  const {
    isOpen: isLoginOpen,
    onClose: onLoginClose,
    onOpen: onLoginOpen,
  } = useDisclosure();
  const {
    isOpen: isSignUpOpen,
    onClose: onSignUpClose,
    onOpen: onSignUpOpen,
  } = useDisclosure();
  const {
    isOpen: isFirstModalOpen,
    onClose: onFirstModalClose,
    onOpen: onFirstModalOpen,
  } = useDisclosure();
  useEffect(() => {
    if (Cookie.get("isFirst") === "false") {
      onFirstModalOpen();
    }
  }, ["first"]);
  const { toggleColorMode } = useColorMode();
  const logoColor = useColorModeValue("red.500", "red.400");
  const Icon = useColorModeValue(FaMoon, FaSun);
  const toast = useToast();
  const queryClient = useQueryClient();
  const toastId = useRef<ToastId>();
  const mutation = useMutation(logOut, {
    onMutate: () => {
      toastId.current = toast({
        title: "Login out...",
        description: "Sad to see you go...",
        status: "loading",
        position: "bottom-right",
      });
    },
    onSuccess: () => {
      if (toastId.current) {
        queryClient.refetchQueries(["me"]);
        toast.update(toastId.current, {
          status: "success",
          title: "Done!",
          description: "See you later!",
        });
      }
    },
  });
  const handleInstructions = () => {
    window.open(
      "https://github.com/sungin95/random-question-document/blob/master/%EB%9E%9C%EB%8D%A4%EC%A7%88%EB%AC%B8%20%EB%AC%B8%EC%84%9C/%EC%82%AC%EC%9A%A9%EB%B2%95.md"
    );
  };

  const onLogOut = async () => {
    mutation.mutate();
  };
  return (
    <Stack
      justifyContent={"space-between"}
      alignItems="center"
      py={5}
      px={40}
      direction={{
        sm: "column",
        md: "row",
      }}
      spacing={{
        sm: 4,
        md: 0,
      }}
      borderBottomWidth={1}
    >
      <HStack>
        <Box mr={5} color={logoColor}>
          <Link to={"/"}>
            <BsPersonVcard size={"48"} />
          </Link>
        </Box>
        <Link to={start_page}>
          <Box ml={1}>질문</Box>
        </Link>
        <Link to={start_my_page}>
          <Box mx={3}>내질문</Box>
        </Link>
        <Link to={"/my-list/start"}>
          <Box>면접 시작</Box>
        </Link>
      </HStack>
      <HStack spacing={2}>
        <IconButton
          onClick={toggleColorMode}
          variant={"ghost"}
          aria-label="Toggle dark mode"
          icon={<Icon />}
        />
        {!userLoading ? (
          !isLoggedIn ? (
            <>
              <Button onClick={onLoginOpen}>로그인</Button>
              <LightMode>
                <Button onClick={onSignUpOpen} colorScheme={"red"}>
                  회원가입
                </Button>
              </LightMode>
            </>
          ) : (
            <Box>
              <Menu>
                <MenuButton>
                  <Box>{user?.username}</Box>
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={onLogOut}>Log out</MenuItem>
                </MenuList>
              </Menu>
              <Link to={"/create-question"}>
                <Button colorScheme={"red"} ml={5}>
                  질문 만들기
                </Button>
              </Link>
            </Box>
          )
        ) : null}
        <Menu>
          <MenuButton>
            <HStack>
              <AiOutlineExclamationCircle size={"48"} color="skyblue" />
            </HStack>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={handleInstructions}>사용법</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
      <FirstModal isOpen={isFirstModalOpen} onClose={onFirstModalClose} />
    </Stack>
  );
}
