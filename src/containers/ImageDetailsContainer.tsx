import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchResultDetails } from "../services/PixabayService";
import { ImageData } from "../types";
import ImageDetails from "../components/ImageDetails/ImageDetails";

const ImageDetailsContainer = () => {
  const [imageDetails, setImageDetails] = useState<ImageData | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [returnUrl, setReturnUrl] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();
  const { q } = useParams<{ q: string }>();
  const { page } = useParams<{ page: string }>();

  useEffect(() => {
    const setDetails = async () => {
      if (id) {
        const imageData: ImageData = await fetchResultDetails(id);
        setImageDetails(imageData);
      }
      if (q && page) {
        setReturnUrl(`/search/?q=${q}&page=${page}`);
      }
    };
    setDetails();
  }, [id, q, page]);

  useEffect(() => {
    const stringToList = (str: string) => {
      const values = str.trim().split(", ");
      return values;
    };
    if (imageDetails) {
      setTags(stringToList(imageDetails.tags));
    }
  }, [imageDetails]);

  return (
    <ImageDetails
      imageDetails={imageDetails}
      tags={tags}
      returnUrl={returnUrl}
    />
  );
};

export default ImageDetailsContainer;
