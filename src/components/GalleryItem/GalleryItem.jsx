import { useState, useEffect } from "react";
import "./GalleryItem.css";
import { putGalleryLike } from "../../galleryApi/gallery.api";

export default function GalleryItem({ galleryData, refreshGalleryCallback }) {
  // initialize state variables
  const [showImage, setShowImage] = useState(true);

  // Component Functions
  const likeBtnClkHandler = (id) => {
    putGalleryLike(id)
      .then((response) => {
        refreshGalleryCallback();
      })
      .catch((err) => {
        console.error("ERROR in client PUT Route:", err);
      });
  };

  const imageToggleHandler = () => {
    // useEffect(() => {
    //   setShowImage(!showImage);
    // }, [showImage, setShowImage]);
    const newImageState = !showImage;
    setShowImage(!showImage);

    console.log("showImage:", newImageState);
  };

  return (
    <div
      data-testid="galleryItem"
      className="gallery-card">
      <p>{galleryData.title}</p>
      {showImage ? (
        <img
          src={galleryData.url}
          width="150px"
          height="150px"
          onClick={imageToggleHandler}
        />
      ) : (
        <p
          onClick={imageToggleHandler}
          data-testid="description">
          {galleryData.description}
        </p>
      )}
      <button
        onClick={(event) => {
          event.preventDefault();
          likeBtnClkHandler(galleryData.id);
        }}
        data-testid="like">
        Click to Like!
      </button>
      <p>{galleryData.likes} people like this</p>
    </div>
  );
}
