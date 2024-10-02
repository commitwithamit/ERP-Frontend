import { NavLink, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import noProfile from "../../assets/profile.png";
import logo from "../../assets/erplogo.png";
import { logout } from "../../pages/auth/api/auth";
import { BsHouse, BsPeople, BsPatchPlus, BsArrowLeftShort, BsBell } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { setLogout } from "../../store/slices/authSlice";
import { unSetUser } from "../../store/slices/userSlice";

export default function Sidebar({ openMenu, setOpenMenu }) {

    const [activeTab, setActiveTab] = useState(0);
    const [profileActive, setProfileActive] = useState(false);
    const tabHandler = (e) => {
        setActiveTab(e);
        setProfileActive(false);
    }

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutHandler = async (e) => {
        e.preventDefault();
        await logout();
        dispatch(setLogout());
        dispatch(unSetUser());
        navigate("/login");
    }

    return (
        <aside className={openMenu ? "active" : ""}>
            <button
                onClick={() => setOpenMenu(!openMenu)}
                className="menu-icon"
            >
                <BsArrowLeftShort />
            </button>
            <div className="navigation">

                <ul>
                    {/* Logo */}
                    <li>
                        <Link to="/"
                            onClick={()=>setProfileActive(true)}
                            className={profileActive ? "pro-active" : ""}
                        >
                            <span className="icon">
                                <img src={logo} alt="user profile image" />
                            </span>
                        </Link>
                    </li>

                    {/* Dashboard */}
                    <li
                        onClick={() => { tabHandler(0) }}
                        className={activeTab === 0 ? "active" : ""}
                    >
                        <NavLink to="/">
                            <span className="icon">
                                <BsHouse />
                            </span>
                            <span className="title">Dashboard</span>
                        </NavLink>
                    </li>

                    {/* Team */}
                    <li
                        onClick={() => { tabHandler(1) }}
                        className={activeTab === 1 ? "active" : ""}
                    >
                        <NavLink to="/team">
                            <span className="icon">
                                <BsPeople />
                            </span>
                            <span className="title">Team</span>
                        </NavLink>
                    </li>

                    <hr className="nav-line"></hr>

                    {/* Notification */}
                    <li
                        onClick={() => { tabHandler(2) }}
                        className={activeTab === 2 ? "active noti-li" : "noti-li"}
                    >
                        <NavLink to="/notification">
                            <span className="icon">
                                <BsBell />
                                <div className="badge">2</div>
                            </span>
                            <span className="title">Notification</span>
                        </NavLink>
                    </li>

                    {/* Profile */}
                    <li
                        onClick={() => { tabHandler(3) }}
                        className={activeTab === 3 ? "active" : ""}
                    >
                        <NavLink to="/profile">
                            <span className="icon">
                                <img src={noProfile} alt="picture unavailable" width="26" height="26"/>
                            </span>
                            <span className="title">Profile</span>
                        </NavLink>
                    </li>

                    {/* Logout */}
                    <li className="last-li">
                        <div className="boxy"></div>
                        <NavLink
                            to="/logout"
                            onClick={logoutHandler}
                        >
                            <span className="icon">
                                <CiLogout />
                            </span>
                            <span className="title">Logout</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </aside>
    )
}
