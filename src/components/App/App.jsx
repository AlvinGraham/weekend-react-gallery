import "./App.css";
import { useState, useEffect } from "react";
import { getGallery } from "../../galleryApi/gallery.api";
import GalleryList from "../GalleryList/GalleryList";
import Header from "../Header/Header";
import AddPhoto from "../AddPhoto/AddPhoto";

function App() {
  // declare state variables
  const [galleryItems, setGalleryItems] = useState([]);

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
    <div
      data-testid="app"
      className="app-div">
      <Header />
      <AddPhoto refreshGalleryCallback={refreshGallery} />
      <GalleryList
        refreshGalleryCallback={refreshGallery}
        galleryItems={galleryItems}
      />
    </div>
  );
}

export default App;
