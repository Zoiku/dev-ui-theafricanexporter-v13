import { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material/";
import { TabPanel, a11yProps } from "../../Material/Tabs";

import MainBox from "../../Components/v2/components/MainBox";
import BuyerTable from "../../Components/Admin/Tables/UsersBuyer";
import MerchantTable from "../../Components/Admin/Tables/UsersMerchant";

const ROLES = {
  MERCHANT: 0,
  BUYER: 1,
};

const Users = () => {
  const [value, setValue] = useState(ROLES.MERCHANT);
  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  return (
    <main>
      <Box sx={{ marginBottom: 2 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            sx={{ fontWeight: 700 }}
            label="Merchant"
            disableRipple
            {...a11yProps(ROLES.MERCHANT)}
          />
          <Tab
            sx={{ fontWeight: 700 }}
            label="Buyer"
            disableRipple
            {...a11yProps(ROLES.BUYER)}
          />
        </Tabs>
      </Box>

      <TabPanel value={value} index={ROLES.MERCHANT}>
        <MainBox title="Merchants" helper="Merchant Accounts">
          <MerchantTable />
        </MainBox>
      </TabPanel>

      <TabPanel value={value} index={ROLES.BUYER}>
        <MainBox title="Buyers" helper="Buyer Accounts">
          <BuyerTable />
        </MainBox>
      </TabPanel>
    </main>
  );
};

export default Users;
