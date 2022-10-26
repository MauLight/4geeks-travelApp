import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// import { FaFacebookSquare, FaTwitter, FaInstagramSquare } from "react-icons/fa";
import "../../styles/formmedia.css";
import { Context } from "../store/appContext";

const PhotosAccount = () => {
 
  const [gallery, setGallery] = useState(null);
  const [title, setTitle] = useState("");
  const [active, setActive] = useState(true);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState(null);

  useEffect(() => {


  const handleSubmit = (e) => {
    e.preventDefault();

    if (image !== null) {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("active", active);
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
        `${process.env.BACKEND_URL}/api/galleries`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      if (data.length > 0) {
        getImagesGallery(filter);
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

  const handleChangeActive = async (id, status) => {
    console.log(status);
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/galleries/${id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            active: status,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.id) {
        getImagesGallery(filter);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
      <div className="form-two">
        <div className="maincontainer col-10">
          <h1>CREATE YOUR ACCOUNT</h1>
          <div className="row horrible d-flex-inline">
            <div className="container-photos col-6">
              <div className="row photos">
                <h5 className="">User Picture</h5>
              </div>
              <div className="row cards">
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
                          <div className="card-body">
                            <p className="card-text text-center text-primary">
                              {image.title}
                            </p>
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="imageActive"
                                checked={image.active ? "checked" : ""}
                                onChange={() =>
                                  handleChangeActive(image.id, !image.active)
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="imageActive"
                              >
                                {image.active ? "active" : "inactive"}
                              </label>
                            </div>
                          </div>
                          <span
                            className={
                              "position-absolute top-0 start-100 translate-middle badge rounded-pill " +
                              (image.active ? "bg-success" : "bg-danger")
                            }
                          >
                            {image.active ? "active" : "inactive"}
                            <span className="visually-hidden">
                              Image Status
                            </span>
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="row chosen">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
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
                    <button className="btn btn-secondary btn-sm gap-2">
                      Upload images
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {/* FOTOGRAFIA PERFIL USUARIO */}
            <div className="user-picture col-4">
              <div className="row">
                {
                  !!picture &&
                  picture.map((image, index) => {
                    return (
                      <div className="col-md-4" key={index}>
                        <div className="card position-relative my-3">
                          <img src={image.filename} className="card-img-top" alt="..." />
                          <div className="card-body">
                            <p className="card-text text-center text-primary">{image.title}</p>

                            <div className="form-check form-switch">
                              <input className="form-check-input" type="checkbox" role="switch" id="imageActive"
                                checked={(image.active ? "checked" : "")}
                                onChange={() => handleChangeActive(image.id, !image.active)} />
                              <label className="form-check-label" htmlFor="imageActive">{image.active ? "active" : "inactive"}
                              </label>
                            </div>

                          </div>
                          <span className={"position-absolute top-0 start-100 translate-middle badge rounded-pill " + (image.active ? "bg-success" : "bg-danger")}>
                            {image.active ? "active" : "inactive"}
                            <span className="visually-hidden">Image Status</span>
                          </span>
                        </div>
                      </div>
                 );
                })}
              </div>
            </div>
          </div>
        </div>
        {/* <input
            className="btn-submit btn-primary col-3"
            type="submit"
            value="Submit"
          ></input> */}
      </div>
  );
})}
export default PhotosAccount;
