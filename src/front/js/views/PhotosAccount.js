import React, { useEffect, useState } from "react";

const PhotosAccount = () => {
  const [gallery, setGallery] = useState(null);
  const [photoUser, setPhotoUser] = useState(null);
  const [image, setImage] = useState(null);
  const [imageUser, setImageUser] = useState(null);

  const [error, setError] = useState(null);
  const user_id = sessionStorage.getItem("id");
  console.log(user_id);

  useEffect(() => {
    if (typeof user_id !== "undefined" || user_id != null) {
      getImagesGallery();
      getImageUser();
    }
  }, []);

  console.log(photoUser);
  const getImageUser = async () => {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/userpictures/${user_id}`
      );
      console.log("ahora hay img", response)
      const data = await response.json();

      setPhotoUser(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getImagesGallery = async () => {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/galleries/${user_id}`
      );
      const data = await response.json();

      setGallery(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (image !== null) {
      console.log(image);
      const formData = new FormData();
      formData.append("user_id", user_id);
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
    console.log("uploadImage");
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/galleries`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);
      console.log("esperandorespuesta data");

      if (data.length > 0) {
        getImagesGallery();
        setImage(null);
        setError(null);
      }
    } catch (error) {
      console.log("catch error upload image");
      setError("Error uploading image");
      console.log(error.message);
    }
  };
  const handleSubmit2 = (e) => {
    e.preventDefault();

    if (imageUser !== null) {
      console.log("handlesubmit");
      const formData2 = new FormData();
      console.log(user_id);
      formData2.append("user_id", user_id);
      formData2.append("image", imageUser[0]);
      console.log(formData2);
      uploadImage2(formData2);
      setError(null);
      e.target.reset();
    } else {
      setError("Please, complete the form");
    }
  };
  const uploadImage2 = async (formData2) => {
    console.log("upload image");
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/userpictures`,
        {
          method: "POST",
          body: formData2,
          mode: 'cors',
          cache: 'no-cache',
        }
      );

      if (response.status == 200)
        getImageUser()

      // if (data.length > 0) {
      //   getImageUser();
      //   setImageUser(null);
      //   setError(null);
      // }
    } catch (error) {
      setError("Error uploading image");
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12 pb-5 ">
            <h1 className="text-center">User's Picture</h1>
            <div className="row-usuario">
              {photoUser ? (
                <div className="col-md-3 m-auto" key={photoUser.id}>
                  <div className="card position-relative rounded-circle">
                    <img
                      src={photoUser.filename}
                      className="card-user img-fluid img-thumbnail rounded-circle"
                      alt="..."
                    />
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <button
              className="btn-main btn-primary m-auto"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasExample2"
              aria-controls="offcanvasExample2"
            >
              Upload Picture
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center">Travel's Photos</h1>
          </div>
        </div>
        <div className="row-galeria d-flex">
          {!!gallery &&
            gallery.map((image, index) => {
              return (
                <div className="col-lg-4 col-md-6" key={index}>
                  <div className="card mx-2 rounded-3">
                    <img
                      src={image.filename}
                      className="card-photos img-fluid img-thumbnail rounded-3"
                      alt="..."
                    />
                  </div>
                </div>
              );
            })}
        </div>
        <button
          className="btn-main btn-primary"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample"
          aria-controls="offcanvasExample"
        >
          Upload Photos
        </button>
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
          <div className="py-3">
            Please select maximum 9 photos of your travels
          </div>
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
            <div className="d-grid">
              <button className="btn-main btn-primary btn-sm gap-2">Upload</button>
            </div>
          </form>
        </div>
      </div>
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasExample2"
        aria-labelledby="offcanvasExampleLabel2"
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
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <div className="py-3">Please select 1 picture of you</div>
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
              />
            </div>
            <div className="d-grid">
              <button className="btn-main btn-primary btn-sm gap-2">Upload</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PhotosAccount;
