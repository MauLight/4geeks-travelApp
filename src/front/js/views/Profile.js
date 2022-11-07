import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import ReactDOM from "react-dom";
import { Context } from "../store/appContext";
import { FaStar } from "react-icons/fa";
import { BsTagFill } from "react-icons/bs";
import user_profile from "../../img/user_profile.png";
import "../../styles/profile.css";

const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const { store, actions } = useContext(Context);
  // const user_id = store.currentUser?.user?.id;

  useEffect(() => {
    console.log(store.currentUser);
    if (store.currentUser) getImageUser();
  }, []);

  useEffect(() => {
    console.log(store.currentUser);
    if (store.currentUser) getImageUser();
  }, [store.currentUser]);


  // trae foto usuario
  const getImageUser = async () => {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/userpictures/${store.currentUser?.user?.id}`);
      const data = await response.json();
      if (!data.msg) {
        console.log(data);
        setProfileImage(data);
        console.log(profileImage);
      }
      else{
        console.log(data.msg)
      }

    } catch (error) {
      console.log(error.message);
    }
  };
  // actualiza foto usuario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (image !== null) {
      const formData = new FormData();

      formData.append("user_id", user_id);
      formData.append("image", image)
      console.log(formData);

      uploadImage(formData);

      setError(null);
      e.target.reset();
    } else {
      setError("Please, complete the form");
    }
  };
  // actualiza foto usuario
  const uploadImage = async (user_id, formData) => {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/userpictures/${user_id}`,
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
    <div className="Col-lg-12 principal">
      <div className="row principal">
        <div className="contain1 col-lg-6">
          {/* <div className="row pic"> */}
          <div className="row pic">
            <div className="col-userphoto">
              <div className="card" style={{ width: "10rem" }}>
                <img
                  className="card-img-top"
                  src="https://res.cloudinary.com/dcdt9yvc2/image/upload/v1666963928/picture/rizdywqkuwis9thyytff.jpg"
                  alt="Card image cap"
                />
                <div className="card-body">
                  <p className="card-text">
                    <strong>{store?.currentUser?.firstname}</strong>
                    <br />
                    <span>
                      <FaStar />
                      Qualified
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="row gen"> */}
          <div className="col gen">
            <ul>
              <li>Gender: {store?.currentUser?.gender}</li>
              <li>Native Language: {store?.currentUser?.languages} </li>
              <li>Country of residence: {store?.currentUser?.countryofresidence}</li>
              <li>Instagram: {store?.currentUser?.instagram}</li>
              <li>Facebook: {store?.currentUser?.facebook}</li>
              <li>Twitter: {store?.currentUser?.twitter}</li>
            </ul>
          </div>
          {/* </div> */}

          <div className="row label">
            <div className="tags px-5" style={{ color: '#336b87' }}>
              {/* <div className="col label 1"> */}
              <BsTagFill />
              <a href="#" className="card-link">
                Card link
              </a>
              {/* </div> */}
              {/* <div className="col label 2"> */}
              <BsTagFill />
              <a href="#" className="card-link">
                Another link
              </a>
              {/* </div> */}
              {/* <div className="col label 3"> */}
              <BsTagFill />
              <a href="#" className="card-link">
                Last link
              </a>
              {/* </div> */}
            </div>
          </div>

          <div className="row matches">
            <div className="col matches">
              <div className="card">
                <div className="card-header">
                  <img style={{ width: "3rem" }}
                    className="card-img-top"
                    src={user_profile}
                    alt="Card image cap"
                  /> Name match</div>
                <div className="card-body">
                  <blockquote className="blockquote mb-0">
                    <p >
                      A well-known quote, contained in a blockquote element.
                    </p>
                    <footer className="blockquote-footer">
                      Calification given{" "}
                      <cite title="Source Title">6/7</cite>
                    </footer>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>
        <div className="contain2 col-lg-6">
          {/* <div className="row btn"> */}
          <Link className="link" to="/users/1/createtrip">
            Create my trips
          </Link>
          {/* </div> */}

          <div className="row trips">
            <h5 className="col-trips">
              My trips
            </h5>
          </div>

          <div className="row photos">
            <div className="col-photos">
              <div className="card" style={{ width: "5rem" }}>
                <img
                  className="card-img-top"
                  src={user_profile}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <p className="card-text">title</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div
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
            </form> */}
      </div>
    </div>
  );
};

export default Profile;
