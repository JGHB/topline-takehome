import React from "react";
import { ImageData } from "../../types";
import { useNavigate } from "react-router-dom";
import styles from "./ImageDetails.module.css";

interface ImageDetailsProps {
  imageDetails: ImageData | null;
  tags: string[];
  returnUrl: string | null;
}

const ImageDetails: React.FC<ImageDetailsProps> = ({
  imageDetails,
  tags,
  returnUrl,
}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.imageDetailsContainer}>
      {returnUrl ? (
        <button
          className={styles.backButton}
          onClick={() => navigate(returnUrl)}
        >
          Go Back
        </button>
      ) : (
        <button className={styles.backButton} onClick={() => navigate("/")}>
          Go Home
        </button>
      )}
      {imageDetails && (
        <div className={styles.imageDetailsContainer}>
          <img src={imageDetails?.webformatURL} />
          <div className={styles.imageInfo}>
            <div className={styles.infoBlock}>
              <h4>User: {imageDetails?.user}</h4>
              <img src={imageDetails?.userImageURL} />
            </div>
            <div className={styles.infoBlock}>
              <h3>Tags:</h3>
              <div className={styles.tagsContainer}>
                {tags.map((tag) => (
                  <div className={styles.tag}>{tag}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageDetails;
