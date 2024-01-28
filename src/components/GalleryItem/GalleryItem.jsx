export default function GalleryItem({ galleryData, galleryRefreshCallback }) {
  return (
    <div data-testid="galleryItem">
      <img
        src={galleryData.url}
        width="150px"
        height="150px"
      />
    </div>
  );
}
