import React, {useState} from 'react';
import {Outlet} from 'react-router-dom';
import MainHeader from './MainHeader';
import { Link } from 'react-router-dom';
import './MainNavigation.css';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import  Backdrop  from '../uiElement/Backdrop';

function MainNavigation() {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const openDrawer = () =>{
        setDrawerIsOpen(true) 
    }

    const closeDrawer = () =>{
        setDrawerIsOpen(false) 
    }

  return (
    <>
    {drawerIsOpen && <Backdrop onClick={closeDrawer}/>}
    {drawerIsOpen &&
    <SideDrawer>
    <nav className='main-navigation__drawer-nav'>
        <NavLinks/>
    </nav>
    </SideDrawer>
}
    <MainHeader>
        <button className='main-navigation__menu-btn' onClick={openDrawer}>
            <span>

            </span>
                <span>

                </span>
                    <span>

                    </span>
            
        </button>

        <h1 className='main-navigation__title'>
            <Link to='/'>Your Place</Link>
        </h1>

        <nav className='main-navigation__header-nav'>
        <NavLinks/>
        </nav>
    </MainHeader>

        <main>
        <Outlet/>
        </main>
    </>
  )
}

export default MainNavigation