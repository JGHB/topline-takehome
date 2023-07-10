import { useState, useEffect } from "react";
import ImageSearch from "../components/ImageSearch/ImageSearch";
import { fetchResults } from "../services/PixabayService";
import { ImageData } from "../types";
import { useLocation, useNavigate } from "react-router-dom";

const ImageSearchContainer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [imageResults, setImageResults] = useState<ImageData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [resultsQuery, setResultsQuery] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const [displayErrorMessage, setDisplayErrorMessage] =
    useState<boolean>(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const pageParam = Number(urlParams.get("page"));
    const resultsQueryParam = urlParams.get("q");

    if (resultsQueryParam && !initialLoad) {
      setResultsQuery(resultsQueryParam.replace(/\+/g, " "));
      if (pageParam) {
        setPage(pageParam);
      }
      handleGetResults(resultsQueryParam, pageParam || 1);
      setInitialLoad(true);
      console.log("I WAS HERE");
    }
  }, [location.search]);

  const handleGetResults = async (input: string, increment: number) => {
    const results = await fetchResults(input, page + increment);
    setImageResults(results);
    setPage(page + increment);
    navigate(`/search/?q=${input}&page=${page + increment}`);
  };

  const formatStringForApiCall = (input: string) => {
    const formattedString = input.replace(/\s+/g, "+");
    return formattedString;
  };

  const handleSearch = async (input: string) => {
    if (input.length === 0) {
      setDisplayErrorMessage(true);
      return;
    }
    const formattedString = formatStringForApiCall(input);
    handleGetResults(formattedString, -page + 1);
    setResultsQuery(searchQuery);
    setSearchQuery("");
    setDisplayErrorMessage(false);
    setInitialLoad(true);
  };

  return (
    <ImageSearch
      handleSearch={handleSearch}
      imageResults={imageResults}
      setSearchQuery={setSearchQuery}
      searchQuery={searchQuery}
      page={page}
      resultsQuery={resultsQuery}
      formattedResultsQuery={formatStringForApiCall(resultsQuery)}
      handleGetResults={handleGetResults}
      displayErrorMessage={displayErrorMessage}
    />
  );
};

export default ImageSearchContainer;
