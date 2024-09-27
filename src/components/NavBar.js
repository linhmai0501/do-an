import React, { useState } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "../css/Navbar.css"
import { useAuth0 } from "@auth0/auth0-react";
import logo from '../assets/logoVku.svg'; // Đường dẫn đến file logo của bạn

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // Open sidebar by default
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const logoutWithRedirect = () =>
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });

  return (
    <div className={"sidebar"}>
      <div className="sidebar-header">
        {/* Thay thế tiêu đề H3 bằng logo */}
        <img src={logo} alt="Logo" className="sidebar-logo" /> {/* Đảm bảo đường dẫn đúng */}
      </div>

      <Nav vertical className="sidebar-nav">
        <NavItem>
          <NavLink tag={RouterNavLink} to="/" exact activeClassName="active">
            <FontAwesomeIcon icon="home" className="mr-2" /> Trang chủ
          </NavLink>
        </NavItem>

        {isAuthenticated && (
          <>
            <NavItem>
              <NavLink
                tag={RouterNavLink}
                to="/StudentViolation"
                exact
                activeClassName="active"
              >
                <FontAwesomeIcon icon="cloud" className="mr-2" /> Sinh Viên Vi Phạm
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                tag={RouterNavLink}
                to="/AddStudents"
                exact
                activeClassName="active"
              >
                <FontAwesomeIcon icon="cloud" className="mr-2" /> Thêm Sinh Viên Vi Phạm
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                tag={RouterNavLink}
                to="/Listfiles"
                exact
                activeClassName="active"
              >
                <FontAwesomeIcon icon="cloud" className="mr-2" />Danh Sách Vi Phạm
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                tag={RouterNavLink}
                to="/Subjects"
                exact
                activeClassName="active"
              >
                <FontAwesomeIcon icon="cloud" className="mr-2" /> Môn Thi
              </NavLink>
            </NavItem>
            
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <img
                  src={user.picture}
                  alt="Profile"
                  className="rounded-circle"
                  width="30"
                />{" "}
                {user.name}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>{user.name}</DropdownItem>
                <DropdownItem tag={RouterNavLink} to="/profile">
                  <FontAwesomeIcon icon="user" className="mr-2" /> Profile
                </DropdownItem>
                <DropdownItem onClick={() => logoutWithRedirect()}>
                  <FontAwesomeIcon icon="power-off" className="mr-2" /> Logout
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </>
        )}

        {!isAuthenticated && (
          <NavItem>
            <Button
              id="qsLoginBtn"
              color="primary"
              block
              onClick={() => loginWithRedirect()}
            >
              Log in
            </Button>
          </NavItem>
        )}
      </Nav>
    </div>
  );
};

export default Sidebar;
