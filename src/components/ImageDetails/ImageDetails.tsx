import React from "react";
import { ImageData } from "../../types";
import { useNavigate } from "react-router-dom";

interface ImageDetailsProps {
  imageDetails: ImageData | null;
}

const ImageDetails: React.FC<ImageDetailsProps> = ({ imageDetails }) => {
  const navigate = useNavigate();

  return (
    <div>
      {imageDetails && (
        <div>
          <img src={imageDetails?.webformatURL} />
          <div>
            <h3>User:</h3>
            {imageDetails?.user}
            <img src={imageDetails?.userImageURL} />
            tags: {imageDetails?.tags}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageDetails;
