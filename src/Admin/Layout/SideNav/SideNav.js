import React from 'react'
import { NavLink } from "react-router-dom";
import logo from '../../../Assets/Images/logo.png'
import './SideNav.css'
import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import PaidIcon from '@mui/icons-material/Paid';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import ErrorIcon from '@mui/icons-material/Error';
import { GiJourney } from 'react-icons/gi';
import { BiRun } from 'react-icons/bi';
import { BiSolidRightArrow } from 'react-icons/bi';
import { useNavigate } from "react-router-dom";
import { GoReport } from "react-icons/go";
import { MdReport } from "react-icons/md";


const SideNav = () => {
    const Navigate = useNavigate()


    const logout = () => {
        localStorage.removeItem("_id");
        localStorage.removeItem("token");
        Navigate('/login')
    }

    return (<>
        <aside className=" main-sidebar sidebar-dark-primary elevation-4 sidebar" >
            <div className="brand-link text-center" style={{ maxHeight: "100px", cursor:'pointer' }}>
                <div className="brandImageCard">
                    <img
                        src={logo}
                        alt="Logo"
                        className="brand-image "
                        style={{ float: "none", maxHeight: "72px" }}
                    />
                </div>

            </div>
            <div className="">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img
                            src='/dist/img/user2-160x160.jpg'
                            className="img-circle elevation-2"
                            alt="User"
                            style={{ height: "2.1rem" }}
                        />
                    </div>
                    <div className="info">
                        <div className="d-block" style={{cursor:'pointer' , color:'white'}}>{"Admin"}</div>
                    </div>
                </div>

                <nav className="mt-2" id="accordionExample">
                    <ul
                        className="nav nav-pills nav-sidebar flex-column"
                        data-widget="treeview"
                        role="menu"
                        data-accordion="false"
                    >
                        <li className="nav-item">
                            <NavLink to={"/dashboard"} className="nav-link">
                                <i className="nav-icon fas fa-tachometer-alt" />
                                <p> Dashboard </p>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to={"/questions"} className="nav-link">
                                <i className="nav-icon fas fa-question " />
                                <p>Questions</p>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to={"/users"} className="nav-link">
                                <i className="fas fa-user nav-icon " ></i>
                                <p>Users</p>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to={"/sound"} className="nav-link">
                                <i className="fas fa-headphones nav-icon  " ></i>
                                <p> Sound</p>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to={"/challenges"} className="nav-link">
                                <BiRun className='nav-icon' />
                                <p>   Challenges</p>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to={"/meditation"} className="nav-link">
                                <SelfImprovementIcon className='nav-icon' />
                                <p> Meditation</p>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to={"/journey"} className="nav-link">
                                <GiJourney className='nav-icon' />
                                <p>      Journey</p>
                            </NavLink>
                        </li>




                        <li className="nav-item">
                            <div 
                                className="nav-link collapsed category"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseone"
                                aria-expanded="false"
                                aria-controls="collapseone"
                            >

                                <CategoryIcon className='nav-icon' />
                                <p>
                                    Category<i className="fas fa-angle-left right rotate"></i>
                                </p>
                            </div>
                            <ul
                                className="nav accordion-collapse collapse"
                                id="collapseone"
                                data-bs-parent="#accordionExample"
                            >
                                <li className="nav-item" style={{width:'100%'}}>
                                    <NavLink to={"/category/subcategory"} className="nav-link cursor">
                                        <BiSolidRightArrow className='nav-icon ' />
                                        <p>Subcategory</p>
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <NavLink to={"/problem"} className="nav-link">
                                <ErrorIcon className='nav-icon' />
                                <p>Problem</p>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <div 
                                className="nav-link collapsed Community"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseones"
                                aria-expanded="false"
                                aria-controls="collapseone"
                            >

                                <CategoryIcon className='nav-icon' />
                                <p>
                                    Community List<i className="fas fa-angle-left right rotate"></i>
                                </p>
                            </div>
                            <ul
                                className="nav accordion-collapse collapse"
                                id="collapseones"
                                data-bs-parent="#accordionExample"
                            >
                                <li className="nav-item" style={{width:'100%'}}>
                                    <NavLink to={"communityList/community"} className="nav-link cursor">
                                    <PeopleIcon className='nav-icon ' />
                                        <p>Community</p>
                                    </NavLink>
                                </li>

                                <li className="nav-item" style={{width:'100%'}}>
                                    <NavLink to={"communityList/report"} className="nav-link cursor" >
                                        <GoReport className='nav-icon ' style={{color:"white,size:10px"}}/>
                                        <p>Report</p>
                                    </NavLink>
                                </li>

                                <li className="nav-item" style={{width:'100%'}}>
                                    <NavLink to={"communityList/block"} className="nav-link cursor">
                                        <MdReport  className='nav-icon ' />
                                        <p>Block</p>
                                    </NavLink>
                                </li>
                            </ul>
                        </li>



                        <li className="nav-item">
                            <NavLink to={"/content"} className="nav-link">
                                <i className="nav-icon fa fa-file" />
                                <p>Content</p>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to={"/help"} className="nav-link">
                                <i className="nav-icon fas fa-question-circle" />
                                <p>  Help</p>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to={"/notification"} className="nav-link">
                                <i className="fas fa-envelope nav-icon  " ></i>
                                <p>  Notification</p>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to={"/recent"} className="nav-link">
                                <i className="nav-icon fa fa-history" />
                                <p>Recent</p>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to={"/transaction"} className="nav-link">
                                <PaidIcon className='nav-icon' />
                                <p>Transaction</p>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to={"/subscription"} className="nav-link">
                                <SubscriptionsIcon className='nav-icon' />
                                <p> Subscription</p>
                            </NavLink>
                        </li>

                        <li className="nav-item SideNav-setting">
                            <div
                                className="nav-link collapsed"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapsefour"
                                aria-expanded="false"
                                aria-controls="collapsefour"
                            >
                                <i className="fas fa-cog iconsize nav-icon"></i>
                                <p>
                                    Settings<i className="fas fa-angle-left right rotate"></i>
                                </p>
                            </div>
                            <ul
                                className="nav accordion-collapse collapse"
                                id="collapsefour"
                                data-bs-parent="#accordionExample"
                            >
                                <li className="nav-item " style={{width:'100%'}}>
                                    <NavLink to={"/setting/profile"} className="nav-link cursor" >
                                        <i className="fas fa-edit nav-icon" />
                                        <p>Profile Setting</p>
                                    </NavLink>
                                </li>

                                <li className="nav-item" style={{width:'100%'}}>
                                    <NavLink to={"/setting/changepassword"} className="nav-link cursor">
                                        <i className="fas fa-key nav-icon" />
                                        <p>Change Password</p>
                                    </NavLink>
                                </li>
                                <li className="nav-item" style={{width:'100%'}}>
                                    <div className="nav-link cursor" onClick={logout} >
                                        <i className="fas fa-sign-out-alt nav-icon"></i>
                                        <p>Logout</p>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    </>)
}

export default SideNav