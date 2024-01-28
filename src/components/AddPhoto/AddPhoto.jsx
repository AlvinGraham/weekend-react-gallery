import "./AddPhoto.css";

import { useState } from "react";

export default function AddPhoto() {
  // initialize state variables
  const [showForm, setShowForm] = useState(false);

  // component functions
  const changeStateBtnClkHandler = () => {
    event.preventDefault();
    const formEle = event.target.parentElement;
    // const newForm = !showForm;
    setShowForm(!showForm);
    formEle.classList.toggle("show-form");
    // console.log("newForm", newForm, "\nformEle", formEle);
    // console.log("form classList", formEle.classList);
  };

  return (
    <div className="add-form">
      <button
        id="showFormButton"
        onClick={changeStateBtnClkHandler}>
        Change State Button
      </button>
      {showForm ? <h3>Current State TRUE</h3> : <h3>Current State FALSE</h3>}
      {showForm && (
        <form>
          <h2>Add a Photo</h2>
          <label>
            Photo Title:<input type="text"></input>
          </label>
          <label>
            Description:<input type="text"></input>
          </label>
          <label>
            Photo Location (URL only):<input type="url"></input>
          </label>
        </form>
      )}
    </div>
  );
}
