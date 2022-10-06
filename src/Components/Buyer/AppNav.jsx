import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { DashboardIcon, OrderIcon, RequestIcon, SettingsIcon, HomeIcon } from "../Icons";
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
                    <BottomNavigationAction component={Link} to="/buyer/dashboard" value="/buyer/dashboard" label="Dashboard" icon={<DashboardIcon />} />
                    <BottomNavigationAction component={Link} to="/buyer/requests" value="/buyer/requests" label="Requests" icon={<RequestIcon />} />
                    <BottomNavigationAction component={Link} to="/buyer/orders" value="/buyer/orders" label="Orders" icon={<OrderIcon />} />
                    <BottomNavigationAction component={Link} to="/buyer/settings" value="/buyer/settings" label="Settings" icon={<SettingsIcon />} />
                </BottomNavigation>
            </Paper>
        </div>
    )
};

export default AppNav;