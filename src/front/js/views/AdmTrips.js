import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
import ReactDOM from "react-dom";
import "../../styles/mytrip.css";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { GrConfigure } from "react-icons/gr";

const Mytrips = () => {
  const [trip, setTrip] = useState([]);
  const { store, actions } = useContext(Context);
  const user_id = store.currentUser?.user?.id;

  // Agregar fetch GET
  useEffect(() => {
    if (user_id !== null) getTrip();
  }, [user_id]);

  const getTrip = async () => {
    const response = await fetch(
      `${process.env.BACKEND_URL}/users/${user_id}/createtrips`
    );
    console.log(store);
    console.log(response);
    const res = await response.json();
    console.log(res);
    setTrip(res.createtrips);
  };

  return (
    <div className="full-account1 ">
      <div className="container my-4">
        <div className="row justify-content-between">
          <div className="col-md-6 col-12">
            <h1 className="ms-0">Trips</h1>
          </div>
          <div className="col-md-4 col-12 ">
            <div className=" mx-auto mt-2">
              <Link className="link" to="/createtrip">
                Create my trips
              </Link>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="mb-5 ">
            {!!trip &&
              trip.map((item, index) => {
                return (
                  <div className="card-trip rounded-2 mb-4">
                    <div className="row">
                      <div className="col header text-center">
                        <h4 className="card-header ">{item.capital_trip}</h4>
                      </div>

                      <div className="row">
                        <div className="capital ">
                          <h5 className="card-title text-center mt-2">
                            {item.country_trip}
                          </h5>
                          <p className="card-text text-center">
                            {item.start_date} / {item.end_date}
                          </p>
                        </div>
                        </div>
                        <div className="row ">
                        <div className="btn my-auto">
                          <button className="btn-find btn-success">
                          <Link
                              className="text-decoration-none text-white"
                              to="/matches"
                            >
                            <BsFillPeopleFill /> Find Matches
                            </Link>
                          </button>
                          <button className="btn-delete btn-danger m-1">
                            <MdDeleteForever /> Delete trip
                          </button>
                          <button className="btn-delete btn-warning">
                            <Link
                              className="text-decoration-none text-dark"
                              to="/users/poll"
                            >
                              <GrConfigure /> Rate your partner
                            </Link>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Mytrips;