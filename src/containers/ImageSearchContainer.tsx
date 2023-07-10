import { useState } from "react";
import ImageSearch from "../components/ImageSearch/ImageSearch";
import { fetchResults } from "../services/PixabayService";
import { ImageData } from "../types";

const ImageSearchContainer = () => {
  const [imageResults, setImageResults] = useState<ImageData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [resultsQuery, setResultsQuery] = useState<string>("");
  const [page, setPage] = useState<number>(0);

  const handleGetResults = async (input: string, increment: number) => {
    const results = await fetchResults(input, page + increment);
    setImageResults(results);
    setPage(page + increment);
  };

  const formatStringForApiCall = (input: string) => {
    const formattedString = input.replace(/\s+/g, "+");
    return formattedString;
  };

  const handleSearch = async (input: string) => {
    const formattedString = formatStringForApiCall(input);
    handleGetResults(formattedString, -page + 1);
    setResultsQuery(searchQuery);
    setSearchQuery("");
  };

  return (
    <ImageSearch
      handleSearch={handleSearch}
      imageResults={imageResults}
      setSearchQuery={setSearchQuery}
      searchQuery={searchQuery}
      page={page}
      resultsQuery={resultsQuery}
      handleGetResults={handleGetResults}
    />
  );
};

export default ImageSearchContainer;
