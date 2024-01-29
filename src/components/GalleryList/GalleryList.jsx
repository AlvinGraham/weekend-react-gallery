import GalleryItem from "../GalleryItem/GalleryItem";
import "./GalleryList.css";
import Grid from "@mui/material/Grid";

export default function GalleryList({ galleryItems, refreshGalleryCallback }) {
  return (
    <div
      data-testid="galleryList"
      className="gallery-div">
      <h2>PHOTO GALLERY</h2>
      <Grid
        container
        spacing={2}>
        {galleryItems.map((galleryListItem) => {
          return (
            <Grid
              item
              key={galleryListItem.id}>
              <GalleryItem
                galleryData={galleryListItem}
                refreshGalleryCallback={refreshGalleryCallback}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
