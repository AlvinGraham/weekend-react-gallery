import "./AddPhoto.css";
import { postPhoto } from "../../galleryApi/gallery.api";
import { useState } from "react";

export default function AddPhoto({ refreshGalleryCallback }) {
  // initialize state variables
  const [showForm, setShowForm] = useState(false);
  const [titleInputValue, setTitleInputValue] = useState("");
  const [descInputValue, setDescInputValue] = useState("");
  const [urlInputValue, setUrlInputValue] = useState("");

  // component functions
  const changeStateBtnClkHandler = (event) => {
    event.preventDefault();
    const formEle = event.target.parentElement;
    // const newForm = !showForm;
    setShowForm(!showForm);
    formEle.classList.toggle("show-form");
    // console.log("newForm", newForm, "\nformEle", formEle);
    // console.log("form classList", formEle.classList);
  }; //end AddPhoto()

  const formSubmitHandler = (event) => {
    event.preventDefault();
    console.log("In submit handler");

    // data validation

    //assemble data payload
    const photoData = {
      title: titleInputValue,
      description: descInputValue,
      url: urlInputValue,
    };

    //console.log("photoData:", photoData);
    // axios POST
    postPhoto(photoData)
      .then((response) => {
        refreshGalleryCallback();
        setTitleInputValue("");
        setDescInputValue("");
        setUrlInputValue("");
      })
      .catch((err) => {
        console.error("ERROR in client POST Route:", err);
      });
  }; // end formSubmitHandler()

  return (
    <div className="add-form">
      <button
        id="showFormButton"
        onClick={changeStateBtnClkHandler}>
        Change State Button
      </button>
      {showForm ? <h3>Current State TRUE</h3> : <h3>Current State FALSE</h3>}
      {showForm && (
        <form onSubmit={formSubmitHandler}>
          <h2>Add a Photo</h2>
          <label htmlFor="titleInput">
            Photo Title:
            <input
              id="titleInput"
              type="text"
              onChange={(event) => setTitleInputValue(event.target.value)}
              value={titleInputValue}
              required
            />
          </label>
          <label htmlFor="descInput">
            Description:
            <input
              id="descInput"
              type="text"
              onChange={(event) => setDescInputValue(event.target.value)}
              value={descInputValue}
            />
          </label>
          <label htmlFor="urlInput">
            Photo Location (URL only):
            <input
              id="urlInput"
              type="url"
              onChange={(event) => setUrlInputValue(event.target.value)}
              value={urlInputValue}
              required
            />
          </label>
          <button type="submit">Submit Photo</button>
        </form>
      )}
    </div>
  );
}
