import "../../Styles/Users.css";
import UsersBuyer from "../../Components/Admin/Tables/UsersBuyer";
import UsersMerchant from "../../Components/Admin/Tables/UsersMerchant";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { TabPanel, a11yProps } from "../../Material/Tabs";
import { useState } from "react";

const ROLES = {
    MERCHANT: 0,
    BUYER: 1
}

const Users = () => {
    const [value, setValue] = useState(ROLES.MERCHANT);
    const handleChange = (_event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="Users-Page">
            <Box sx={{ marginBottom: 3 }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab disableRipple sx={{ fontSize: "medium", fontWeight: 700 }} label="Merchant" {...a11yProps(ROLES.MERCHANT)} />
                    <Tab disableRipple sx={{ fontSize: "medium", fontWeight: 700 }} label="Buyer" {...a11yProps(ROLES.BUYER)} />
                </Tabs>
            </Box>

            <TabPanel value={value} index={ROLES.MERCHANT}>
                <div className="tables-container">
                    <div className="dash-items-title-container">
                        <div>Merchants</div>
                        <div>Merchant Accounts</div>
                    </div>
                    <div>
                        <UsersMerchant />
                    </div>
                </div>
            </TabPanel>

            <TabPanel value={value} index={ROLES.BUYER}>
                <div className="tables-container">
                    <div className="dash-items-title-container">
                        <div>Buyers</div>
                        <div>Buyer Accounts</div>
                    </div>
                    <div>
                        <UsersBuyer />
                    </div>
                </div>
            </TabPanel>

        </div>
    )
};

export default Users;