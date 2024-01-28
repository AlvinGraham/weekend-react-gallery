import { useState } from "react";
import "./GalleryItem.css";

export default function GalleryItem({ galleryData, galleryRefreshCallback }) {
  // initialize state variables
  const [showImage, setShowImage] = useState(true);

  return (
    <div
      data-testid="galleryItem"
      className="gallery-card">
      <p>{galleryData.title}</p>
      <img
        src={galleryData.url}
        width="150px"
        height="150px"
      />

      <button>Click to Like!</button>
      <p>{galleryData.likes} people like this</p>
    </div>
  );
}
