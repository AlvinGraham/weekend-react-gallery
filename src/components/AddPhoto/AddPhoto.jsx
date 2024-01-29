import "./AddPhoto.css";
import { postPhoto, postPhotoFile } from "../../galleryApi/gallery.api";
import { useState } from "react";

export default function AddPhoto({ refreshGalleryCallback }) {
  // initialize state variables
  const [showForm, setShowForm] = useState(false);
  const [titleInputValue, setTitleInputValue] = useState("");
  const [descInputValue, setDescInputValue] = useState("");
  const [urlInputValue, setUrlInputValue] = useState("");
  const [fileInputValue, setFileInputValue] = useState("");

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

    // data validation (implicit in hmtl code)

    //assemble data payload
    const photoData = {
      title: titleInputValue,
      description: descInputValue,
      url: urlInputValue,
    };

    // upload photo
    const fileInputEle = document.getElementById("fileInput");
    if (fileInputValue) {
      console.log("fileInputElement:", fileInputEle);
      console.log("file:", fileInputEle.files[0]);

      const form = new FormData();
      form.append("photoFile", fileInputEle.files[0]);

      postPhotoFile(form)
        .then((result) => {
          console.log("File sent to server for upload");
        })
        .catch((err) => {
          console.error("ERROR uploading file:", err);
        });
    }

    // axios POST
    postPhoto(photoData)
      .then((response) => {
        refreshGalleryCallback();
        setTitleInputValue("");
        setDescInputValue("");
        setUrlInputValue("");
        setFileInputValue("");
      })
      .catch((err) => {
        console.error("ERROR in client POST Route:", err);
      });
  }; // end formSubmitHandler()

  const resetBtnClkHandler = (event) => {
    event.preventDefault();
    setTitleInputValue("");
    setDescInputValue("");
    setUrlInputValue("");
    setFileInputValue("");
  };

  return (
    <div className="add-form">
      {showForm ? (
        <button
          className="showFormButton"
          onClick={changeStateBtnClkHandler}>
          Click Me to Hide Photo Form
        </button>
      ) : (
        <button
          className="showFormButton"
          onClick={changeStateBtnClkHandler}>
          Click Me to Add New Photo
        </button>
      )}
      {/* {showForm ? <h3>Current State TRUE</h3> : <h3>Current State FALSE</h3>} */}
      {showForm && (
        <form
          onSubmit={formSubmitHandler}
          action="/api/gallery/upload"
          method="post"
          encType="multipart/form-data">
          <h2>Add a Photo</h2>
          <div className="form-field">
            <div className="left">
              <label htmlFor="titleInput">Photo Title:</label>
              <input
                id="titleInput"
                type="text"
                onChange={(event) => setTitleInputValue(event.target.value)}
                value={titleInputValue}
                placeholder="Enter photo title here..."
                required
              />
              <label htmlFor="fileInput">Upload File:</label>
              <input
                id="fileInput"
                type="file"
                name="photoFile"
                onChange={(event) => {
                  console.log("fileInputEle:", event.target.files[0].name);
                  setUrlInputValue(`./images/${event.target.files[0].name}`);
                  setFileInputValue(event.target.value);
                }}
                value={fileInputValue}
                // onChange={(event) => setUrlInputValue(event.target.value)}
                // value={urlInputValue}
              />
              <label htmlFor="urlInput">Photo Location (URL only):</label>
              <input
                id="urlInput"
                type="text"
                onChange={(event) => setUrlInputValue(event.target.value)}
                value={urlInputValue}
                placeholder="Enter Local or Web URL here..."
                required
              />
            </div>
            <div className="center">
              <label htmlFor="descInput">Description:</label>
              <textarea
                id="descInput"
                type="text"
                onChange={(event) => setDescInputValue(event.target.value)}
                placeholder="Enter photo description here..."
                value={descInputValue}
              />
            </div>
            <div className="right">
              <button type="submit">Submit Photo</button>
              <button onClick={resetBtnClkHandler}>Reset Form</button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
