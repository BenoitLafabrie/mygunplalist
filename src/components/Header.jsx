import { Box } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import Header_Icon from "../assets/header/Header_Icon.svg";

export default function Header() {
  return (
    <ChakraLink
      as={ReactRouterLink}
      to="/home"
      _hover={{ textDecoration: "none" }}
    >
      <Box w="100%" h="108px" position="sticky" backgroundImage={Header_Icon} />
    </ChakraLink>
  );
}
