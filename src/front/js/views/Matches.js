import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
//import { arr } from "../component/array";

const style = {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    padding: '0% !important'

}

const rounded = {
    borderRadius: '100%',
    objectFit: 'cover',
    width: '280px',
    height: '280px',
    objectPosition: 'top'
}

const OffCanvasBtn = () => {
    return (
        <button className="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
            Preferences
        </button>
    )
}

const Matches = () => {

    const getAllUsersWithTripsAsync = async () => {
        let url = `${process.env.BACKEND_URL}/users/mytrips`;
        let options_get = {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        }
        try {
            const response = await fetch(url, options_get);
            const data = await response.json();
            console.log(data);
            console.log(data.createtrips);
            setAllUsers(data);
            setTrips(data.createtrips);
        }
        catch (error) {
            console.log(error);
        }
    };

    const getUserWithTripsAsync = async () => {
        let url = `${process.env.BACKEND_URL}/users/${user_id}/mytrips`;
        let options_get = {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        }
        try {
            const response = await fetch(url, options_get);
            const data = await response.json();
            console.log(data);
            console.log(data.createtrips);
            setuser_trip(data.createtrips);
            setUser(data);
        }
        catch (error) {
            console.log(error);
        }
    };

    const postMatch = async () => {

        try {

            const response = await fetch(`${process.env.BACKEND_URL}/api/matches`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(matchData)

            });
            const data = await response.json()
            window.location = '/save'
            console.log(data);
            console.log('data posted!');

        } catch (error) {
            console.log(error)
        }

    };

    //STATE VARIABLES
    //Fetch user_trip and allusers_trips
    const [allUsers, setAllUsers] = useState([]);
    const [trips, setTrips] = useState([]);
    const [user_trip, setuser_trip] = useState([]);
    const [user, setUser] = useState([]);
    const [matchData, setMatchData] = useState({});
    const { store, actions } = useContext(Context);
    const user_id = store.currentUser?.user?.id;

    //Individual variables state.
    //const [traveling, setTraveling] = useState(0);
    //const [children, setChildren] = useState(0);
    const [budget, setBudget] = useState('');
    //const [activity, setActivity] = useState(1);
    //const [gender, setGender] = useState(1);
    //const [age, setAge] = useState(1);
    //const [stay, setStay] = useState(1);

    //Individual filter state.
    const [travelArr, setTravelArr] = useState([]);
    const [childrenArr, setChildrenArr] = useState([]);
    const [activityArr, setActivityArr] = useState([]);
    const [genderArr, setGenderArr] = useState([]);
    const [ageArr, setAgeArr] = useState([]);
    const [stayArr, setStayArr] = useState([]);
    const [budgetArr, setBudgetArr] = useState([]);

    //Filter Functions.
    /*
        const handleTravel = (e) => {
            //console.log(e.target.value);
            const value = e.target.value;
            const filterFunction = (elem) => {
	
                if (elem.traveling == value) {
                    return elem;
                }
                else {
                    console.log('no matches!')
                }
            };
            const filter = arr.filter(filterFunction);
            //console.log(filter);
            setTrips(filter);
            setTravelArr(filter);
            //console.log(travelArr);
        };
        */

    const handleMatch = (id) => {
        //e.preventDefault();
        //console.log(e.target.value);
        const filterMatch = trips.filter(elem => elem.id === id);
        const match = filterMatch[0];
        const matchedUser = allUsers.filter(elem => elem.id === match.users_id);
        setMatchData({
            users_id: user_id,
            matchuser_id: matchedUser.id

        });
        console.log(filterMatch);
        console.log(match);
        console.log(match.users_id);
    };

    const handleTravel = (e) => {
        console.log(e.target.value);
        console.log(travelArr);
        const value = e.target.value;
        const filterFunction = (elem) => {

            if (elem.traveling == value) {
                return elem;
            }
            else {
                console.log('no matches!')
            }
        };
        //const filter = childrenArr ? childrenArr.filter(filterFunction) : arr.filter(filterFunction);
        const filter1 = ageArr.filter(filterFunction);
        const filter2 = genderArr.filter(filterFunction);
        const filter3 = activityArr.filter(filterFunction);
        const filter4 = childrenArr.filter(filterFunction);
        const filter5 = travelArr.filter(filterFunction);
        const filter6 = stayArr.filter(filterFunction);
        const filter7 = budgetArr.filter(filterFunction);
        const filter8 = arr.filter(filterFunction);


        if (stayArr.length > 0) {
            console.log(filter6);
            setTrips(filter6);
            setTravelArr(filter6);
            console.log(filter6);
        }
        else if (stayArr.length == 0 && budgetArr.length > 0) {
            console.log(filter7);
            setTrips(filter7);
            setTravelArr(filter7);
            console.log(filter7);
        }
        if (stayArr.length == 0 && budgetArr.length == 0 && ageArr.length > 0) {
            console.log(filter1);
            setTrips(filter1);
            setTravelArr(filter1);
            console.log(filter1);
        }
        if (stayArr.length == 0 && budgetArr.length == 0 && ageArr.length == 0 && genderArr.length > 0) {
            console.log(filter2);
            setTrips(filter2);
            setTravelArr(filter2);
            console.log(filter2);
        }
        else if (stayArr.length == 0 && budgetArr.length == 0 && ageArr.length == 0 && genderArr.length == 0 && activityArr.length > 0) {
            console.log(filter3);
            setTrips(filter3);
            setTravelArr(filter3);
            console.log(filter3);
        }
        else if (stayArr.length == 0 && budgetArr.length == 0 && ageArr.length == 0 && genderArr.length == 0 && activityArr.length == 0 && childrenArr.length > 0) {
            console.log(filter4);
            setTrips(filter4);
            setTravelArr(filter4);
            console.log(filter4);
        }

        else if (stayArr.length == 0 && budgetArr.length == 0 && ageArr.length == 0 && genderArr.length == 0 && activityArr.length == 0 && childrenArr.length == 0 && travelArr.length > 0) {
            console.log(filter8);
            setTrips(filter8);
            setTravelArr(filter8);
            console.log(filter8);
        }

        else if (stayArr.length == 0 && budgetArr.length == 0 && ageArr.length == 0 && genderArr.length == 0 && activityArr.length == 0 && childrenArr.length == 0 && travelArr.length == 0) {
            console.log(filter8);
            setTrips(filter8);
            setTravelArr(filter8);
            console.log(filter8);
        };

    };

    const handleChildren = (e) => {
        console.log(e.target.value);
        console.log(childrenArr);
        const value = e.target.value;
        const filterFunction = (elem) => {

            if (elem.children == value) {
                return elem;
            }
            else {
                console.log('no matches!')
            }
        };
        //const filter = childrenArr ? childrenArr.filter(filterFunction) : arr.filter(filterFunction);
        const filter1 = ageArr.filter(filterFunction);
        const filter2 = genderArr.filter(filterFunction);
        const filter3 = activityArr.filter(filterFunction);
        const filter4 = childrenArr.filter(filterFunction);
        const filter5 = travelArr.filter(filterFunction);
        const filter6 = stayArr.filter(filterFunction);
        const filter7 = budgetArr.filter(filterFunction);
        const filter8 = arr.filter(filterFunction);


        if (stayArr.length > 0) {
            console.log(filter6);
            setTrips(filter6);
            setChildrenArr(filter6);
            console.log(filter6);
        }
        else if (stayArr.length == 0 && budgetArr.length > 0) {
            console.log(filter7);
            setTrips(filter7);
            setChildrenArr(filter7);
            console.log(filter7);
        }
        if (stayArr.length == 0 && budgetArr.length == 0 && ageArr.length > 0) {
            console.log(filter1);
            setTrips(filter1);
            setChildrenArr(filter1);
            console.log(filter1);
        }
        if (stayArr.length == 0 && budgetArr.length == 0 && ageArr.length == 0 && genderArr.length > 0) {
            console.log(filter2);
            setTrips(filter2);
            setChildrenArr(filter2);
            console.log(filter2);
        }
        else if (stayArr.length == 0 && budgetArr.length == 0 && ageArr.length == 0 && genderArr.length == 0 && activityArr.length > 0) {
            console.log(filter3);
            setTrips(filter3);
            setChildrenArr(filter3);
            console.log(filter3);
        }
        else if (stayArr.length == 0 && budgetArr.length == 0 && ageArr.length == 0 && genderArr.length == 0 && activityArr.length == 0 && childrenArr.length > 0) {
            console.log(filter4);
            setTrips(filter4);
            setChildrenArr(filter4);
            console.log(filter4);
        }

        else if (stayArr.length == 0 && budgetArr.length == 0 && ageArr.length == 0 && genderArr.length == 0 && activityArr.length == 0 && childrenArr.length == 0 && travelArr.length > 0) {
            console.log(filter8);
            setTrips(filter8);
            setChildrenArr(filter8);
            console.log(filter8);
        }

        else if (stayArr.length == 0 && budgetArr.length == 0 && ageArr.length == 0 && genderArr.length == 0 && activityArr.length == 0 && childrenArr.length == 0 && travelArr.length == 0) {
            console.log(filter8);
            setTrips(filter8);
            setChildrenArr(filter8);
            console.log(filter8);
        };

    };

    const handleActivity = (e) => {
        console.log(e.target.value);
        console.log(activityArr);
        const value = e.target.value;
        const filterFunction = (elem) => {

            if (elem.activity == value) {
                return elem;
            }
            else {
                console.log('no matches!')
            }
        };
        //const filter = childrenArr ? childrenArr.filter(filterFunction) : arr.filter(filterFunction);
        const filter1 = ageArr.filter(filterFunction);
        const filter2 = genderArr.filter(filterFunction);
        const filter3 = activityArr.filter(filterFunction);
        const filter4 = childrenArr.filter(filterFunction);
        const filter5 = travelArr.filter(filterFunction);
        const filter6 = stayArr.filter(filterFunction);
        const filter7 = budgetArr.filter(filterFunction);
        const filter8 = arr.filter(filterFunction);


        if (stayArr.length > 0) {
            console.log(filter6);
            setTrips(filter6);
            setActivityArr(filter6);
            console.log(filter6);
        }
        else if (stayArr.length == 0 && budgetArr.length > 0) {
            console.log(filter7);
            setTrips(filter7);
            setActivityArr(filter7);
            console.log(filter7);
        }
        if (stayArr.length == 0 && budgetArr.length == 0 && ageArr.length > 0) {
            console.log(filter1);
            setTrips(filter1);
            setActivityArr(filter1);
            console.log(filter1);
        }
        if (stayArr.length == 0 && budgetArr.length == 0 && ageArr.length == 0 && genderArr.length > 0) {
            console.log(filter2);
            setTrips(filter2);
            setActivityArr(filter2);
            console.log(filter2);
        }
        else if (stayArr.length == 0 && budgetArr.length == 0 && ageArr.length == 0 && genderArr.length == 0 && activityArr.length > 0) {
            console.log(filter8);
            setTrips(filter8);
            setActivityArr(filter8);
            console.log(filter8);
        }
        else if (stayArr.length == 0 && budgetArr.length == 0 && ageArr.length == 0 && genderArr.length == 0 && activityArr.length == 0 && childrenArr.length > 0) {
            console.log(filter4);
            setTrips(filter4);
            setActivityArr(filter4);
            console.log(filter4);
        }

        else if (stayArr.length == 0 && budgetArr.length == 0 && ageArr.length == 0 && genderArr.length == 0 && activityArr.length == 0 && childrenArr.length == 0 && travelArr.length > 0) {
            console.log(filter5);
            setTrips(filter5);
            setActivityArr(filter5);
            console.log(filter5);
        }

        else if (stayArr.length == 0 && budgetArr.length == 0 && ageArr.length == 0 && genderArr.length == 0 && activityArr.length == 0 && childrenArr.length == 0 && travelArr.length == 0) {
            console.log(filter8);
            setTrips(filter8);
            setActivityArr(filter8);
            console.log(filter8);
        };

    };



    const handleGender = (e) => {
        console.log(e.target.value);
        console.log(genderArr);
        const value = e.target.value;
        const filterFunction = (elem) => {

            if (elem.gender == value) {
                return elem;
            }
            else {
                console.log('no matches!')
            }
        };
        //const filter = childrenArr ? childrenArr.filter(filterFunction) : arr.filter(filterFunction);
        const filter1 = ageArr.filter(filterFunction);
        const filter2 = genderArr.filter(filterFunction);
        const filter3 = activityArr.filter(filterFunction);
        const filter4 = childrenArr.filter(filterFunction);
        const filter5 = travelArr.filter(filterFunction);
        const filter6 = stayArr.filter(filterFunction);
        const filter7 = budgetArr.filter(filterFunction);
        const filter8 = arr.filter(filterFunction);


        if (stayArr.length > 0) {
            console.log(filter6);
            setTrips(filter6);
            setGenderArr(filter6);
            console.log(filter6);
        }
        else if (stayArr.length == 0 && budgetArr.length > 0) {
            console.log(filter7);
            setTrips(filter7);
            setGenderArr(filter7);
            console.log(filter7);
        }
        if (stayArr.length == 0 && budgetArr.length == 0 && ageArr.length > 0) {
            console.log(filter1);
            setTrips(filter1);
            setGenderArr(filter1);
            console.log(filter1);
        }
        if (stayArr.length == 0 && budgetArr.length == 0 && ageArr.length == 0 && genderArr.length > 0) {
            console.log(filter8);
            setTrips(filter8);
            setGenderArr(filter8);
            console.log(filter8);
        }
        else if (stayArr.length == 0 && budgetArr.length == 0 && ageArr.length == 0 && genderArr.length == 0 && activityArr.length > 0) {
            console.log(filter3);
            setTrips(filter3);
            setGenderArr(filter3);
            console.log(filter3);
        }
        else if (stayArr.length == 0 && budgetArr.length == 0 && ageArr.length == 0 && genderArr.length == 0 && activityArr.length == 0 && childrenArr.length > 0) {
            console.log(filter4);
            setTrips(filter4);
            setGenderArr(filter4);
            console.log(filter4);
        }

        else if (stayArr.length == 0 && budgetArr.length == 0 && ageArr.length == 0 && genderArr.length == 0 && activityArr.length == 0 && childrenArr.length == 0 && travelArr.length > 0) {
            console.log(filter5);
            setTrips(filter5);
            setGenderArr(filter5);
            console.log(filter5);
        }

        else if (stayArr.length == 0 && budgetArr.length == 0 && ageArr.length == 0 && genderArr.length == 0 && activityArr.length == 0 && childrenArr.length == 0 && travelArr.length == 0) {
            console.log(filter8);
            setTrips(filter8);
            setGenderArr(filter8);
            console.log(filter8);
        };

    };

    const handleAge = (e) => {
        console.log(e.target.value);
        console.log(ageArr);
        const value = e.target.value;
        const filterFunction = (elem) => {

            if (elem.age == value) {
                return elem;
            }
            else {
                console.log('no matches!')
            }
        };
        //const filter = childrenArr ? childrenArr.filter(filterFunction) : arr.filter(filterFunction);
        const filter1 = ageArr.filter(filterFunction);
        const filter2 = genderArr.filter(filterFunction);
        const filter3 = activityArr.filter(filterFunction);
        const filter4 = childrenArr.filter(filterFunction);
        const filter5 = travelArr.filter(filterFunction);
        const filter6 = stayArr.filter(filterFunction);
        const filter7 = budgetArr.filter(filterFunction);
        const filter8 = arr.filter(filterFunction);


        if (stayArr.length > 0) {
            console.log(filter6);
            setTrips(filter6);
            setAgeArr(filter6);
            console.log(filter6);
        }
        else if (stayArr.length == 0 && budgetArr.length > 0) {
            console.log(filter7);
            setTrips(filter7);
            setAgeArr(filter7);
            console.log(filter7);
        }
        if (stayArr.length == 0 && budgetArr.length == 0 && ageArr.length > 0) {
            console.log(filter8);
            setTrips(filter8);
            setAgeArr(filter8);
            console.log(filter8);
        }
        if (stayArr.length == 0 && budgetArr.length == 0 && ageArr.length == 0 && genderArr.length > 0) {
            console.log(filter2);
            setTrips(filter2);
            setAgeArr(filter2);
            console.log(filter2);
        }
        else if (stayArr.length == 0 && budgetArr.length == 0 && ageArr.length == 0 && genderArr.length == 0 && activityArr.length > 0) {
            console.log(filter3);
            setTrips(filter3);
            setAgeArr(filter3);
            console.log(filter3);
        }
        else if (stayArr.length == 0 && budgetArr.length == 0 && ageArr.length == 0 && genderArr.length == 0 && activityArr.length == 0 && childrenArr.length > 0) {
            console.log(filter4);
            setTrips(filter4);
            setAgeArr(filter4);
            console.log(filter4);
        }

        else if (stayArr.length == 0 && budgetArr.length == 0 && ageArr.length == 0 && genderArr.length == 0 && activityArr.length == 0 && childrenArr.length == 0 && travelArr.length > 0) {
            console.log(filter5);
            setTrips(filter5);
            setAgeArr(filter5);
            console.log(filter5);
        }

        else if (stayArr.length == 0 && budgetArr.length == 0 && ageArr.length == 0 && genderArr.length == 0 && activityArr.length == 0 && childrenArr.length == 0 && travelArr.length == 0) {
            console.log(filter8);
            setTrips(filter8);
            setAgeArr(filter8);
            console.log(filter8);
        };

    };

    const handleStay = (e) => {
        console.log(e.target.value);
        console.log(stayArr);
        const value = e.target.value;
        const filterFunction = (elem) => {

            if (elem.stay == value) {
                return elem;
            }
            else {
                console.log('no matches!')
            }
        };
        //const filter = childrenArr ? childrenArr.filter(filterFunction) : arr.filter(filterFunction);
        const filter1 = ageArr.filter(filterFunction);
        const filter2 = genderArr.filter(filterFunction);
        const filter3 = activityArr.filter(filterFunction);
        const filter4 = childrenArr.filter(filterFunction);
        const filter5 = travelArr.filter(filterFunction);
        const filter6 = stayArr.filter(filterFunction);
        const filter7 = budgetArr.filter(filterFunction);
        const filter8 = arr.filter(filterFunction);


        if (stayArr.length > 0) {
            console.log(filter8);
            setTrips(filter8);
            setStayArr(filter8);
            console.log(filter8);
        }
        else if (stayArr.length == 0 && budgetArr.length > 0) {
            console.log(filter7);
            setTrips(filter7);
            setStayArr(filter7);
            console.log(filter7);
        }
        if (stayArr.length == 0 && budgetArr.length == 0 && ageArr.length > 0) {
            console.log(filter1);
            setTrips(filter1);
            setStayArr(filter1);
            console.log(filter1);
        }
        if (stayArr.length == 0 && budgetArr.length == 0 && ageArr.length == 0 && genderArr.length > 0) {
            console.log(filter2);
            setTrips(filter2);
            setStayArr(filter2);
            console.log(filter2);
        }
        else if (stayArr.length == 0 && budgetArr.length == 0 && ageArr.length == 0 && genderArr.length == 0 && activityArr.length > 0) {
            console.log(filter3);
            setTrips(filter3);
            setStayArr(filter3);
            console.log(filter3);
        }
        else if (stayArr.length == 0 && budgetArr.length == 0 && ageArr.length == 0 && genderArr.length == 0 && activityArr.length == 0 && childrenArr.length > 0) {
            console.log(filter4);
            setTrips(filter4);
            setStayArr(filter4);
            console.log(filter4);
        }

        else if (stayArr.length == 0 && budgetArr.length == 0 && ageArr.length == 0 && genderArr.length == 0 && activityArr.length == 0 && childrenArr.length == 0 && travelArr.length > 0) {
            console.log(filter5);
            setTrips(filter5);
            setStayArr(filter5);
            console.log(filter5);
        }

        else if (stayArr.length == 0 && budgetArr.length == 0 && ageArr.length == 0 && genderArr.length == 0 && activityArr.length == 0 && childrenArr.length == 0 && travelArr.length == 0) {
            console.log(filter8);
            setTrips(filter8);
            setStayArr(filter8);
            console.log(filter8);
        };

    };

    const handleBudget = (e) => {
        console.log(e.target.value);
        setBudget(e.target.value);
        const value = e.target.value;
        const filterFunction = (elem) => {
            if (Math.abs(elem.budget - value) <= 1000) {
                return elem;
            }
            else {
                console.log('no matches!')
            }
        };

        const filter1 = ageArr.filter(filterFunction);
        const filter2 = genderArr.filter(filterFunction);
        const filter3 = activityArr.filter(filterFunction);
        const filter4 = childrenArr.filter(filterFunction);
        const filter5 = travelArr.filter(filterFunction);
        const filter6 = stayArr.filter(filterFunction);
        const filter7 = budgetArr.filter(filterFunction);
        const filter8 = arr.filter(filterFunction);

        if (budgetArr.length > 0) {
            console.log(filter8);
            setTrips(filter8);
            setBudgetArr(filter8);
            console.log(filter8);
        }
        else if (budgetArr.length == 0 && stayArr.length > 0) {
            console.log(filter6);
            setTrips(filter6);
            setBudgetArr(filter6);
            console.log(filter6);
        }
        else if (budgetArr.length == 0 && stayArr.length == 0 && ageArr.length > 0) {
            console.log(filter1);
            setTrips(filter1);
            setBudgetArr(filter1);
            console.log(filter1);
        }
        else if (budgetArr.length == 0 && stayArr.length == 0 && ageArr.length == 0 && genderArr.length > 0) {
            console.log(filter2);
            setTrips(filter2);
            setBudgetArr(filter2);
            console.log(filter2);
        }
        else if (budgetArr.length == 0 && stayArr.length == 0 && ageArr.length == 0 && genderArr.length == 0 && activityArr.length > 0) {
            console.log(filter3);
            setTrips(filter3);
            setBudgetArr(filter3);
            console.log(filter3);
        }
        else if (budgetArr.length == 0 && stayArr.length == 0 && ageArr.length == 0 && genderArr.length == 0 && activityArr.length == 0 && childrenArr.length > 0) {
            console.log(filter4);
            setTrips(filter4);
            setBudgetArr(filter4);
            console.log(filter4);
        }

        else if (budgetArr.length == 0 && stayArr.length == 0 && ageArr.length == 0 && genderArr.length == 0 && activityArr.length == 0 && childrenArr.length == 0 && travelArr.length > 0) {
            console.log(filter5);
            setTrips(filter5);
            setBudgetArr(filter5);
            console.log(filter5);
        }

        else if (budgetArr.length == 0 && stayArr.length == 0 && ageArr.length == 0 && genderArr.length == 0 && activityArr.length == 0 && childrenArr.length == 0 && travelArr.length == 0) {
            console.log(filter8);
            setTrips(filter8);
            setBudgetArr(filter8);
            console.log(filter8);
        };

    };


    /*
        const handleClick = () => {
            console.log(arr);
            console.log(traveling);
            const filter = arr.filter(elem => elem.traveling == traveling);
            console.log(filter);
    	
        }
    	
        const handleBudget = (e) => {
            setBudget(e.target.value)
            console.log(e.target.value)
        }
    	
        const handleTravel = (e) => {
    	
            const filterFunction = (elem) => {
    	
                if (elem.traveling == filter_val) {
                    return elem;
                }
                else {
                    console.log('no matches!')
                }
            };
            //e.preventDefault();
            console.log(e.target.value);
            const filter_val = e.target.value;
            const filter = arr.filter(filterFunction);
            setTrips(filter);
            console.log(filter);
            console.log(trips);
        };
    	
        const handleChildren = (e) => {
            //e.preventDefault();
            //setTrips([...trips]);
            //console.log(e.target.value);
            const filter_val = e.target.value;
            //const filter = history.current.filter(elem => elem.children == filter_val);
            setChildren(filter_val);
            //console.log(filter);
            console.log(children);
        }
        const handleChange = (e) => {
            //e.preventDefault();
            console.log(e.target.value);
        }
    */

    useEffect(() => {
        getAllUsersWithTripsAsync()
    }, []);
    
    useEffect(() => {
        getUserWithTripsAsync()
    }, []);

    useEffect(() => {
        postMatch()
    }, []);

    return (
        <div className="container">
            <div className="mb-5">
                <h1 className='matches_title mb-2'>Your Matches!</h1>
                <OffCanvasBtn className='float-end' />
            </div>
            <div className="row d-flex mx-auto justify-content-center">

                {
                    !!trips && trips.length > 0 ? (
                        trips.map((trip, i) => {
                            if (trip.country === user_trip.country_trip && trip.city === user_trip.capital_trip && trip.start_date === user_trip.start_date) {
                                return (
                                    <div className='col-3 justify-content-center p-3' key={i}>
                                        <div className="trip_card card border-0 mb-5 justify-content-center">
                                            <a className="mx-auto" href="https://rr.noordstar.me/test-109ddae8">
                                                <img src='' className="card-img-top pt-3 mx-auto" alt="..." style={rounded} />
                                            </a>
                                            <div className="card-body d-flex p-0">

                                                <div className='w-100 text-center p-3'>
                                                    {
                                                        !!allUsers && allUsers.length > 0 ? (
                                                            allUsers.map((user, i) => {
                                                                if (user.id === trip.users_id) {
                                                                    return (
                                                                        <p key={i} className="trip_text card-text px-2">{user.firstname} {user.lastname}</p>
                                                                    )
                                                                }
                                                            })
                                                        ) : <p className="trip_text card-text px-2">We don't have a name!</p>
                                                    } <p> goes to {trip.capital_trip}, {trip.country_trip} on the same date!</p>
                                                </div>
                                            </div>
                                            <button className="btn w-25 mx-auto mb-3" onClick={handleMatch}>Add Match!</button>
                                        </div>
                                    </div>
                                )
                            }

                            else {
                                return ""
                            }
                        }
                        )
                    ) : (
                        <div className="col-md-12 text-center">
                            <h4>There are no matches for your trip.</h4>
                        </div>
                    )
                }
            </div>
            <div className="offcanvas offcanvas-end" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Preferences</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <form>

                        <div className="col">
                            <p>Traveling...</p>
                            <div className='form-check form-check-inline'>
                                <input className='form-check-input' key={1} type='radio' onChange={handleTravel} name='travelling' id='inlineRadio1' value={1} />
                                <label className='form-check-label' htmlFor='inlineRadio1'>Alone</label>
                            </div>
                            <div className='form-check form-check-inline'>
                                <input className='form-check-input' key={2} type='radio' onChange={handleTravel} name='travelling' id='inlineRadio2' value={2} />
                                <label className='form-check-label' htmlFor='inlineRadio2'>Couple</label>
                            </div>
                            <div className='form-check form-check-inline'>
                                <input className='form-check-input' key={3} type='radio' onChange={handleTravel} name='travelling' id='inlineRadio3' value={3} />
                                <label className='form-check-label' htmlFor='inlineRadio3'>Group</label>
                            </div>

                        </div>

                        <div className="col">

                            <p>With children?</p>
                            <div className='form-check form-check-inline'>
                                <input className='form-check-input' type='radio' name='with_children' id='inlineRadio1' onChange={handleChildren} value={1} />
                                <label className='form-check-label' htmlFor='inlineRadio1'>Yes</label>
                            </div>
                            <div className='form-check form-check-inline'>
                                <input className='form-check-input' type='radio' name='with_children' id='inlineRadio2' onChange={handleChildren} value={2} />
                                <label className='form-check-label' htmlFor='inlineRadio2'>No</label>
                            </div>

                        </div>

                        <div className="col mt-3">

                            <label htmlFor='customRange1' className='form-label'>Approximate budget (in US dollars)</label>
                            <div className='d-flex'>
                                <input type='range' className='slider form-range w-75 mb-3 in-line' min='50' max='20000' step="1000" id='customRange1' onInput={handleBudget} name='budget' value={budget} />
                                <label className='form-label in-line ms-4' id='rangeValue'>$ {budget}</label>
                            </div>

                        </div>

                        <div className="col">

                            <p className='w-75'>Which type of activity do you prefer the most?</p>
                            <div className='row'>
                                <div className='col col-md-12'>
                                    <div className='form-check form-check-inline'>
                                        <input className='form-check-input' type='radio' id='inlineCheckbox1' value={1} onChange={handleActivity} name='activities' />
                                        <label className='form-check-label' htmlFor='inlineCheckbox1'>Trekking</label>
                                    </div>
                                    <div className='form-check form-check-inline'>
                                        <input className='form-check-input' type='radio' id='inlineCheckbox2' value={2} onChange={handleActivity} name='activities' />
                                        <label className='form-check-label' htmlFor='inlineCheckbox2'>Restaurants</label>
                                    </div>

                                    <div className='form-check form-check-inline'>
                                        <input className='form-check-input' type='radio' id='inlineCheckbox3' value={3} onChange={handleActivity} name='activities' />
                                        <label className='form-check-label' htmlFor='inlineCheckbox3'>Museums</label>
                                    </div>
                                </div>
                                <div className='col col-md-12'>
                                    <div className='form-check form-check-inline'>
                                        <input className='form-check-input' type='radio' id='inlineCheckbox4' value={4} onChange={handleActivity} name='activities' />
                                        <label className='form-check-label' htmlFor='inlineCheckbox3'>Disco & Nights Out</label>
                                    </div>
                                    <div className='form-check form-check-inline'>
                                        <input className='form-check-input' type='radio' id='inlineCheckbox5' value={5} onChange={handleActivity} name='activities' />
                                        <label className='form-check-label' htmlFor='inlineCheckbox3'>Malls & Shopping</label>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="col mt-3">

                            <p>Do you prefer a specific gender?</p>
                            <div className='form-check form-check-inline'>
                                <input className='form-check-input' type='radio' name='gender_specific' id='inlineRadio1' onChange={handleGender} value={1} />
                                <label className='form-check-label' htmlFor='inlineRadio1'>Woman</label>
                            </div>
                            <div className='form-check form-check-inline'>
                                <input className='form-check-input' type='radio' name='gender_specific' id='inlineRadio2' onChange={handleGender} value={2} />
                                <label className='form-check-label' htmlFor='inlineRadio2'>Man</label>
                            </div>
                            <div className='form-check form-check-inline'>
                                <input className='form-check-input' type='radio' name='gender_specific' id='inlineRadio3' onChange={handleGender} value={3} />
                                <label className='form-check-label' htmlFor='inlineRadio3'>I don't believe in binary gender labelling</label>
                            </div>

                        </div>

                        <div className="col mt-3">

                            <p>Any age in particular for your perfect partner?</p>
                            <div className='row'>
                                <div className='col-md-12 col-2'>
                                    <div className='form-check form-check-inline'>
                                        <input className='form-check-input' type='radio' name='partner_age' id='inlineRadio4' onChange={handleAge} value={1} />
                                        <label className='form-check-label' htmlFor='inlineRadio4'>18-24</label>
                                    </div>
                                    <div className='form-check form-check-inline'>
                                        <input className='form-check-input' type='radio' name='partner_age' id='inlineRadio5' onChange={handleAge} value={2} />
                                        <label className='form-check-label' htmlFor='inlineRadio5'>25-31</label>
                                    </div>
                                    <div className='form-check form-check-inline'>
                                        <input className='form-check-input' type='radio' name='partner_age' id='inlineRadio6' onChange={handleAge} value={3} />
                                        <label className='form-check-label' htmlFor='inlineRadio6'>32-38</label>
                                    </div>
                                    <div className='form-check form-check-inline'>
                                        <input className='form-check-input' type='radio' name='partner_age' id='inlineRadio7' onChange={handleAge} value={4} />
                                        <label className='form-check-label' htmlFor='inlineRadio7'>39-45</label>
                                    </div>
                                </div>
                                <div className='col-md-12 col-2'>
                                    <div className='form-check form-check-inline'>
                                        <input className='form-check-input' type='radio' name='partner_age' id='inlineRadio8' onChange={handleAge} value={5} />
                                        <label className='form-check-label' htmlFor='inlineRadio8'>45-51</label>
                                    </div>
                                    <div className='form-check form-check-inline'>
                                        <input className='form-check-input' type='radio' name='partner_age' id='inlineRadio9' onChange={handleAge} value={6} />
                                        <label className='form-check-label' htmlFor='inlineRadio9'>52-59</label>
                                    </div>
                                    <div className='form-check form-check-inline'>
                                        <input className='form-check-input' type='radio' name='partner_age' id='inlineRadio10' onChange={handleAge} value={7} />
                                        <label className='form-check-label' htmlFor='inlineRadio10'>60+</label>
                                    </div>
                                    <div className='form-check form-check-inline'>
                                        <input className='form-check-input' type='radio' name='partner_age' id='inlineRadio11' onChange={handleAge} value={8} />
                                        <label className='form-check-label' htmlFor='inlineRadio11'>I don't have an age preference</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col mt-3">

                            <p>Where do you plan to stay?</p>
                            <div className='form-check'>
                                <input className='form-check-input' type='radio' name='stay' id='Radio1' onChange={handleStay} value={1} />
                                <label className='form-check-label' htmlFor='Radio1'>Hotel</label>
                            </div>
                            <div className='form-check'>
                                <input className='form-check-input' type='radio' name='stay' id='Radio2' onChange={handleStay} value={2} />
                                <label className='form-check-label' htmlFor='Radio2'>Apartment/Airbnb</label>
                            </div>
                            <div className='form-check'>
                                <input className='form-check-input' type='radio' name='stay' id='Radio3' onChange={handleStay} value={3} />
                                <label className='form-check-label' htmlFor='Radio3'>Camping</label>
                            </div>
                            <div className='form-check'>
                                <input className='form-check-input' type='radio' name='stay' id='Radio4' onChange={handleStay} value={4} />
                                <label className='form-check-label' htmlFor='Radio4'>I'll stay at someone else's.</label>
                            </div>
                        </div>

                    </form>
                    <div className="col my-3">
                        <button className="btn" onClick={() => setTrips(arr)}>Reset</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Matches;