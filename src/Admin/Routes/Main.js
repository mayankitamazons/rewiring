import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Footer from '../Layout/Footer/Footer';
import Header from '../Layout/Header/Header';
import SideNav from '../Layout/SideNav/SideNav';

const Main = () => {
    const navigate = useNavigate();
    const location = useLocation()

    useEffect(() => {
        if (location.pathname === '/') {
            navigate('/dashboard')
        } else {
            navigate(location.pathname)
        }
    }, [navigate,location.pathname])

    return (
        <>
       <div style={{maxHeight:'100vh',overflow:'auto'}}>
            <Header />
            <SideNav />
            <div className='content-wrapper'   >
                <Outlet/>
            </div>
            <Footer />
            </div>
        </>
    );
};

export default Main;
