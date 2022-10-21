import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaFacebookSquare, FaTwitter, FaInstagramSquare } from "react-icons/fa";
// import { Navbar } from "../component/navbar";
import "../../styles/formmedia.css";
import hubble from "../../img/hubble.png";
import { Context } from "../store/appContext";

const FormMedia = () => {
  //   window.variables = {
  // userface= [];
  // userinsta= [];
  // usertweet= []
  // };

  const [userface, setUserFace] = useState("");
  const [userinsta, setUserInsta] = useState("");
  const [usertweet, setUserTweet] = useState("");

  // const { store, actions } = useContext(Context);

  return (
    <div className="form-two">
      <h1>CREATE YOUR ACCOUNT</h1>
      {/* <div className="row"> */}
        <div className="maincontainer col-10 ">
          <div className="row horrible d-flex-inline">
            <div className="container-photos col-6">
              <div className="row">
                <h5 className="">Photos</h5>
              </div>

              <div className="row">
                <div className="photo">
                  <img className="mr-3 col-2" src={hubble} alt=""></img>
                  <img className="mr-3 col-2" src={hubble} alt=""></img>
                  <img className="mr-3 col-2" src={hubble} alt=""></img>
                </div>
                {/* <input accept="image/png,image/jpeg mr-3 col-2" type="file" /> */}
              </div>
              <div className="row">
                <div className="photo">
                  <img className="mr-3 col-2" src={hubble} alt=""></img>
                  <img className="mr-3 col-2" src={hubble} alt=""></img>
                  <img className="mr-3 col-2" src={hubble} alt=""></img>
                </div>
              </div>
              <div className="row">
                <div className="photo">
                  <img className="mr-3 col-2" src={hubble} alt=""></img>
                  <img className="mr-3 col-2" src={hubble} alt=""></img>
                  <img className="mr-3 col-2" src={hubble} alt=""></img>
                </div>
              </div>
              <div className="row">
                <input className="select-img" accept="image/png,image/jpeg mr-3" type="file" />
              </div>
            </div>
            {/* REDES SOCIALES */}
            <div className="social-media col-4">
              <div className="row">
                <h5>Social Media</h5>
              </div>
              {/* FACEBOOK */}
              <div className="row">
                <div className="col ">
                  <form
                    className="media d-flex"
                    onSubmit={(e) => {
                      e.preventDefault();
                      media(userface);
                    }}
                  >
                    <a
                      href={`https://facebook.com/${userface}`}
                      target="_blank"
                      value={userinsta}
                      onChange={(e) => setUserInsta(e.target.value)}
                    >
                      <FaFacebookSquare className="icon" />
                    </a>
                    <input
                      type="text"
                      className="form-control"
                      id="facebook"
                      placeholder="user"
                      value={userface}
                      onChange={(e) => setUserFace(e.target.value)}
                    />
                  </form>
                </div>
              </div>
              {/* INSTAGRAM */}
              <div className="row">
                <div className="col ">
                  <form
                    className="media d-flex"
                    onSubmit={(e) => {
                      e.preventDefault();
                      media(userinsta);
                    }}
                  >
                    <a
                      href={`https://facebook.com/${userinsta}`}
                      target="_blank"
                      value={userinsta}
                      onChange={(e) => setUserInsta(e.target.value)}
                    >
                      <FaInstagramSquare className="icon" />
                    </a>
                    <input
                      type="text"
                      className="form-control"
                      id="instagram"
                      placeholder="user"
                      value={userinsta}
                      onChange={(e) => setUserInsta(e.target.value)}
                    />
                  </form>
                </div>
              </div>
              {/* TWITTER */}
              <div className="row">
                <div className="col ">
                  <form
                    className="media d-flex"
                    onSubmit={(e) => {
                      e.preventDefault();
                      media(usertweet);
                    }}
                  >
                    <a
                      href={`https://facebook.com/${usertweet}`}
                      target={usertweet}
                    >
                      <FaTwitter className="icon" />
                    </a>
                    <input
                      type="text"
                      className="form-control"
                      id="twitter"
                      placeholder="user"
                      value={usertweet}
                      onChange={(e) => setUserTweet(e.target.value)}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/* </div> */}

      <input
        className="btn-submit btn-primary col-3"
        type="submit"
        value="Submit"
      ></input>
    </div>
  );
};
const media = (userface, userinsta, usertweet) => {
  if (userface === "" && userinsta === "" && usertweet === "")
    alert("Missing field");
};

export default FormMedia;

