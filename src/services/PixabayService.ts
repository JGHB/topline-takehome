import axios from "axios";

const url = `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXELBAY_KEY}`;

export const fetchResults = async (searchQuery: string, page: number) => {
  try {
    const response = await axios.get(url, {
      params: {
        q: searchQuery,
        page: page,
      },
    });

    if (response.status === 200) {
      return response.data.hits;
    }
  } catch (error) {
    console.error("Failed to get image search results", error);
  }

  return [];
};

export const fetchResultDetails = async (
  id: string,
  searchQuery?: string,
  page?: number,
) => {
  try {
    const response = await axios.get(url, {
      params: {
        id: id,
      },
    });

    if (response.status === 200) {
      return response.data.hits[0];
    }
  } catch {}
  return null;
};
