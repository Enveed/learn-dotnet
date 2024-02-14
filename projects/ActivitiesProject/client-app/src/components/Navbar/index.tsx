import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Link as ChakraLink,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());

  return (
    <Flex
      as="nav"
      padding={3}
      top={0}
      position="fixed"
      width="100%"
      maxWidth="none"
      color="white"
      justifyContent="center"
      wrap="wrap"
      zIndex={500}
    >
      <Flex
        align="center"
        wrap="wrap"
        justify="space-between"
        maxWidth="950px"
        flex="1"
      >
        <Flex as={NavLink} to="/" align="center" mr={5}>
          <Image src="/assets/logo.png" alt="Logo" boxSize="50px" />
          <Heading as="h1" size="lg" letterSpacing={"tighter"} my={0}>
            Activities
          </Heading>
        </Flex>

        <Box
          display={{ base: "block", md: "none" }}
          onClick={handleToggle}
        ></Box>

        <Stack
          direction={{ base: "column", md: "row" }}
          display={{ base: isOpen ? "block" : "none", md: "flex" }}
          width={{ base: "full", md: "auto" }}
          alignItems="center"
          flexGrow={1}
          mt={{ base: 4, md: 0 }}
        >
          <ChakraLink as={NavLink} to="/activities">
            Activities
          </ChakraLink>
        </Stack>

        <Box
          display={{ base: isOpen ? "block" : "none", md: "block" }}
          mt={{ base: 4, md: 0 }}
        >
          <Button
            as={NavLink}
            to="/create-activity"
            variant="outline"
            color="white"
            _hover={{ bg: "teal.700", borderColor: "teal.700" }}
          >
            Create Activity
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
}
