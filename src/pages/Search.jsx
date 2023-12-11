import { useState, useEffect } from "react";
import { Box, Input, Button, Select } from "@chakra-ui/react";

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

  const handleClickNext = () => {
    setCurrentPage((prevPageNumber) => prevPageNumber + 1);
  };

  const handleClickPrev = () => {
    setCurrentPage((prevPageNumber) => prevPageNumber - 1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Box h="79vh" w="80%" display="flex" flexDirection="column">
      <h1 style={{ textAlign: "center" }}>Search</h1>
      <Input
        placeholder="Find your kit..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ margin: "1em" }}
      />
      <Select
        value={sortDirection}
        onChange={(e) => setSortDirection(e.target.value)}
        style={{ margin: "1em" }}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </Select>
      {currentItems.map((item) => (
        <div key={item.item_id} style={{ margin: "1em" }}>
          <h2>{item.name}</h2>
          {/* Render the first image of the item if it exists */}
          {item.images && item.images.length > 0 ? (
            <img
              src={item.images[0].image_path}
              alt={item.name}
              style={{ height: "80%" }}
            />
          ) : (
            <p>No images found for this item.</p>
          )}
          {/* Render other item details... */}
        </div>
      ))}
      {currentPage > 1 && (
        <Button onClick={handleClickPrev} disabled={currentPage === 1}>
          Previous
        </Button>
      )}
      {currentPage < Math.ceil(filteredItems / itemsPerPage) && (
        <Button onClick={handleClickNext} disabled={currentPage === totalPages}>
          Next
        </Button>
      )}
    </Box>
  );
}
