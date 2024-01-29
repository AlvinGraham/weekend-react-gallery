import { useState, useEffect } from "react";
import "./GalleryItem.css";
import { putGalleryLike, deletePhoto } from "../../galleryApi/gallery.api";

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
  }; // end likeBtnClkHandler

  const imageToggleHandler = () => {
    // useEffect(() => {
    //   setShowImage(!showImage);
    // }, [showImage, setShowImage]);
    const newImageState = !showImage;
    setShowImage(!showImage);

    console.log("showImage:", newImageState);
  }; // end imageToggleHandler()

  const delBtnClkHandler = (id) => {
    deletePhoto(id)
      .then((response) => {
        refreshGalleryCallback();
      })
      .catch((err) => {
        console.error("ERROR in client DELETE Route:", err);
      });
  }; // end delBtnClkHandler()

  return (
    <div
      data-testid="galleryItem"
      className="gallery-card">
      <p>{galleryData.title}</p>
      <button
        className="delBtn"
        onClick={(event) => {
          event.preventDefault();
          delBtnClkHandler(galleryData.id);
        }}>
        Delete
      </button>
      <div
        onClick={imageToggleHandler}
        data-testid="toggle">
        {showImage ? (
          <img src={galleryData.url} />
        ) : (
          <p className="descPara">{galleryData.description}</p>
        )}
      </div>
      <button
        onClick={(event) => {
          event.preventDefault();
          likeBtnClkHandler(galleryData.id);
        }}
        data-testid="like">
        Click to Like!
      </button>
      <p>
        {galleryData.likes}{" "}
        {galleryData.likes === 0 || galleryData.likes > 1 ? (
          <span>people</span>
        ) : (
          <span>person</span>
        )}{" "}
        {galleryData.likes === 1 ? <span>likes</span> : <span>like</span>} this
      </p>
    </div>
  );
}
