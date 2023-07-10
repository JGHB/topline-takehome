import React from "react";
import { ImageData } from "../../types";
import { useNavigate } from "react-router-dom";
import styles from "./ImageDetails.module.css";

interface ImageDetailsProps {
  imageDetails: ImageData | null;
  tags: string[];
}

const ImageDetails: React.FC<ImageDetailsProps> = ({ imageDetails, tags }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.imageDetailsContainer}>
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
