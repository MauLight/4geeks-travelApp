import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../../styles/createtrips.css";
// import { Context } from "../store/appContext";

const CreateTrips = () => {
  const url = "https://restcountries.com/v3.1/all";
  const [countries, setCountries] = useState([]);
  const [selected, setSelected] = useState("");
  const [state, setState]=useState([])

  // const{ id }=useParams();

  // const chosen =[
  //   {value: '0', label: 'Buenos Aires'},
  //   {value: '1', label: 'Brasilia'},
  //   {value: '2', label: 'Santiago'},
  //   {value: '3', label: 'Bogotá'},
  //   {value: '4', label: 'Mexico city'},
  //   {value: '5', label: 'Athens'},
  //   {value: '6', label: 'Rome'},
  //   {value: '7', label: 'Madrid'},
  //   {value: '8', label: 'London'},
  //   {value: '', label: 'Paris'}
  // ]

  useEffect(() => {

    const getcountry = async () => {
      const response = await fetch(url);
      console.log(response);
      const gettrip = await response.json();
      console.log(gettrip);
      setCountries(gettrip);
    }

    getcountry();
    }, []);

  const handleChange=(event)=> {
    const getcountryid = event.target.value;
    console.log(getcountryid)
    setSelected(getcountryid);
  }

  useEffect(()=>{
    const getstate=async () => {
    const res = await fetch(url);
    console.log(res);
    const getst= await res.json();
    console.log(getst);
    setState(getst);
  }
  
  getstate();
    }, [selected]);
        
  return (
    <>
      {/* <Navbar /> */}
      <div className="bigcontainer">
        <h1>CREATE YOUR TRIP</h1>
        <div className="container-trip col-10">
          <div className="destination">
            <h4>Amazing! Which country do you want to travel?</h4>
            <select className="custom-select " onChange={event => handleChange(event)} 
              >

              {countries.length > 0 && countries
                .filter((country)=>{
                  // console.log(country.name.common)
                  // console.log(["Argentina","Brazil","Chile",'Colombia'].indexOf(country?.name?.common)!==-1,"Chile")
                  return ["Argentina","Brazil","Chile","Colombia", "Mexico", "Greece", "Italy", "Spain", "United Kingdom", "France"].indexOf(country?.name?.common)!=-1})
                .sort((a, b) => (a.name.common > b.name.common ? 1 : -1))
                .map((getcountry) => {
                  return (
                    <option key={getcountry.id} value={getcountry.id}>
                      {getcountry?.name?.common} 
                    </option>
                  );
                })}
            </select>

            <h4>Choose the city</h4>
            <select className="custom-select ">
            {state 
                .sort((a, b) => (a.capital > b.capital ? 1 : -1))
                .map((res) => {
                  return (
                    <option key={res.id} value={res.id}>
                      {res.capital}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="trip-date">
            <form className="start-trip">
              <label>
                <h4>When do you start your trip?</h4>
                <input
                  className="starting"
                  type="date"
                  name="start-date"
                  required
                  pattern="\d{4}-\d{2}-\d{2}"
                />
              </label>
            </form>
            <form className="end-trip">
              <label>
                <h4>When do you finish your trip?</h4>
                <input
                  className="ending"
                  type="date"
                  name="finish-date"
                  required
                  pattern="\d{4}-\d{2}-\d{2}"
                />
              </label>
            </form>
          </div>
        </div>
        <input
          className="btn-submit btn-primary"
          type="submit"
          value="Save"
        ></input>
      </div>
    </>
  );
};

export default CreateTrips;
