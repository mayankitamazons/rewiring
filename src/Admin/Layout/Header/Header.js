import React from 'react'
import './Header.css'
import { useNavigate } from "react-router-dom";

const Header = () => {

    const Navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("_id");
        localStorage.removeItem("token");
        Navigate('/login')
  
    }

    return (
        <div>
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <p className="nav-link" data-widget="pushmenu"  role="button"><i className="fas fa-bars" /></p>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <div className="navbar-search-block">
                            <form className="form-inline">
                                <div className="input-group input-group-sm">
                                    <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                                    <div className="input-group-append">
                                        <button className="btn btn-navbar" type="submit">
                                            <i className="fas fa-search" />
                                        </button>
                                        <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                                            <i className="fas fa-times" />
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </li>
                    <li className="nav-item">
                        <p className="nav-link" data-widget="control-sidebar" data-controlsidebar-slide="true"
                            role="button" onClick={logout}>
                            <i className="fas fa-sign-out-alt" />
                        </p>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Header