/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useAuth } from "../services/AuthProvider";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Stack,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import ButtonIconLogo from "../assets/icons/ButtonIconLogo.svg";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleSubmit = async (event) => {
    console.log();
    event.preventDefault();
    try {
      await login(username, password);
      navigate("/add_kit");
      toast({
        title: "Conexion réussie",
        description: "Bon retour parmi nous!",
        status: "success",
        duration: 3000,
      });
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        minHeight: "calc(100vh - 7.5vh)",
        overflow: "auto",
      }}
    >
      <Stack
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        mt="1em"
      >
        <Image src={ButtonIconLogo} boxSize="18px" />
        <Text align="center" textColor="#F00D32" fontSize="lg">
          DE RETOUR? CONNECTEZ-VOUS
        </Text>
      </Stack>
      <VStack h="79vh" w="80%" mt="4em" mx="auto" spacing={8}>
        <form
          onSubmit={handleSubmit}
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1em",
          }}
        >
          <FormControl id="email" isRequired borderColor="#314095" w="80%">
            <FormLabel>E-mail</FormLabel>
            <Input
              autoComplete="email"
              name="email"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired borderColor="#314095" w="80%">
            <FormLabel>Mot de passe</FormLabel>
            <Input
              autoComplete="current-password"
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button
            colorScheme="red"
            variant="outline"
            type="submit"
            mt="1em"
            w={{ sm: "40%", md: "20%" }}
          >
            CONNEXION
          </Button>
        </form>
      </VStack>
    </div>
  );
}
