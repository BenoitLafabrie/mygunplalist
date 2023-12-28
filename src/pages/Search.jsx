import { useState, useEffect } from "react";
import {
  Box,
  ButtonGroup,
  Card,
  CardFooter,
  CardBody,
  Divider,
  Heading,
  Image,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
  Select,
  Stack,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  CloseIcon,
  Search2Icon,
} from "@chakra-ui/icons";

export default function Search() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortDirection, setSortDirection] = useState("asc");
  const itemsPerPage = 10;

  // Fetch the items when the component mounts
  useEffect(() => {
    fetch("http://localhost:3001/kits")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des kits");
        }
        return response.json();
      })
      .then((items) => {
        fetch("http://localhost:3001/kits-images")
          .then((response) => {
            if (!response.ok) {
              throw new Error("Erreur lors de la récupération des images");
            }
            return response.json();
          })
          .then((images) => {
            const itemsWithImages = items.map((item) => ({
              ...item,
              images: images.filter((image) => image.item_id === item.item_id),
            }));
            setItems(itemsWithImages);
          });
      })
      .catch((error) => {
        console.error("Erreur:", error);
      });
  }, []);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleClickNext = () => {
    setCurrentPage((prevPageNumber) => prevPageNumber + 1);
  };

  const handleClickPrev = () => {
    setCurrentPage((prevPageNumber) => prevPageNumber - 1);
  };

  useEffect(() => {
    const topElement = document.getElementById("search-page");
    topElement.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Box w="80%" id="search-page">
      <Stack direction="column" spacing={4} my="2em">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Search2Icon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Trouvez votre gunpla"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputRightElement>
            {search && (
              <IconButton
                onClick={() => setSearch("")}
                variant="ghost"
                icon={<CloseIcon color="gray.500" />}
                _hover={{}}
                _active={{}}
              />
            )}
          </InputRightElement>
        </InputGroup>
        <Select
          value={sortDirection}
          onChange={(e) => setSortDirection(e.target.value)}
        >
          <option value="asc">Croissant</option>
          <option value="desc">Décroissant</option>
        </Select>
      </Stack>
      <Stack spacing={8}>
        {currentItems.map((item) => (
          <Card key={item.item_id} align="center">
            <ChakraLink as={ReactRouterLink} to={`/kits/${item.item_id}`}>
              <CardBody>
                {/* Render the first image of the item if it exists */}
                {item.images && item.images.length > 0 ? (
                  <Image
                    src={item.images[0].image_path}
                    alt={item.name}
                    borderRadius="lg"
                  />
                ) : (
                  <p>Aucune image pour ce gunpla</p>
                )}
                <Heading size="xs" pt="2">
                  {item.name}
                </Heading>
              </CardBody>
            </ChakraLink>
            <Divider color="red" />
            <CardFooter justifyContent="center">
              <ButtonGroup spacing={12}>
                <Button variant="solid" colorScheme="red">
                  Ajouter
                </Button>
                <Button variant="outline" colorScheme="red">
                  Wishlist
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        ))}
      </Stack>
      <Stack alignItems="center">
        <ButtonGroup py={4}>
          {currentPage > 1 && (
            <>
              <Button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                variant="outline"
                color="#314095"
              >
                Première Page
              </Button>
              <IconButton
                onClick={handleClickPrev}
                disabled={currentPage === 1}
                variant="outline"
                color="#314095"
                icon={<ArrowBackIcon />}
              />
            </>
          )}
          {pageNumbers
            .slice(currentPage - 1, currentPage + (currentPage === 1 ? 2 : 1))
            .map((number) => (
              <Button
                key={number}
                onClick={() => setCurrentPage(number)}
                disabled={currentPage === number}
                variant="outline"
                color="#314095"
              >
                {number}
              </Button>
            ))}
          {currentPage < Math.ceil(filteredItems.length / itemsPerPage) && (
            <>
              <IconButton
                onClick={handleClickNext}
                disabled={currentPage === totalPages}
                variant="outline"
                color="#314095"
                icon={<ArrowForwardIcon />}
              />
              <Button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                variant="outline"
                color="#314095"
              >
                Dernière Page
              </Button>
            </>
          )}
        </ButtonGroup>
      </Stack>
    </Box>
  );
}
