import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import ProtectedPage from "../components/ProtectedPage";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IUploadQuestion, IUploadQuestionCheck } from "../types";
import { uploadQuestion } from "../api";
import { Helmet } from "react-helmet";

export default function UploadRoom() {
  const { register, handleSubmit } = useForm<IUploadQuestion>();
  const toast = useToast();
  const navigate = useNavigate();
  const mutation = useMutation(uploadQuestion, {
    onSuccess: (data: IUploadQuestionCheck) => {
      toast({
        status: "success",
        title: "Room created",
        position: "bottom-right",
      });
      navigate(`/my-list`);
    },
  });
  const onSubmit = (data: IUploadQuestion) => {
    mutation.mutate(data);
  };
  return (
    <ProtectedPage>
      <Helmet>
        <title>면접 질문 만들기</title>
      </Helmet>
      <Box pb={40} mt={10} px={{ base: 10, lg: 40 }}>
        <Container>
          <Heading textAlign={"center"}>질문 만들기</Heading>
          <VStack
            spacing={10}
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            mt={5}
          >
            <FormControl>
              <FormLabel>질문 내용</FormLabel>
              <Textarea {...register("description", { required: true })} />
              <FormHelperText>
                면접관이다 생각하고 만들어 주세요~
              </FormHelperText>
            </FormControl>
            {mutation.isError ? (
              <Text color={"red.500"}>Something went wrong</Text>
            ) : null}
            <Button
              type="submit"
              isLoading={mutation.isLoading}
              colorScheme={"red"}
              size="lg"
              w={"100%"}
            >
              질문 올리기
            </Button>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}
