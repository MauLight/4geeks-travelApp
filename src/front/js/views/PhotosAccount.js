import React, { useContext, useEffect, useState } from "react";

import { Context } from "../store/appContext";

const PhotosAccount = () => {
  const [gallery, setGallery] = useState(null);
  const [photoUser, setPhotoUser] = useState(null);
  const { store, actions } = useContext(Context);

  const [image, setImage] = useState(null);
  const [imageUser, setImageUser] = useState(null);

  const [error, setError] = useState(null);
  const user_id = store.currentUser.id;

  useEffect(() => {
    getImagesGallery();
    getImagesUser();
  }, []);

  useEffect(() => {
    getImagesGallery();
    getImagesUser();
  }, []);

  const getImagesGallery = async () => {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/galleries/${user_id}`
      );
      const data1 = await response.json();

      setGallery(data1);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getImagesUser = async () => {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/userpictures/${user_id}`
      );
      const data2 = await response.json();

      setPhotoUser(data2);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (image !== null) {
      const formData1 = new FormData();

      formData1.append("user_id", user_id);
      for (let i = 0; i < image.length; i++) {
        formData1.append("images", image[i]);
      }
      console.log(formData1);

      uploadImage(formData1);

      setError(null);
      e.target.reset();
    } else {
      setError("Please, complete the form");
    }
  };

  const uploadImage = async (formData1) => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/galleries`, {
        method: "POST",
        body: formData1,
      });

      const data = await response.json();

      if (data.length > 0) {
        getImagesGallery();
        setImage(null);
        setError(null);
      } else {
        setError("Error uploading image");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    if (imageUser !== null) {
      const formData2 = new FormData();
      formData2.append("user_id", user_id);
      formData.append("imageUser", imageUser);
      console.log(formData2);
      uploadImage2(formData2);
      setError(null);
      e.target.reset();
    } else {
      setError("Please, complete the form");
    }
  };

  const uploadImage2 = async (formData2) => {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/userpictures`,
        {
          method: "POST",
          body: formData2,
        }
      );

      const data = await response.json();

      if (data.length > 0) {
        getImagesUser();
        setTitle("");
        setActive(true);
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
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5">
            <h1 className="text-center">Gallery</h1>
            <button
              className="btn btn-primary"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasExample"
              aria-controls="offcanvasExample"
            >
              Upload Image
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 py-5">
            <h1 className="text-center">Gallery</h1>
            <button
              className="btn btn-primary"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasExample2"
              aria-controls="offcanvasExample2"
            >
              Upload Image User
            </button>
          </div>
        </div>
        <div className="row">
          {!!gallery &&
            gallery.map((image, index) => {
              return (
                <div className="col-md-4" key={index}>
                  <div className="card position-relative my-3">
                    <img
                      src={image.filename}
                      className="card-img-top"
                      alt="..."
                    />
                  </div>
                </div>
              );
            })}
        </div>
        <div className="row">
          {!!photoUser && (
            <div className="col-md-4" key={index}>
              <div className="card position-relative my-3">
                <img src={image.filename} className="card-img-top" alt="..." />
              </div>
            </div>
          )}
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
            Upload Images File
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

          <div className="py-3">Please fill form to upload images.</div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Travel's Photos
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
            <div className="mb-3">
              <label htmlFor="imageUser" className="form-label">
                User's Photo
              </label>
              <input
                type="file"
                className="form-control"
                id="imageUser"
                name="imageUser"
                onChange={(e) => setImageUser(e.target.files)}
                multiple
              />
            </div>
            <div className="d-grid">
              <button className="btn btn-primary btn-sm gap-2">Upload</button>
            </div>
          </form>
        </div>
      </div>
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample2"
        aria-labelledby="offcanvasExampleLabel2"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel2">
            Upload Images File
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

          <div className="py-3">Please fill form to upload images.</div>
          <form onSubmit={handleSubmit2}>
            <div className="mb-3">
              <label htmlFor="imageUser" className="form-label">
                User's Photo
              </label>
              <input
                type="file"
                className="form-control"
                id="imageUser"
                name="imageUser"
                onChange={(e) => setImageUser(e.target.files)}
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
export default PhotosAccount;
