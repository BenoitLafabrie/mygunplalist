/* eslint-disable react/no-unescaped-entities */
import {
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import ButtonIconLogo from "../assets/icons/ButtonIconLogo.svg";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BottomNavBar from "../components/BottomNavBar";

export default function Register() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        minHeight: "calc(100vh - 7.5vh)",
        overflow: "auto",
      }}
    >
      <Header />
      <Stack
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        mt="1em"
      >
        <Image src={ButtonIconLogo} boxSize="18px" />
        <Text align="center" textColor="#F00D32" fontSize="lg">
          PLEASE CREATE YOUR ACCOUNT
        </Text>
      </Stack>
      <VStack h="79vh" w="80%" mt="2em" mx="auto" spacing={3}>
        <FormControl id="firstname" isRequired borderColor="#2894E2">
          <FormLabel textColor="#2894E2">Firstname</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl id="lastname" isRequired borderColor="#314095">
          <FormLabel textColor="#314095">Lastname</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl id="username" isRequired>
          <FormLabel>Username</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Mail Address</FormLabel>
          <Input type="email" />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" />
        </FormControl>
        <FormControl id="birthdate" isRequired>
          <FormLabel>Birthdate</FormLabel>
          <Input type="date" />
        </FormControl>
        <Button colorScheme="red" variant="outline" mt="1em">
          REGISTER
        </Button>
      </VStack>
      <Footer />
      <BottomNavBar />
    </div>
  );
}
