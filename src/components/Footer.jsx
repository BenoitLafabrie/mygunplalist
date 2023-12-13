/* eslint-disable react/no-unescaped-entities */
import { Box, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import Footer_Background from "../assets/Footer_Background.svg";
import BrandLogo from "../assets/header/BrandLogo.svg";
import Tagline from "../assets/header/Tagline.svg";
import MyGunplaListLogo from "../assets/header/MyGunplaListLogo.svg";
import FaceBookIcon from "../assets/icons/FaceBookIcon.svg";
import InstagramIcon from "../assets/icons/InstagramIcon.svg";
import TwitterIcon from "../assets/icons/TwitterIcon.svg";
import DiscordIcon from "../assets/icons/DiscordIcon.svg";
import TwitchIcon from "../assets/icons/TwitchIcon.svg";
import YoutubeIcon from "../assets/icons/YoutubeIcon.svg";

export default function Footer() {
  return (
    <Box
      display="grid"
      w="100%"
      h="28%"
      position="static"
      mb="7.5vh"
      alignItems="center"
      backgroundImage={Footer_Background}
      zIndex={2}
    >
      <Box w="80%" display="flex" justifySelf="center" mb="auto">
        <Text fontSize="60%" align="center">
          Les Logos, produits et noms de sociétés mentionnnés sont la propriété
          de leurs auteurs respectifs. © MyGunplaList 2024
        </Text>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        h="40%"
        ml="-2em"
      >
        <Image src={MyGunplaListLogo} w="20%" h="100%" />
        <Box
          display="flex"
          flexDirection="column"
          h="35px"
          w="50%"
          ml="-0.5em"
          mt="1em"
        >
          <Image src={BrandLogo} pb="0.25em" />
          <Image src={Tagline} />
        </Box>
      </Box>
      <SimpleGrid
        columns={2}
        spacing={2}
        alignContent="center"
        alignItems="center"
        justifyItems="center"
        marginBottom="auto"
      >
        <Box
          display="flex"
          flexDirection="column"
          fontSize="80%"
          textColor="white"
        >
          <ChakraLink as={ReactRouterLink} to="/about">
            À propos
          </ChakraLink>
          <ChakraLink as={ReactRouterLink} to="/terms-of-use">
            Conditions d'utilisation
          </ChakraLink>
          <ChakraLink as={ReactRouterLink} to="/privacy-policy">
            Politique de confidentialité
          </ChakraLink>
        </Box>
        <SimpleGrid columns={3} spacing={3} ml="2em">
          <ChakraLink
            as={ReactRouterLink}
            to="https://www.facebook.com/riseofgunpla"
          >
            <Image src={FaceBookIcon} />
          </ChakraLink>
          <ChakraLink
            as={ReactRouterLink}
            to="https://www.instagram.com/riseofgunpla"
          >
            <Image src={InstagramIcon} mt="0.1em" />
          </ChakraLink>
          <ChakraLink
            as={ReactRouterLink}
            to="https://twitter.com/Riseofgunpla"
          >
            <Image src={TwitterIcon} mt="0.25em" />
          </ChakraLink>
          <ChakraLink as={ReactRouterLink} to="https://discord.gg/J2VYmbd">
            <Image src={DiscordIcon} />
          </ChakraLink>
          <ChakraLink
            as={ReactRouterLink}
            to="https://www.twitch.tv/riseofgunpla"
          >
            <Image src={TwitchIcon} mt="0.2em" />
          </ChakraLink>
          <ChakraLink
            as={ReactRouterLink}
            to="https://www.youtube.com/channel/UC_CCjUpIV-cBKGAwwrMVzow"
          >
            <Image src={YoutubeIcon} mt="0.25em" />
          </ChakraLink>
        </SimpleGrid>
      </SimpleGrid>
    </Box>
  );
}
