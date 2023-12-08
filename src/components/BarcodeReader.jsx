/* eslint-disable react/no-unescaped-entities */
import { useState, useRef, useEffect } from "react";
import { useZxing } from "react-zxing";
import {
  Box,
  Button,
  List,
  ListItem,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";

export default function BarcodeReader() {
  // Define state variables for the last result and all scanned barcodes
  const [result, setResult] = useState("");
  const [scannedBarcodes, setScannedBarcodes] = useState([]);
  const [uniqueBarcodes, setUniqueBarcodes] = useState(new Set());

  // Define a ref for the video element
  const videoRef = useRef(null);

  // Create a new state variable to hold the items
  const [items, setItems] = useState([]);

  // Create a new state variable to hold the scanned items
  const [scannedItems, setScannedItems] = useState([]);

  // Fetch the items when the component mounts
  useEffect(() => {
    fetch("http://localhost:3000/kits")
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      });
  }, []);

  // Use the useZxing hook to handle barcode scanning
  const { ref } = useZxing({
    onDecodeResult(result) {
      const barcode = result.getText();
      setResult(barcode);
      setScannedBarcodes((prevBarcodes) => [...prevBarcodes, barcode]);
      const item = items.find((item) => item.barcode === barcode);
      console.log("Found item:", item);
      if (item && !scannedItems.includes(item)) {
        setScannedItems((prevItems) => [...prevItems, item]);
      }
      console.log("Scanned items:", scannedItems);
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    },
    // If an error occurs during scanning, log it to the console
    onError(error) {
      console.error(error);
    },
  });

  // Define a function to start the scan
  const startScan = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        })
        .catch((err) => console.error(err));
    }
  };

  // Define a function to stop the scan
  const stopScan = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  useEffect(() => {
    if (ref.current) {
      videoRef.current = ref.current;
    }
  }, [ref]);

  useEffect(() => {
    // When a new barcode is scanned, add it to the uniqueBarcodes Set
    setUniqueBarcodes((prevBarcodes) => {
      const newBarcodes = new Set(prevBarcodes);
      scannedBarcodes.forEach((barcode) => newBarcodes.add(barcode));
      return newBarcodes;
    });
  }, [scannedBarcodes]);

  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <VStack
      spacing={5}
      flex={1}
      overflowY="auto"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Text mt="1.25em" fontSize="xl" align="center">
        Let's add your kit(s) into your collection
      </Text>
      <Box as="video" ref={ref} w="80%" borderRadius={10} />
      <HStack>
        <Button colorScheme="teal" onClick={startScan}>
          Start Scan
        </Button>
        <Button colorScheme="red" onClick={stopScan}>
          Stop Scan
        </Button>
      </HStack>

      <Box display="flex" flexDirection="column" alignItems="center">
        <Text mb="1em">Last result:</Text>
        <Text>{result}</Text>
      </Box>

      <Box display="flex" flexDirection="column" alignItems="center">
        <Text mb="1em">Scanned barcodes:</Text>
        <List spacing={1}>
          {Array.from(uniqueBarcodes).map((barcode, index) => (
            <ListItem key={index}>{barcode}</ListItem>
          ))}
        </List>
      </Box>

      <Box display="flex" flexDirection="column" alignItems="center">
        <Text mb="1em">Scanned items:</Text>
        <List spacing={1} mb="1em">
          {scannedItems.map((item, index) => (
            <ListItem key={index}>{item.name}</ListItem>
          ))}
        </List>
      </Box>
    </VStack>
  );
}
