import axios from "axios";

export const getGallery = () => {
  return axios.get("/api/gallery");
};

export const putGalleryLike = (galleryItemID) => {
  return axios.put(`/api/gallery/like/${galleryItemID}`);
};
