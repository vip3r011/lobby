import React, { useState, useEffect } from "react";
import "fontsource-inter/500.css";
import ReactDOM from "react-dom";
import theme from "./theme";
import {
  ChakraProvider,
  extendTheme,
  Container,
  Image,
  Flex,
  Tag,
  Grid,
  GridItem,
  Button,
  HStack,
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb
} from "@chakra-ui/react";

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPageSlider, setCurrentPageSlider] = useState(0);
  const [isClickable, setIsClickable] = useState(true);
  const [balance, setBalance] = useState(0); // New state for balance data

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/")
      .then((res) => res.json())
      .then((res) =>
        res.map((item, index) => ({
          ...item,
          imageUrl: `https://via.placeholder.com/256x256?text=Image${index + 1}`
        }))
      )
      .then((res) => setData(res));

    fetch("https://jsonplaceholder.typicode.com/balance/") // Assuming the JSON data for balance is stored in a separate endpoint
      .then((res) => res.json())
      .then((res) => setBalance(100.0));
  }, []);

  const totalPages = Math.ceil(data.length / 8);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  const handleSliderChange = (value) => {
    setCurrentPageSlider(value);
  };

  const handleSliderAfterChange = (value) => {
    setCurrentPage(value);
  };

  const getPageData = () => {
    const startIndex = currentPage * 8;
    return data.slice(startIndex, startIndex + 8);
  };

  const handleClickImage = (imageUrl) => {
    if (isClickable) {
      setIsClickable(false);
      setTimeout(() => {
        // Your custom click event here
        alert(`Clicked on Image: ${imageUrl}`);
        setIsClickable(true);
      }, 512); // Set the timeout to 1 second (1000 milliseconds)
    }
  };

  const sliderMax = totalPages - 1;

  return (
    <ChakraProvider theme={extendTheme(theme)}>
      <Container
        py={8}
        px={0}
        maxW={{
          base: "100%",
          sm: "35rem",
          md: "43.75rem",
          lg: "57.5rem",
          xl: "75rem",
          xxl: "87.5rem"
        }}
      >
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)"
          }}
          gap={4}
        >
          {getPageData().map((post, index) => (
            <GridItem key={index} colSpan={{ base: 1, sm: 1, md: 1 }}>
              <Flex
                height="100%" // Set a fixed height for the container
                justifyContent="center"
                alignItems="center"
                bg="transparent" // Make the background transparent
                rounded="md" // Apply a small border radius
                p={2}
                onClick={() => handleClickImage(post.imageUrl)} // Click handler for the image
                style={{ cursor: isClickable ? "pointer" : "default" }} // Change cursor based on clickability
              >
                <Image
                  src={post.imageUrl}
                  alt={`Image ${index + 1}`}
                  fallbackSrc="placeholder.png" // The placeholder image URL
                  boxSize="256px" // Set the box size for the image
                  objectFit="cover" // Make the image cover the box
                />
              </Flex>
            </GridItem>
          ))}
        </Grid>

        <HStack mt={4} justifyContent="center">
          <Button colorScheme="blue" onClick={handlePrevPage}>
            Prev
          </Button>
          {/*
          <Slider
            value={currentPageSlider}
            onChange={handleSliderChange}
            onChangeEnd={handleSliderAfterChange}
            aria-label="slider-pagination"
            colorScheme="blue"
            max={sliderMax}
            step={1}
            w={{ base: "100%", sm: "150px" }}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider> */}
          <Button colorScheme="blue" onClick={handleNextPage}>
            Next
          </Button>
        </HStack>

        {/* Balance Box */}
        <Box mt={4} textAlign="center" bg="transparent" p={4} rounded="md">
          <Tag colorScheme="green">Balance :</Tag> R{balance}
        </Box>
      </Container>
    </ChakraProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
