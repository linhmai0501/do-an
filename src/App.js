import React from 'react';
import { BrowserRouter as Router, Routes, Route ,Navigate} from 'react-router-dom';
import Sidebar from './components/NavBar'; // Thay đổi đường dẫn cho đúng
import Home from '../src/views/Home'; // Thay đổi đường dẫn cho đúng
import StudentViolation from '../src/views/StudentViolation'; // Thay đổi đường dẫn cho đúng
import AddStudents from '../src/views/AddStudents'; // Thay đổi đường dẫn cho đúng
import Subjects from '../src/views/Subjects'; // Thay đổi đường dẫn cho đúng
import Profile from '../src/views/Profile'; // 
import "../src/css/Navbar.css"
import ListFiles from '../src/views/ListFiles'; //
import { useAuth0 } from '@auth0/auth0-react';
import Login from './views/Login';

// Import thêm các trang khác mà bạn đã tạo

const App = () => {

  const { isAuthenticated } = useAuth0();
  return (
    <Router>

        <Sidebar showMobilemenu={() => {}} />
        <main className='main-content' style={{padding : "30px",backgroundColor:"#F4F4F4",height:"100%"}}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/StudentViolation" element={isAuthenticated ? <StudentViolation /> : <Navigate to="/login" />} />
            <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/AddStudents" element={isAuthenticated ? <AddStudents /> : <Navigate to="/login" />} />
            <Route path="/Subjects" element={isAuthenticated ? <Subjects /> : <Navigate to="/login" />} />
            <Route path="/Listfiles" element={isAuthenticated ? <ListFiles /> : <Navigate to="/login" />} />

            {/* Thêm các Route khác tại đây */}
          </Routes>
        </main>
    </Router>
  );
};

export default App;
