import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaUserNinja, FaLock } from "react-icons/fa";
import { userSignUp } from "../api";
import { IUserSignUpVariables } from "../types";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUserSignUpVariables>();
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation(userSignUp, {
    onSuccess: (data) => {
      toast({
        title: "welcome back!",
        status: "success",
      });
      onClose();
      reset();
      queryClient.refetchQueries(["me"]);
    },
    onError: (error) => {
      console.log("mutation has an error");
    },
  });
  const onSubmit = ({ username, password }: IUserSignUpVariables) => {
    mutation.mutate({ username, password });
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>회원가입</ModalHeader>
        <ModalCloseButton />
        <ModalBody as={"form"} onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaUserNinja />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.username?.message)}
                required
                {...register("username", {
                  required: "아이디를 입력해 주세요",
                })}
                variant={"filled"}
                placeholder="아이디"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaLock />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.password?.message)}
                required
                type="password"
                {...register("password", {
                  required: "비밀번호를 적어주세요",
                })}
                variant={"filled"}
                placeholder="비밀번호"
              />
            </InputGroup>
          </VStack>
          <Button
            isLoading={mutation.isLoading}
            type="submit"
            mt={4}
            colorScheme={"red"}
            w={"100%"}
          >
            회원가입
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
