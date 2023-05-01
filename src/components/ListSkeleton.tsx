import { Box, HStack, Skeleton, VStack } from "@chakra-ui/react";

export default function ListSkeleton() {
  return (
    <Box>
      <HStack justifyContent={"space-between"} m={5}>
        <Skeleton rounded="lg" width="60%" height={5} mb={1} />
        <Skeleton rounded="lg" width="15%" height={5} />
      </HStack>
    </Box>
  );
}
