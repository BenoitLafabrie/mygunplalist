/* eslint-disable react/no-unescaped-entities */
import { Box, Image, Stack, Text } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";
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
  const bgImage = useBreakpointValue({ sm: Footer_Background, md: "none" });

  return (
    <Box
      display={{ sm: "grid", md: "flex" }}
      w="100%"
      h={{ sm: "28%", md: "14%" }}
      flexDirection={{ sm: "unset", md: "column" }}
      position={{ sm: "static", md: "relative" }}
      mb={{ sm: "7.5vh", md: "unset" }}
      pb={{ sm: "unset", md: "0.5em" }}
      alignItems={{ sm: "center", md: "start" }}
      alignContent={{ sm: "unset", md: "start" }}
      backgroundImage={bgImage}
      bgColor={{ sm: "transparent", md: "#F00D32" }}
      zIndex={2}
      justifyContent={{ sm: "normal", md: "center" }}
    >
      <Box
        w={{ sm: "80%", md: "100%" }}
        display="flex"
        justifySelf="center"
        px={{ sm: "unset", md: "1em" }}
        mt={{ sm: "unset", md: "0.5em" }}
        mb={{ sm: "auto", md: "0.5em" }}
        justifyContent={{ sm: "unset", md: "center" }}
      >
        <Text
          fontSize="60%"
          fontWeight={{ sm: "normal", md: "bold" }}
          align="center"
          textColor={{ sm: "auto", md: "white" }}
        >
          Les Logos, produits et noms de sociétés mentionnnés sont la propriété
          de leurs auteurs respectifs. ©MyGunplaList 2024
        </Text>
      </Box>
      <Box
        display={{ sm: "flex", md: "none" }}
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
      <Box
        alignContent="center"
        alignItems="center"
        justifyItems="center"
        marginBottom={{ sm: "auto", md: "0" }}
        display={{ sm: "grid", md: "flex" }}
        w={{ sm: "unset", md: "100%" }}
        justifyContent={{ sm: "unset", md: "space-around" }}
      >
        <Box
          display="flex"
          px={{ sm: "unset", md: "1em" }}
          flexDirection={{ sm: "column", md: "row" }}
          gap={{ sm: "unset", md: "1.5em" }}
          fontSize={{ sm: "80%", md: "90%" }}
          textColor="white"
          fontWeight="bold"
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
        <Stack display={{ sm: "none", md: "flex" }} flexDirection="row">
          <Box display={{ sm: "none", md: "flex" }} px="1em">
            <Text textColor="white" fontWeight="bold">
              Retrouvez-nous sur les réseaux sociaux :
            </Text>
          </Box>
          <Box
            display={{ sm: "grid", md: "flex" }}
            flexDirection={{ sm: "unset", md: "row" }}
            px={{ sm: "unset", md: "1em" }}
            ml={{ sm: "2em", md: "unset" }}
            gap={{ sm: "unset", md: "1.5em" }}
          >
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
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
