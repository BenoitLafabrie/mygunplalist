import { useAuth } from "../services/AuthProvider";
import { Avatar, Box, Button, Heading, Text } from "@chakra-ui/react";
import { BiLogOut } from "react-icons/bi";

export default function Profile() {
  const { user, logout } = useAuth();
  const createdAt = new Date(user?.createdAt);
  const now = new Date();
  const diffInTime = now.getTime() - createdAt.getTime();
  const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));

  return (
    <Box
      minH={{ sm: "79vh", md: "85vh" }}
      display={{ base: "flex", md: "grid" }}
      flexDirection={{ base: "column" }}
      alignItems={{ base: "center" }}
    >
      <Avatar
        size="xl"
        name={`${user?.firstname} ${user?.lastname}`}
        mb="1rem"
      />

      <Heading size={{ base: "lg", md: "xl" }} mb="0.25rem">
        {user?.username}
      </Heading>

      <Text fontSize={{ base: "sm", md: "lg" }} as="em" opacity="50%" mb="1rem">
        Membre depuis le{" "}
        {new Date(user?.createdAt).toLocaleDateString("fr-FR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}{" "}
        ({diffInDays} jour(s))
      </Text>

      <Button
        leftIcon={<BiLogOut size={18} />}
        borderColor="brand.500"
        textColor="brand.500"
        onClick={logout}
        display={{ base: "flex", md: "none" }}
        alignItems="center"
        justifyContent="center"
        variant="outline"
        m="1rem"
        p="1rem"
      >
        Déconnexion
      </Button>
    </Box>
  );
}
