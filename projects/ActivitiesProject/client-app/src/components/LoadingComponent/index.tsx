import { Center, CircularProgress, Text } from "@chakra-ui/react";

interface Props {
  content?: string;
}

export default function LoadingComponent({ content = "Loading..." }: Props) {
  return (
    <Center
      zIndex={1000}
      position="fixed"
      top={0}
      left={0}
      w="100vw"
      h="100vh"
      bgColor="#eaeaea"
      flexDirection="column"
    >
      <CircularProgress isIndeterminate color="gray" /> <br />
      <Text fontSize="xl" as="p">
        {content}
      </Text>
    </Center>
  );
}
