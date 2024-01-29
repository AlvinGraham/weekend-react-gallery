import GalleryItem from "../GalleryItem/GalleryItem";
import "./GalleryList.css";

export default function GalleryList({ galleryItems, refreshGalleryCallback }) {
  return (
    <div
      data-testid="galleryList"
      className="gallery-div">
      <h2>PHOTO GALLERY</h2>
      {galleryItems.map((galleryListItem) => {
        return (
          <GalleryItem
            key={galleryListItem.id}
            galleryData={galleryListItem}
            refreshGalleryCallback={refreshGalleryCallback}
          />
        );
      })}
    </div>
  );
}
