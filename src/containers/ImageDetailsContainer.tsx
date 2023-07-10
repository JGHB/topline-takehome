import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchResultDetails } from "../services/PixabayService";
import { ImageData } from "../types";
import ImageDetails from "../components/ImageDetails/ImageDetails";

const ImageDetailsContainer = () => {
  const [imageDetails, setImageDetails] = useState<ImageData | null>(null);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const setDetails = async () => {
      if (id) {
        const imageData: ImageData = await fetchResultDetails(id);
        setImageDetails(imageData);
      }
    };
    setDetails();
  });

  return <ImageDetails imageDetails={imageDetails} />;
};

export default ImageDetailsContainer;
