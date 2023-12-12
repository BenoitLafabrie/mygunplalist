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
  Button,
  Select,
  Stack,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon, Search2Icon } from "@chakra-ui/icons";

export default function Search() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortDirection, setSortDirection] = useState("asc");
  const itemsPerPage = 10;

  // Fetch the items when the component mounts
  useEffect(() => {
    // Fetch all items
    fetch("http://localhost:3000/kits")
      .then((response) => response.json())
      .then((items) => {
        // Fetch all images
        fetch("http://localhost:3000/kits-images/")
          .then((response) => response.json())
          .then((images) => {
            // Match images with their corresponding items
            const itemsWithImages = items.map((item) => ({
              ...item,
              images: images.filter((image) => image.item_id === item.item_id),
            }));
            setItems(itemsWithImages);
          });
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
            placeholder="Find your kit..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
        <Select
          value={sortDirection}
          onChange={(e) => setSortDirection(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </Select>
      </Stack>
      <Stack spacing={8}>
        {currentItems.map((item) => (
          <Card key={item.item_id} align="center">
            <CardBody>
              {/* Render the first image of the item if it exists */}
              {item.images && item.images.length > 0 ? (
                <Image
                  src={item.images[0].image_path}
                  alt={item.name}
                  borderRadius="lg"
                />
              ) : (
                <p>No images found for this item.</p>
              )}
              <Heading size="xs" pt="2">
                {item.name}
              </Heading>
              {/* Render other item details... */}
            </CardBody>
            <Divider color="red" />
            <CardFooter justifyContent="center">
              <ButtonGroup spacing={12}>
                <Button variant="solid" colorScheme="red">
                  Add
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
            <IconButton
              onClick={handleClickPrev}
              disabled={currentPage === 1}
              variant="outline"
              colorScheme="red"
              icon={<ArrowBackIcon />}
            />
          )}
          {pageNumbers
            .slice(currentPage - 1, currentPage + (currentPage === 1 ? 2 : 1))
            .map((number) => (
              <Button
                key={number}
                onClick={() => setCurrentPage(number)}
                disabled={currentPage === number}
                variant="outline"
                colorScheme="red"
              >
                {number}
              </Button>
            ))}
          {currentPage < Math.ceil(filteredItems.length / itemsPerPage) && (
            <IconButton
              onClick={handleClickNext}
              disabled={currentPage === totalPages}
              variant="outline"
              colorScheme="red"
              icon={<ArrowForwardIcon />}
            />
          )}
        </ButtonGroup>
      </Stack>
    </Box>
  );
}
