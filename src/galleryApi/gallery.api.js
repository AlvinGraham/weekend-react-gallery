import axios from "axios";

export const getGallery = () => {
  return axios.get("/api/gallery");
};

export const putGalleryLike = (galleryItemID) => {
  return axios.put(`/api/gallery/like/${galleryItemID}`);
};

export const postPhoto = (photoItem) => {
  return axios.post("/api/gallery", photoItem);
};

export const deletePhoto = (id) => {
  return axios.delete(`/api/gallery/${id}`);
};
