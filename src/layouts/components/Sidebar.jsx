import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { logout } from "../../pages/auth/api/auth";

import profile from "../../assets/user-img.png";
import { BsHouse, BsPeople, BsPatchPlus, BsArrowLeftShort, BsBell } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { setLogout } from "../../store/slices/authSlice";
import { unSetUser } from "../../store/slices/userSlice";

export default function Sidebar({ openMenu, setOpenMenu }) {

    const [activeTab, setActiveTab] = useState(0);
    const tabHandler = (e) => {
        setActiveTab(e);
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
    // getting userinfo
    const userData = useSelector((state) => state.user.userData);
    const userName = userData?.email ? userData.email.split("@")[0] : "";
    

    return (
        <aside className={openMenu ? "active" : ""}>
            <button
                onClick={() => setOpenMenu(!openMenu)}
            >
                <BsArrowLeftShort />
            </button>
            <div className="navigation">

                <ul>
                    <li>
                        <NavLink to="/profile">
                            <span className="icon">
                                <img src={profile} alt="user profile image" />
                            </span>
                            <h5 className="title">
                                {userData?.email ? userName : userData?.name}
                            </h5>
                        </NavLink>
                    </li>


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

                    <li
                        onClick={() => { tabHandler(2) }}
                        className={activeTab === 2 ? "active" : ""}
                    >
                        <NavLink to="/nav1">
                            <span className="icon">
                                <BsPatchPlus />
                            </span>
                            <span className="title">Navigation 3</span>
                        </NavLink>
                    </li>

                    <li
                        onClick={() => { tabHandler(3) }}
                        className={activeTab === 3 ? "active" : ""}
                    >
                        <NavLink to="nav2">
                            <span className="icon">
                                <BsPatchPlus />
                            </span>
                            <span className="title">Navigation 4</span>
                        </NavLink>
                    </li>

                    <hr className="nav-line"></hr>

                    <li
                        onClick={() => { tabHandler(0) }}
                        className={activeTab === 0 ? "active noti-li" : "noti-li"}
                    >
                        <NavLink to="/notification">
                            <span className="icon">
                                <BsBell />
                                <div className="badge">2</div>
                            </span>
                            <span className="title">Notification</span>
                        </NavLink>
                    </li>

                    <li className="last-li">
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
