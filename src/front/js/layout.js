import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

<<<<<<< HEAD
import Account1 from "./views/Account1";
import FormMedia from "./views/FormMedia";
=======
import  Login from "./views/Login";

import  Account1 from "./views/Account1";
import  SetPreferences from "./views/SetPreferences";
import  Poll from "./views/Poll";
>>>>>>> 026d165df628550276377c1df09ef2ddc5d7a235
import CreateTrips from "./views/CreateTrips";
import SetPreferences from "./views/SetPreferences";
import Poll from "./views/Poll";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.REACT_APP_API_URL || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route path="/login" element={<Login />}/>
                        <Route path="/account/page/1" element={<Account1 />}/>
                        <Route path="/account/page/2" element={<FormMedia />}/>
                        <Route path="/createtrip" element={<CreateTrips />}/>
                        <Route path="/setpreferences" element={<SetPreferences />}/>
                        <Route path="/poll" element={<Poll />}/>
                        
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
