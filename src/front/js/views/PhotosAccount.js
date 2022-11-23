import React, { useEffect, useState } from "react";
import portrait from "../../img/portrait.png";
import placeholder from "../../img/placeholder.png";

const PhotosAccount = () => {
  const [gallery, setGallery] = useState(null);
  const [photoUser, setPhotoUser] = useState(null);
  const [image, setImage] = useState(null);
  const [imageUser, setImageUser] = useState(null);

  const [error, setError] = useState(null);
  const [photoAlert, setPhotoAlert] = useState(false);
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
      const data = await response.json();

      if (data?.msg !== 'User with no photo!'){
       setPhotoUser(data); 
      }
      
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
      console.log("data", data)

      setGallery(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (image.length>=1 && image.length + gallery.length <=12 && image !== null) {
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
      console.log("esperandorespuesta data", data);

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
          mode: "cors",
          cache: "no-cache",
        }
      );

      if (response.status == 200) getImageUser();

    } catch (error) {
      setError("Error uploading image");
      console.log(error.message);
    }
  };

  const photosUploaded = (e) => {
    e.preventDefault();
    if (photoUser == null || gallery.length <8 || gallery.length > 12)  {
      setPhotoAlert(true);
    } 
       else {
      try {
        window.location = "/login";
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (

      <div className="full-account1 ">
        <h1 className="text-center">CREATE YOUR ACCOUNT</h1>
        <div className="container my-4">
          {/* inicio row photos usuario y viajes */}
          <div className="row mt-3">
            {/* inicio col usuario */}
            <div className="col-lg-4 col-12 mb-5 mx-auto">
              <h1 className="text-center">User's Picture</h1>
              <div className="" style={{textAlign:"center"}}>
              <button onClick={()=>setPhotoAlert(false)}
                className="btn-main"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasExample2"
                aria-controls="offcanvasExample2"
              >
                Upload 1
              </button>
              </div>
              <div className="alert text-center">
                Please select one profile photo
              </div>
              <div className="user-pic">
               
                  <div className="card rounded-circle m-auto">
                    <img
                      src={photoUser ? photoUser.filename : portrait}
                      className="card-user img-fluid rounded-circle"
                      key={photoUser ? photoUser.id: "a"}
                      alt="..."
                    />
                  </div>
               
              </div>
            </div>
            {/* final de columna usuario e inicio col viajes */}
            <div className="col-lg-6 col-12 mb-5 mx-auto">
              <h1 className="text-center">Travel's Photos</h1>
              <div className="" style={{textAlign:"center"}}>
              <button onClick={()=>setPhotoAlert(false)}
                className="btn-main"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasExample"
                aria-controls="offcanvasExample"
              >
                Upload
              </button>
              </div>
              <div className="alert text-center">
                Please select 12 travel's photos
              </div>

              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-2 g-lg-2">
                {gallery?.length > 0 ? (
                  gallery.map((image, index) => {
                    return (
                      <div className="card-ph" >
                        <img
                          src={image.filename}
                          className="card-photos" 
                          key={index}

                        />
                      </div>
                    );
                  })) : (<div className="card-ph" >
                  <img
                    src={placeholder}
                    className="card-photos" 
                    key={"x"}

                  />
                </div>)}
              </div>
            </div>
            {/* fin columna viajes */}
          </div>
          {/* fin row photos usuario y viajes */}
          <div className="row mx-auto">
            <div className="btn">
              <button onClick={(e) => photosUploaded(e)} className="btn-submit btn-primary" type="submit" value="Save">
                Submit
              </button>
              {photoAlert ? (
                <div className="message text-danger">
                  Please upload the photos required
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        
        {/* fin de container */}
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
              Please select maximum 12 photos of your travels or a minimun of 8
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
                <button className="btn-main  btn-sm gap-2">Upload</button>
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

            <div className="py-3">Please select a profile picture</div>
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
                <button className="btn-main btn-sm gap-2">Upload</button>
              </div>
            </form>
          </div>
        </div>
      </div>

  );
};

export default PhotosAccount;
