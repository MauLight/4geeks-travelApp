import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
//import { useNavigation } from '@react-navigation/native';
import { Context } from "../store/appContext";
import "../../styles/login.css";
import trip from "../../img/trip.jpg";
import { FaLanguage } from "react-icons/fa";

const Login = () => {
  const style = {
    background: `url(${trip})`, // fondo login
    backgroundSize: "cover",
    backgroundPosition: "center center",
    width: "100%",
    height: "100vh",
  };

  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate =useNavigation();
  return (
    <>
      <section id="login" style={style}>
        <div className="contenedorPrincipal" id="contenedorPrincipal">
          <div className="" id="toAccount">
            {/* agregar link Account 1*/}
            <Link to="/account/page/1">
              <strong>Don't have an Account? Create an Account!</strong>
            </Link>
          </div>
          <div className="container align-items-center">
            <div className="row justify-content-center ">
              <div className="col-5 border border-dark p-2 mb-2 border-opacity-50 rounded bg-white">
                <div className="mx-5  mt-5  mb-5 messageLogin text-center">
                  Log in to your Account
                </div>
                <form
                // onSubmit={(e) => {
                //   e.preventDefault();
                //   console.log(e.target.value);
                // }}
                >
                  <div className="mx-5 mb-4">
                    <input
                      className="form-control"
                      type="text" //  cambiar type a text estaba en email
                      value={email}
                      name="email"
                      id="emailLogin"
                      placeholder="Enter your Email..."
                      autoComplete="off"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mx-5 mb-5">
                    <input
                      type="password"
                      name="password"
                      value={password}
                      className="form-control"
                      id="passwordLogin"
                      placeholder="Enter your Password..."
                      autoComplete="off"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="m-5 text-center">
                    <button
                      type="submit"
                      class="btn btn-outline-primary"
                      onClick={() => actions.login(email, password, navigate)}
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
