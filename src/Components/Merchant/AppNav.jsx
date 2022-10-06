import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { DashboardIcon, OrderIcon, RequestIcon, QuotationIcon, SettingsIcon } from "../Icons";
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
                    <BottomNavigationAction component={Link} to="/merchant/dashboard" value="/merchant/dashboard" label="Dashboard" icon={<DashboardIcon />} />
                    <BottomNavigationAction component={Link} to="/merchant/requests" value="/merchant/requests" label="Requests" icon={<RequestIcon />} />
                    <BottomNavigationAction component={Link} to="/merchant/quotations" value="/merchant/quotations" label="Quotations" icon={<QuotationIcon />} />
                    <BottomNavigationAction component={Link} to="/merchant/orders" value="/merchant/orders" label="Orders" icon={<OrderIcon />} />
                    <BottomNavigationAction component={Link} to="/merchant/settings" value="/merchant/settings" label="Settings" icon={<SettingsIcon />} />
                </BottomNavigation>
            </Paper>
        </div>
    )
}

export default AppNav;