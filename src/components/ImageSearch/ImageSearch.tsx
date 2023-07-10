import React from "react";
import { ImageData } from "../../types";
import { useNavigate } from "react-router-dom";

interface ImageSearchProps {
  handleSearch: (input: string) => void;
  imageResults: ImageData[];
  setSearchQuery: (newSearchQuery: string) => void;
  searchQuery: string;
  page: number;
  resultsQuery: string;
  handleGetResults: (input: string, increment: number) => void;
}

const ImageSearch: React.FC<ImageSearchProps> = ({
  handleSearch,
  imageResults,
  setSearchQuery,
  searchQuery,
  page,
  resultsQuery,
  handleGetResults,
}) => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Search for Images</h1>
      <input
        type="text"
        placeholder="Search Images"
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
      />
      <button onClick={() => handleSearch(searchQuery)}>Search</button>
      {resultsQuery && <h2>Results for {resultsQuery}</h2>}
      <ul>
        {imageResults.map((result) => (
          <li key={result.id}>
            <button onClick={() => navigate(`/${result.id}`)}>
              <img src={result.previewURL} alt={"Image" + result.id} />
            </button>
          </li>
        ))}
      </ul>
      <div>
        {page > 1 && (
          <button onClick={() => handleGetResults(resultsQuery, -1)}>
            {"<"}
          </button>
        )}
        {page > 0 && (
          <button onClick={() => handleGetResults(resultsQuery, 1)}>
            {">"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageSearch;
