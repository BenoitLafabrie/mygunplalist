/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Search2Icon,
} from "@chakra-ui/icons";

export default function BackOffice() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch("http://localhost:3000/kits")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching kits");
        }
        return response.json();
      })
      .then((items) => {
        fetch("http://localhost:3000/kits-images")
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error fetching kit images");
            }
            return response.json();
          })
          .then((images) => {
            const itemsWithImages = items.map((item) => ({
              ...item,
              images: images.filter((image) => image.item_id === item.item_id),
            }));
            return itemsWithImages;
          })
          .then((itemsWithImages) => {
            fetch("http://localhost:3000/kits-props")
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Error fetching kit props");
                }
                return response.json();
              })
              .then((props) => {
                const itemsWithImagesAndProps = itemsWithImages.map((item) => ({
                  ...item,
                  props: props.filter((prop) => prop.item_id === item.item_id),
                }));
                setItems(itemsWithImagesAndProps);
              });
          });
      });
  }, []);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const requestSort = (field) => {
    let newSortDirection = "none";
    if (sortField === field) {
      if (sortDirection === "asc") {
        newSortDirection = "desc";
      } else if (sortDirection === "desc") {
        newSortDirection = "none";
      } else if (sortDirection === "none") {
        newSortDirection = "asc";
      }
    } else {
      newSortDirection = "asc";
    }
    setSortField(field);
    setSortDirection(newSortDirection);
  };

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortDirection === "none") return 0;
    const aValue = sortField === "name" ? a[sortField] : a.props[0][sortField];
    const bValue = sortField === "name" ? b[sortField] : b.props[0][sortField];

    if (aValue < bValue) {
      return sortDirection === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortDirection === "asc" ? 1 : -1;
    }
    return 0;
  });

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleClickNext = () => {
    setCurrentPage((prevPageNumber) => prevPageNumber + 1);
  };

  const handleClickPrev = () => {
    setCurrentPage((prevPageNumber) => prevPageNumber - 1);
  };

  useEffect(() => {
    const topElement = document.getElementById("dashboard");
    topElement.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Box
      id="dashboard"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      m="2em"
      w="100%"
    >
      <Stack w="50%">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Search2Icon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
      </Stack>
      <Stack w="100%">
        <TableContainer m="2%">
          <Table variant="striped" colorScheme="red" w="100%">
            <Thead>
              <Tr>
                <Th onClick={() => requestSort("name")}>
                  Name
                  {sortField === "name" &&
                    sortDirection !== "none" &&
                    (sortDirection === "asc" ? (
                      <ChevronDownIcon />
                    ) : (
                      <ChevronUpIcon />
                    ))}
                </Th>
                <Th>Image</Th>
                <Th onClick={() => requestSort("grade")}>
                  Grade
                  {sortField === "grade" &&
                    sortDirection !== "none" &&
                    (sortDirection === "asc" ? (
                      <ChevronDownIcon />
                    ) : (
                      <ChevronUpIcon />
                    ))}
                </Th>
                <Th onClick={() => requestSort("scale")}>
                  Scale
                  {sortField === "scale" &&
                    sortDirection !== "none" &&
                    (sortDirection === "asc" ? (
                      <ChevronDownIcon />
                    ) : (
                      <ChevronUpIcon />
                    ))}
                </Th>
                <Th onClick={() => requestSort("series")}>
                  Series
                  {sortField === "series" &&
                    sortDirection !== "none" &&
                    (sortDirection === "asc" ? (
                      <ChevronDownIcon />
                    ) : (
                      <ChevronUpIcon />
                    ))}
                </Th>
                <Th>Description</Th>
                <Th>ROG Link</Th>
              </Tr>
            </Thead>
            <Tbody fontSize="sm">
              {currentItems.map((item) => {
                return (
                  <Tr key={item.item_id}>
                    <Td>
                      {item.name.length > 55
                        ? item.name.substring(0, 55) + "..."
                        : item.name}
                    </Td>
                    <Td>
                      {item.images && item.images[0] ? (
                        <Image
                          src={item.images[0].image_path}
                          alt={item.name}
                          boxSize="50px"
                          objectFit="cover"
                          borderRadius="sm"
                        />
                      ) : (
                        "No Image"
                      )}
                    </Td>
                    <Td>
                      {item.props && item.props[0] && item.props[0].grade
                        ? item.props[0].grade
                        : "No Grade"}
                    </Td>
                    <Td>
                      {item.props && item.props[0] && item.props[0].scale
                        ? item.props[0].scale
                        : "No Scale"}
                    </Td>
                    <Td>
                      {item.props && item.props[0] && item.props[0].series
                        ? item.props[0].series
                        : "No Series"}
                    </Td>
                    <Td>
                      {item.description.length > 30
                        ? item.description.substring(0, 30) + "..."
                        : item.description}
                    </Td>
                    <Td>
                      <ChakraLink
                        as={ReactRouterLink}
                        to={`${item.ROG_Url}`}
                        isExternal
                      >
                        {item.ROG_Url ? "Let's Go!!!" : "No Link"}
                      </ChakraLink>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Stack>
      <Stack alignItems="center">
        <ButtonGroup py={4}>
          {currentPage > 1 && (
            <>
              <Button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                variant="outline"
                colorScheme="red"
              >
                First Page
              </Button>
              <IconButton
                onClick={handleClickPrev}
                disabled={currentPage === 1}
                variant="outline"
                colorScheme="red"
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
                colorScheme="red"
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
                colorScheme="red"
                icon={<ArrowForwardIcon />}
              />
              <Button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                variant="outline"
                colorScheme="red"
              >
                Last Page
              </Button>
            </>
          )}
        </ButtonGroup>
      </Stack>
    </Box>
  );
}
