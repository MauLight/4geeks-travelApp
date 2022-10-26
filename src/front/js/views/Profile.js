import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import ReactDOM from "react-dom";
import { Context } from "../store/appContext";
import { FaStar } from "react-icons/fa";

const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);

  const [image, setImage] = useState(null);

  const [error, setError] = useState(null);
  const [filter, setFilter] = useState(null);
  const { store, actions } = useContext(Context);
  const id = store.id;

  useEffect(() => {
    getImageUser(filter);
  }, []);
  useEffect(() => {
    getImageUser(filter);
  }, []);
  const getImageUser = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/userpictures/${id}`
      );
      const data = await response.json();

      setProfileImage(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (image !== null) {
      const formData = new FormData();

      formData.append("user_id", id);
      for (let i = 0; i < image.length; i++) {
        formData.append("images", image[i]);
      }

      console.log(formData);

      uploadImage(formData);

      setError(null);
      e.target.reset();
    } else {
      setError("Please, complete the form");
    }
  };

  const uploadImage = async (formData) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/userpictures/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      const data = await response.json();

      if (data.length > 0) {
        getImageUser(filter);
        setImage(null);
        setError(null);
      } else {
        setError("Error uploading image");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-6">
            <div className="card" style={{ width: "100%" }}>
              <div className="card-body">
                <div className="" style={{ width: "35%" }}>
                  <img
                    src=""
                    className="rounded-circle img-fluid mt-5 justify-content-center"
                    alt="..."
                  />
                </div>
                <h5 className="card-title text-center mt-2">
                  <strong>UserName</strong>
                </h5>
                <FaStar />
                <div
                  className="bg-light text-dark bg-opacity-50 p-3"
                  style={{ width: "80%" }}
                >
                  <ul>
                    <li>`Gender: ${store.gender}` </li>
                    <li>`Native Languaje: ${store.languaje}` </li>
                    <li>`Country of residence: {store.countryOfResidence}`</li>
                    <li>`Instagram: {store.instagram}`</li>
                    <li>`Facebook: {store.facebook}`</li>
                    <li>`Twitter: {store.twitter}`</li>
                  </ul>
                </div>
                <a href="#" className="card-link">
                  Card link
                </a>
                <a href="#" className="card-link">
                  Another link
                </a>
              </div>
            </div>
          </div>

          <div className="col-6">One of three columns</div>
        </div>
      </div>
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            Upload Image File
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          {!!error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <div className="py-3">Please fill form to upload image.</div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                File
              </label>
              <input
                type="file"
                className="form-control"
                id="image"
                name="image"
                onChange={(e) => setImage(e.target.files)}
                multiple
              />
            </div>
            <div className="d-grid">
              <button className="btn btn-primary btn-sm gap-2">Upload</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Profile;
