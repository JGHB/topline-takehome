import React from "react";
import { ImageData } from "../../types";
import { useNavigate } from "react-router-dom";
import styles from "./ImageSearch.module.css";

interface ImageSearchProps {
  handleSearch: (input: string) => void;
  imageResults: ImageData[];
  setSearchQuery: (newSearchQuery: string) => void;
  searchQuery: string;
  page: number;
  resultsQuery: string;
  handleGetResults: (input: string, increment: number) => void;
  formattedResultsQuery: string;
  displayErrorMessage: boolean;
}

const ImageSearch: React.FC<ImageSearchProps> = ({
  handleSearch,
  imageResults,
  setSearchQuery,
  searchQuery,
  page,
  resultsQuery,
  handleGetResults,
  formattedResultsQuery,
  displayErrorMessage,
}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.imageSearchContainer}>
      <h1 className={styles.title}>Pixabay Images</h1>
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
        className={styles.inputField}
      />
      {displayErrorMessage && (
        <span className={styles.errorMessage}>
          Please enter input before searching
        </span>
      )}
      <button
        onClick={() => handleSearch(searchQuery)}
        className={styles.searchButton}
      >
        Search
      </button>
      {resultsQuery && (
        <h2 className={styles.resultsTitle}>Results for: {resultsQuery}</h2>
      )}
      <div className={styles.resultsContainer}>
        {imageResults.map((result) => (
          <div
            key={result.id}
            onClick={() =>
              navigate(`/results/${result.id}/${formattedResultsQuery}/${page}`)
            }
            className={styles.result}
          >
            <img
              src={result.previewURL}
              alt={"Image" + result.id}
              className={styles.resultImage}
            />
          </div>
        ))}
      </div>
      <div className={styles.paginationContainer}>
        {page > 1 && (
          <button
            onClick={() => handleGetResults(resultsQuery, -1)}
            className={styles.paginationButton}
          >
            {"<"}
          </button>
        )}
        {page > 0 && (
          <button
            onClick={() => handleGetResults(resultsQuery, 1)}
            className={styles.paginationButton}
          >
            {">"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageSearch;
