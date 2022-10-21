import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import  Account1 from "./views/Account1";
import  SetPreferences from "./views/SetPreferences";
import  Poll from "./views/Poll";
import CreateTrips from "./views/CreateTrips";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route path="/account/page/1" element={<Account1 />}/>
                        <Route path="/setpreferences" element={<SetPreferences />}/>
                        <Route path="/poll" element={<Poll />}/>
                        <Route path="/createtrip" element={<CreateTrips />}/>
                        
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
