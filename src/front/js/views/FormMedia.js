// import React, { useContext, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { FaFacebookSquare, FaTwitter, FaInstagramSquare } from "react-icons/fa";
// // import { Navbar } from "../component/navbar";
// import "../../styles/formmedia.css";
// import hubble from "../../img/hubble.png";
// import { Context } from "../store/appContext";

// const FormMedia = () => {
//   //   window.variables = {
//   // userface= [];
//   // userinsta= [];
//   // usertweet= []
//   // };

//   const [userface, setUserFace] = useState("");
//   const [userinsta, setUserInsta] = useState("");
//   const [usertweet, setUserTweet] = useState("");

//   // const { store, actions } = useContext(Context);

//   return (
//     <div className="form-two">
//       <h1>CREATE YOUR ACCOUNT</h1>
//       {/* <div className="row"> */}
//         <div className="maincontainer col-10 ">
//           <div className="row horrible d-flex-inline">
//             <div className="container-photos col-6">
//               <div className="row">
//                 <h5 className="">Photos</h5>
//               </div>

//               <div className="row">
//                 <div className="photo">
//                   <img className="mr-3 col-2" src={hubble} alt=""></img>
//                   <img className="mr-3 col-2" src={hubble} alt=""></img>
//                   <img className="mr-3 col-2" src={hubble} alt=""></img>
//                 </div>
//                 {/* <input accept="image/png,image/jpeg mr-3 col-2" type="file" /> */}
//               </div>
//               <div className="row">
//                 <div className="photo">
//                   <img className="mr-3 col-2" src={hubble} alt=""></img>
//                   <img className="mr-3 col-2" src={hubble} alt=""></img>
//                   <img className="mr-3 col-2" src={hubble} alt=""></img>
//                 </div>
//               </div>
//               <div className="row">
//                 <div className="photo">
//                   <img className="mr-3 col-2" src={hubble} alt=""></img>
//                   <img className="mr-3 col-2" src={hubble} alt=""></img>
//                   <img className="mr-3 col-2" src={hubble} alt=""></img>
//                 </div>
//               </div>
//               <div className="row">
//                 <input className="select-img" accept="image/png,image/jpeg mr-3" type="file" />
//               </div>
//             </div>
//             REDES SOCIALES
//             <div className="social-media col-4">
//               <div className="row">
//                 <h5>Social Media</h5>
//               </div>
//               {/* FACEBOOK */}
//               <div className="row">
//                 <div className="col ">
//                   <form
//                     className="media d-flex"
//                     onSubmit={(e) => {
//                       e.preventDefault();
//                       media(userface);
//                     }}
//                   >
//                     <a
//                       href={`https://facebook.com/${userface}`}
//                       target="_blank"
//                       value={userinsta}
//                       onChange={(e) => setUserInsta(e.target.value)}
//                     >
//                       <FaFacebookSquare className="icon" />
//                     </a>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="facebook"
//                       placeholder="user"
//                       value={userface}
//                       onChange={(e) => setUserFace(e.target.value)}
//                     />
//                   </form>
//                 </div>
//               </div>
//               {/* INSTAGRAM */}
//               <div className="row">
//                 <div className="col ">
//                   <form
//                     className="media d-flex"
//                     onSubmit={(e) => {
//                       e.preventDefault();
//                       media(userinsta);
//                     }}
//                   >
//                     <a
//                       href={`https://facebook.com/${userinsta}`}
//                       target="_blank"
//                       value={userinsta}
//                       onChange={(e) => setUserInsta(e.target.value)}
//                     >
//                       <FaInstagramSquare className="icon" />
//                     </a>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="instagram"
//                       placeholder="user"
//                       value={userinsta}
//                       onChange={(e) => setUserInsta(e.target.value)}
//                     />
//                   </form>
//                 </div>
//               </div>
//               {/* TWITTER */}
//               <div className="row">
//                 <div className="col ">
//                   <form
//                     className="media d-flex"
//                     onSubmit={(e) => {
//                       e.preventDefault();
//                       media(usertweet);
//                     }}
//                   >
//                     <a
//                       href={`https://facebook.com/${usertweet}`}
//                       target={usertweet}
//                     >
//                       <FaTwitter className="icon" />
//                     </a>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="twitter"
//                       placeholder="user"
//                       value={usertweet}
//                       onChange={(e) => setUserTweet(e.target.value)}
//                     />
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       {/* </div> */}

//       <input
//         className="btn-submit btn-primary col-3"
//         type="submit"
//         value="Submit"
//       ></input>
//     </div>
//   );
// };
// const media = (userface, userinsta, usertweet) => {
//   if (userface === "" && userinsta === "" && usertweet === "")
//     alert("Missing field");
// };

// export default FormMedia;

import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaFacebookSquare, FaTwitter, FaInstagramSquare } from "react-icons/fa";
// import { Navbar } from "../component/navbar";
import "../../styles/formmedia.css";
import hubble from "../../img/hubble.png";
import { Context } from "../store/appContext";

const FormMedia = () => {
  const [userface, setUserFace] = useState("");
  const [userinsta, setUserInsta] = useState("");
  const [usertweet, setUserTweet] = useState("");
  const [gallery, setGallery] = useState(null);

  const [title, setTitle] = useState("");
  const [active, setActive] = useState(true);
  const [image, setImage] = useState(null);

  const [error, setError] = useState(null);

  const [filter, setFilter] = useState(null);

  useEffect(() => {
    getImagesGallery(filter);
  }, []);

  useEffect(() => {
    getImagesGallery(filter);
  }, [filter]);

  const getImagesGallery = async (filter) => {
    try {
      let query =
        filter === null
          ? ""
          : filter === true
          ? "?active=true"
          : "?active=false"; // validando si filtramos o no el resultado

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/galleries${query}`
      );
      const data = await response.json();

      setGallery(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if ( image !== null) {    /*title !== ""&& */
      const formData = new FormData();

      // formData.append("title", title);
      // formData.append("active", active);
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
        `${process.env.REACT_APP_API_URL}/api/galleries`,
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
        `${process.env.REACT_APP_API_URL}/api/galleries/${id}`,
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
          <div className="col-md-12">
            <div className="form-group">
              <label className="mb-2">Filter:</label>
              <div className="col-md-12">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    checked={filter === null ? "checked" : ""}
                    onChange={() => setFilter(null)}
                  />
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    All
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    checked={filter === true ? "checked" : ""}
                    onChange={() => setFilter(true)}
                  />
                  <label className="form-check-label" htmlFor="inlineRadio2">
                    Active
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio3"
                    checked={filter === false ? "checked" : ""}
                    onChange={() => setFilter(false)}
                  />
                  <label className="form-check-label" htmlFor="inlineRadio3">
                    Inactive
                  </label>
                </div>
              </div>
            </div>
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
                      <span className="visually-hidden">Image Status</span>
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        {/* <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            Upload Image File
          </h5> */}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        {/* </div> */}
        <div className="offcanvas-body">
          {!!error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <div className="py-3">Please fill form to upload image.</div>
          <form onSubmit={handleSubmit}>
            {/* <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                placeholder="Insert Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div> */}
            {/* <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="radio"
                name="active"
                id="active_false"
                checked={!active ? "checked" : ""}
                onChange={(e) => setActive(!active)}
              />
              <label className="form-check-label" htmlFor="active_false">
                Inactive
              </label>
            </div> */}
            {/* <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="radio"
                name="active"
                id="active_true"
                checked={active ? "checked" : ""}
                onChange={(e) => setActive(!active)}
              />
              <label className="form-check-label" htmlFor="active_true">
                Active
              </label>
            </div> */}
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
              <button className="btn btn-secondary btn-sm gap-2">Upload</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormMedia;