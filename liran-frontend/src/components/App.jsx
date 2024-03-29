import React, { useState, memo } from "react";
import { Routes, Route } from "react-router-dom";

//👇🏻 React-Toastify configuration
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthProvider, { AuthContext } from "../contexts/Auth.context.js";
import Navbar from "./Navbar.jsx";
import StartPage from "./StartPage";
import Topics from "./individual_pages/Topics.jsx";
import Devices from "./individual_pages/Devices.jsx";
import Manufactors from "./individual_pages/Manufacturers.jsx";
import Logout from "./individual_pages/Logout.jsx";
import Home from "./Home.jsx";
import CustomThemeProvider from "../contexts/CustomTheme.context.js";

import "../styles/App.css";

export default memo(function App() {
  return (
    <AuthProvider>
      <CustomThemeProvider>
        <MainApp />
      </CustomThemeProvider>
    </AuthProvider>
  );
});

function MainApp() {
  const [toolbarText, setToolbarText] = useState("");
  const auth = React.useContext(AuthContext);

  return (
    <div className="App">
      {!auth.isAuthenticated ? (
        <StartPage />
      ) : (
        <>
          <Navbar navHeader={toolbarText} />
          <div className="MainPage">
            <Routes>
              <Route
                path="/"
                element={<Home setToolbarText={setToolbarText} />}
              />
              <Route
                path="/topics"
                element={<Topics setToolbarText={setToolbarText} />}
              />
              <Route
                path="/devices"
                element={<Devices setToolbarText={setToolbarText} />}
              />
              <Route
                path="/manufactors"
                element={<Manufactors setToolbarText={setToolbarText} />}
              />
              <Route path="/logout" element={<Logout />} />
            </Routes>
            <ToastContainer />{" "}
          </div>
        </>
      )}
    </div>
  );
}
