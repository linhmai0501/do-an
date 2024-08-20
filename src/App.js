import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Container } from "reactstrap";

import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Profile from "./views/Profile";
import ExternalApi from "./views/ExternalApi";
import { useAuth0 } from "@auth0/auth0-react";
import ErrorPage from "./views/ErrorPage";
import Login from "./views/Login";
import ListStudent from "./views/ListStudent";
import AddStudent from "./views/AddStudent";

import "./App.css";
import initFontAwesome from "./utils/initFontAwesome";

initFontAwesome();

const App = () => {
  const { isLoading, error, isAuthenticated } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router>
      <div id="app" className="d-flex flex-column h-100">
        <NavBar />
        <Container className="flex-grow-1 mt-5 max-width">
          <Routes>
            <Route path="/" exact element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/error-page" element={<ErrorPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/add-student" element={<AddStudent />} />
            <Route path="/external-api" element={<ExternalApi />} />
            <Route path="/list-student" element={<ListStudent />} />
          </Routes>
        </Container>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
