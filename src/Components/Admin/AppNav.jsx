import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { DashboardIcon, OrderIcon, RequestIcon, UsersIcon, HomeIcon } from "../Icons";
import { Link } from 'react-router-dom';
import { useState } from 'react';

const AppNav = () => {
    const pathname = window.location.pathname;
    const [value, setValue] = useState(pathname);

    const handleChange = (_event, newValue) => {
        setValue(newValue);
    };
    
    return (
        <div className="AppNav">
            <Paper className='app-bar-container' sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={5}>
                <BottomNavigation
                    showLabels
                    onChange={handleChange}
                    value={value}
                >
                    <BottomNavigationAction component={Link} to="/" value="/" label="Home" icon={<HomeIcon />} />
                    <BottomNavigationAction component={Link} to="/admin/dashboard" value="/admin/dashboard" label="Dashboard" icon={<DashboardIcon />} />
                    <BottomNavigationAction component={Link} to="/admin/users" value="/admin/users" label="Users" icon={<UsersIcon />} />
                    <BottomNavigationAction component={Link} to="/admin/requests" value="/admin/requests" label="Request" icon={<RequestIcon />} />
                    <BottomNavigationAction component={Link} to="/admin/orders" value="/admin/orders" label="Orders" icon={<OrderIcon />} />
                </BottomNavigation>
            </Paper>
        </div>
    )
};

export default AppNav;