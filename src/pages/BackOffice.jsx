/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  Image,
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

export default function BackOffice() {
  const [items, setItems] = useState([]);

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
            return itemsWithImages; // Return itemsWithImages to the next .then block
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
                setItems(itemsWithImagesAndProps); // Update the state with the final data
              });
          });
      });
  }, []);

  return (
    <TableContainer p="2em">
      <Table variant="striped" colorScheme="red">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Image</Th>
            <Th>Grade</Th>
            <Th>Scale</Th>
            <Th>Series</Th>
            <Th>Description</Th>
            <Th>ROG Link</Th>
          </Tr>
        </Thead>
        <Tbody fontSize="sm">
          {items.map((item) => {
            console.log(item);
            return (
              <Tr key={item.item_id}>
                <Td>{item.name ? item.name : "No Name"}</Td>
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
                  <ChakraLink as={ReactRouterLink} to={`${item.ROG_Url}`}>
                    {item.ROG_Url ? "Let's Go!!!" : "No Link"}
                  </ChakraLink>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
