/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
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

export default function Register() {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      username,
      firstname,
      lastname,
      email,
      password,
      birthdate,
    };

    const response = await fetch("http://localhost:3001/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      console.log("User created successfully");
      navigate("/add_kit");
      toast({
        title: "Création de compte réussie",
        description: "Bienvenue!",
        status: "success",
        duration: 3000,
      });
    } else {
      console.error("Error creating user");
      toast({
        title: "Erreur lors de la création du compte",
        description: "Oups!",
        status: "error",
        duration: 3000,
      });
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
          CRÉER VOTRE COMPTE
        </Text>
      </Stack>
      <VStack h="79vh" w="80%" mt="2em" mx="auto" spacing={3}>
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
          <FormControl id="username" isRequired borderColor="#06425b">
            <FormLabel textColor="#06425b">Pseudo</FormLabel>
            <Input
              type="text"
              placeholder="Pseudo"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl id="lastname" borderColor="#06425b">
            <FormLabel textColor="#06425b">Nom</FormLabel>
            <Input
              type="text"
              placeholder="Nom"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </FormControl>
          <FormControl id="firstname" borderColor="#06425b">
            <FormLabel textColor="#06425b">Prénom</FormLabel>
            <Input
              type="text"
              placeholder="Prénom"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </FormControl>
          <FormControl id="email" isRequired borderColor="#06425b">
            <FormLabel textColor="#06425b">E-Mail</FormLabel>
            <Input
              type="email"
              placeholder="E-Mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired borderColor="#06425b">
            <FormLabel textColor="#06425b">Mot de passe</FormLabel>
            <Input
              type="password"
              placeholder="＊＊＊＊＊＊＊＊"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <FormControl id="birthdate" isRequired borderColor="#06425b">
            <FormLabel textColor="#06425b">Date de naissance</FormLabel>
            <Input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
          </FormControl>
          <Button colorScheme="red" variant="outline" mt="1em" type="submit">
            S'ENREGISTRER
          </Button>
        </form>
      </VStack>
    </div>
  );
}
