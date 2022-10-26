import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

//import Login from "./views/Login";
import Profile from "./views/Profile";
import Account1 from "./views/Account1";
//import PhotosAccount from "./views/PhotosAccount";
import Mytrips from "./views/AdmTrips";
import CreateTrips from "./views/CreateTrips";
import SetPreferences from "./views/SetPreferences";
import Poll from "./views/Poll";
import RecommendationCard from "./views/Recommendations";
import MatchCard from "./views/Matches";


import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename =  "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        {/* <Route path="/login" element={<Login />}/>      */}
                        <Route path="/profile" element={<Profile />}/>
                        <Route path="/account/page/1" element={<Account1 />}/>
                        {/* <Route path="/account/page/2" element={<PhotosAccount />}/>
                        <Route path="/profile" element={<Profile />}/>
                        <Route path="/mytrips" element={<Mytrips />}/> */}
                        <Route path="/createtrip" element={<CreateTrips />}/>
                        <Route path="/setpreferences" element={<SetPreferences />}/>
                        <Route path="/poll" element={<Poll />}/>
                        <Route path="/recommendations" element={<RecommendationCard />}/>
                        <Route path="/matches" element={<MatchCard />}/>
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
