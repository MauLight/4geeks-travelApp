import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactDOM from "react-dom";

const Mytrips = () => {
  return (
    <>
      <div className="maincontainer col-10">
        <h1>MY TRIPS</h1>
        <button>Create my trips</button>
        <div className="list-group">
          <a
            href="#"
            className="list-group-item list-group-item-action active"
          >
            <div className="d-flex">
              <h5 className="mb-1">Torres del paine</h5>
              <p className="mb-1">fecha</p>
              <div>
              <button>boton</button>
              </div>
            </div>
          </a>
          <a
            href="#"
            className="list-group-item list-group-item-action flex-column align-items-start"
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">List group item heading</h5>
              <small className="text-muted">3 days ago</small>
            </div>
            <p className="mb-1">
              Donec id elit non mi porta gravida at eget metus. Maecenas sed
              diam eget risus varius blandit.
            </p>
            <small className="text-muted">Donec id elit non mi porta.</small>
          </a>
          <a
            href="#"
            className="list-group-item list-group-item-action flex-column align-items-start"
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">List group item heading</h5>
              <small className="text-muted">3 days ago</small>
            </div>
            <p className="mb-1">
              Donec id elit non mi porta gravida at eget metus. Maecenas sed
              diam eget risus varius blandit.
            </p>
            <small className="text-muted">Donec id elit non mi porta.</small>
          </a>
        </div>
      </div>
    </>
  );
};
export default Mytrips;
