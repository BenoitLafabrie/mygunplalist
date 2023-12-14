import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  IconButton,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Text,
  Stack,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

export default function KitPage() {
  const [item, setItem] = useState(null);
  const { id } = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleOpen = (index) => {
    setSelectedImageIndex(index);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleNext = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % item.images.length);
  };

  const handlePrev = () => {
    setSelectedImageIndex(
      (prevIndex) => (prevIndex - 1 + item.images.length) % item.images.length
    );
  };

  useEffect(() => {
    fetch(`http://localhost:3000/kits/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching kit");
        }
        return response.json();
      })
      .then((item) => {
        fetch("http://localhost:3000/kits-images")
          .then((imagesResponse) => {
            if (!imagesResponse.ok) {
              throw new Error("Error fetching kit images");
            }
            return imagesResponse.json();
          })
          .then((images) => {
            const itemImages = images.filter(
              (image) => image.item_id === item.item_id
            );
            fetch(`http://localhost:3000/kits-props/${item.item_id}`)
              .then((propsResponse) => {
                if (!propsResponse.ok) {
                  throw new Error("Error fetching kit properties");
                }
                return propsResponse.json();
              })
              .then((props) => {
                setItem({
                  ...item,
                  images: itemImages,
                  props,
                });
              });
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [id]);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      w="80%"
    >
      <Heading size="md" textAlign="center" py="1em">
        {item.name}
      </Heading>
      <Box display="flex" overflowX="auto" w="100%" gap={4} py="1em">
        {item.images.map((image, index) => (
          <Card
            key={index}
            minW="200px"
            minH="200px"
            onClick={() => handleOpen(index)}
          >
            <Image
              src={image.image_path}
              alt={`Image ${index + 1} for ${item.name}`}
              flexShrink={0}
              borderRadius="md"
              fit="contain"
              h="100%"
              w="100%"
            />
          </Card>
        ))}
      </Box>

      <Modal isOpen={isOpen} onClose={handleClose} isCentered="true">
        <ModalOverlay />
        <ModalContent w="95%">
          <ModalBody>
            <Image
              src={item.images[selectedImageIndex].image_path}
              alt="Selected"
              objectFit="contain"
              w="100%"
              h="50vh"
            />
            <Flex justifyContent="space-between">
              <IconButton
                onClick={handlePrev}
                variant="ghost"
                colorScheme="red"
                icon={<ArrowBackIcon />}
                size="lg"
              />
              <IconButton
                onClick={handleNext}
                variant="ghost"
                colorScheme="red"
                icon={<ArrowForwardIcon />}
                size="lg"
              />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Box py="1em" w="100%">
        <Stack
          display="flex"
          flexDirection="row"
          justifyContent="space-evenly"
          pb="1.25em"
        >
          <Button variant="outline" colorScheme="red">
            Add
          </Button>
          <Button variant="outline" colorScheme="red">
            Wishlist
          </Button>
          <ChakraLink as={ReactRouterLink} to={`${item.ROG_Url}`}>
            <Button variant="solid" colorScheme="red">
              Buy
            </Button>
          </ChakraLink>
        </Stack>
        <Stack display="flex" flexDirection="column" gap={0}>
          <Text>Grade: {item.props.grade}</Text>
          <Text>Scale: {item.props.scale}</Text>
          <Text>Series: {item.props.series}</Text>
        </Stack>
      </Box>
      <Box pb="2em">
        <Heading fontSize="18px" pb="0.5em">
          Description
        </Heading>
        <Text textAlign="justify">{item.description}</Text>
      </Box>
    </Box>
  );
}
