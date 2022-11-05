import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactDOM from "react-dom";
import "../../styles/mytrip.css";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { GrConfigure  } from "react-icons/gr";

const Mytrips = () => {

// Agregar fetch GET

  return (
    <>
      <div className="maincontainer col-10 ">
        <div className="row d-flex justify-content-between my-auto">
          <div className="col-lg-3 col-md-4 col-sm-5">
            <h1 className="">MY TRIPS</h1>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-5 my-auto">
            <Link className="link" to="/createtrip">
              Create my trips
            </Link>
          </div>
        </div>

        <div class="card">
          <div className="row">
            <div className="col header">
              <h4 class="card-header">Pais 1</h4>
            </div>

            <div className="row d-flex justify-content-between my-auto">
              
                <div className="col-lg-3 capital ">
                  <h5 class="card-title my-auto">Capital</h5>
                  <p class="card-text">date start / date final</p>
                </div>
              
              <div className="col-lg-4 btn my-auto">
                <button class="btn-find btn-success mx-1">
                  <BsFillPeopleFill /> Find Matches
                </button>
                <button class="btn-delete btn-danger">
                  <MdDeleteForever /> Delete trip
                </button>
                <button class="btn-delete btn-warning">
                <Link className="text-decoration-none text-dark" to="/users/:id/setpreferences" ><GrConfigure /> Preferences</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Mytrips;
