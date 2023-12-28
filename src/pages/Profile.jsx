import { useAuth } from "../services/AuthProvider";
import { Avatar, Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import { BiLogOut } from "react-icons/bi";

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <Box
      h={{ sm: "79vh", md: "85vh" }}
      display={{ base: "flex", md: "grid" }}
      flexDirection={{ base: "column", md: "unset" }}
      alignItems={{ base: "center", md: "unset" }}
    >
      <Avatar size="xl" name={`${user?.firstname} ${user?.lastname}`} />
      <Stack>
        <Heading>{user?.username}</Heading>
        <Text>Membre depuis le {user?.createdAt}</Text>
      </Stack>
      <Button icon={<BiLogOut />} textColor="brand.500" onClick={logout}>
        Déconnexion
      </Button>
    </Box>
  );
}
