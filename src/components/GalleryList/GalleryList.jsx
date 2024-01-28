import { useState, useEffect } from "react";
import { getGallery } from "../../galleryApi/gallery.api";

export default function GalleryList() {
  // declare state variables
  const [galleryItems, setGalleryItems] = useState([]);

  // Component Functions
  const refreshGallery = () => {
    getGallery()
      .then((response) => {
        console.log("Retrieved data:");
        console.table(response.data);
        setGalleryItems(response.data);
      })
      .catch((err) => {
        console.err("ERROR in client GET Route:", err);
      });
  }; // end refreshGallery

  // initial data load
  useEffect(() => {
    refreshGallery();
  }, []);

  return (
    <div data-testid="galleryList">
      <p>The gallery goes here!</p>
      {/* <img src="images/goat_small.jpg" />
      <img
        src="images/DwarfRanger.jpg"
        width="100px"
        height="100px"
      /> */}
    </div>
  );
}