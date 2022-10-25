import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactDOM from "react-dom";
import { Context } from "../store/appContext";
const Profile = () => {

    const { store, actions } = useContext(Context);
    
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
                <FaStar/>
                <div className="bg-light text-dark bg-opacity-50 p-3" style={{ width: "80%" }}>
                  <ul>
                    <li>`Gender: ${store.gender}` </li>
                    <li>`Native Languaje: ${store.languaje}` </li>
                    <li>`Country of residence: {store.countryOfResidence}`</li>
                    <li>`Instagram: {store.media.intagram}`</li>
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
    </>  ) }
export default Profile;
