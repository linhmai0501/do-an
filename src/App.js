import React ,{useContext}from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Container } from "reactstrap";

import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Profile from "./views/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import ErrorPage from "./views/ErrorPage";
import Login from "./views/Login";
import ListStudent from "./views/ListStudent";
import AddStudent from "./views/AddStudent";
import StudentInfo from "./views/StudentInfo";
import "./App.css";
import initFontAwesome from "./utils/initFontAwesome";
import SendFile from "./views/SendFile";

initFontAwesome();

 const App = () => {
   const { isLoading, error, isAuthenticated } = useAuth0();

   if (error) {
     return <div>Oops... {error.message}</div>;
   }

   if (isLoading) {
     return <Loading />;
   }
/*
const App = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate loading state
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  */
  return (
    <Router>
      <div id="app" className="d-flex flex-column h-100">
        <NavBar />
        <Container className="flex-grow-1 mt-5 max-width">
          <Routes>
            <Route path="/" exact element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/error-page" element={isAuthenticated ? <ErrorPage /> : <Navigate to="/login" />} />
            <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/add-student" element={isAuthenticated ? <AddStudent /> : <Navigate to="/login" />} />
            <Route path="/list-student" element={isAuthenticated ? <ListStudent /> : <Navigate to="/login" />} />
            <Route path="/sendfiles" element={isAuthenticated ? <SendFile /> : <Navigate to="/login" />} />
            <Route path="/student-info/:id" element={isAuthenticated ? <StudentInfo /> : <Navigate to="/login" />} />

          </Routes>
        </Container>
        <Footer />
      </div>
    </Router>
  );
};

export default App;