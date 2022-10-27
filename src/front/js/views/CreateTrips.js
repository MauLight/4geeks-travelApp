import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../../styles/createtrips.css";
// import { Context } from "../store/appContext";

const CreateTrips = () => {
  const url = "https://restcountries.com/v3.1/all";
  const [countries, setCountries] = useState([]);
  const [selected, setSelected] = useState("");
  const [state, setState]=useState([]);
  // const [selectedState, setSelectedState] =useState("")

  const getCountry = async () => {
      const response = await fetch(url);
      console.log(response);
      const res = await response.json();
      console.log(res);
      setCountries(res);
    }
  const mostrar_capital = async () => {
    console.log(selected);
    try {
      const resCapital = await fetch(`https://restcountries.com/v3.1/name/${selected}?fullText=true`);
      console.log(resCapital);
      const getinfo = await resCapital.json();
      const infoPais = getinfo[0];
      console.log(infoPais);
      const y = infoPais.capital;
      console.log(y);
      setState(y);
    }
    catch (error) {
      console.log(error.message)
    }
  }
  const handleChange=(event)=> {
    const paisseleccionado = event.target.value;
    console.log(paisseleccionado);
    setSelected(paisseleccionado);
    mostrar_capital();
  }

  
    // const mostrar_capital = async () => {
    //   const resCapital = await fetch(`https://restcountries.com/v3.1/name/${selected}?fullText=true`);
    //   console.log(resCapital);
    


  // const mostrar_capital = async (selected) => {
  //   const resCapital = await fetch(`https://restcountries.eu/rest/v2/${selected}/eesti`);
  //   console.log(resCapital);
  //   const getCapital= await resCapital.json();
  //   console.log(getCapital);
  //   setState(getCapital);
  // }
  



  
  useEffect(() => {

    getCountry(); 
    }, []);
    useEffect(() => {

      mostrar_capital(); 
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
                // .filter((country)=>{
                //   return ["Argentina","Brazil","Chile","Colombia", "Mexico", "Greece", "Italy", "Spain", "United Kingdom", "France"].indexOf(country?.name?.common)!=-1})
                .sort((a, b) => (a.name.common > b.name.common ? 1 : -1))
                .map((elem) => {
                  return (
                    <option key={elem.id} value={elem.id}>
                      {elem?.name?.common} 
                    </option>
                  );
                })}
            </select>

            <h4>Choose the city</h4>
            <select className="custom-select " >
            {state 
                // .sort((a, b) => (a.capital > b.capital ? 1 : -1))
                .map((ele) => {
                  return (
                    <option key={ele.id} value={ele.id}>
                      {state}
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
