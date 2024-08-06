import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../components/Sidebar.css';

const Sidebar = () => {
    const [activeLink, setActiveLink] = useState('/dashboard');

    const handleClick = (link) => {
        setActiveLink(link);
    };

    return (
        <aside className="sidebar">
            <ul>
            <li 
                    className={activeLink === '/dashboard' ? 'active' : ''}
                    onClick={() => handleClick('/dashboard')}
                >
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li 
                    className={activeLink === '/car' ? 'active' : ''}
                    onClick={() => handleClick('/car')}
                >
                    <Link to="/car">Car List</Link>
                </li>
                <li 
                    className={activeLink === '/add-car' ? 'active' : ''}
                    onClick={() => handleClick('/add-car')}
                >
                    <Link to="/add-car">Add Car</Link>
                </li>
                <li 
                    className={activeLink === '/update-car' ? 'active' : ''}
                    onClick={() => handleClick('/update-car')}
                >
                    <Link to="/update-car">Update Car</Link>
                </li>
                <li 
                    className={activeLink === '/delete-car' ? 'active' : ''}
                    onClick={() => handleClick('/delete-car')}
                >
                    <Link to="/delete-car">Delete Car</Link>
                </li>
               
            </ul>
        </aside>
    );
};

export default Sidebar;
