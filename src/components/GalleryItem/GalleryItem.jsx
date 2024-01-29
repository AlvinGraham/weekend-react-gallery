import { useState, useEffect } from "react";
import "./GalleryItem.css";
import { putGalleryLike, deletePhoto } from "../../galleryApi/gallery.api";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { red, grey } from "@mui/material/colors";
import Button from "@mui/material/Button";

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
      <DeleteForeverIcon
        fontSize="small"
        onClick={(event) => {
          event.preventDefault();
          delBtnClkHandler(galleryData.id);
        }}
        className="delBtn"
      />

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
        className="likeBtn"
        data-testid="like">
        Click to Like!{" "}
        <FavoriteIcon sx={{ fontSize: 10, color: red["A700"] }} />
      </button>
      <p className="likePara">
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
