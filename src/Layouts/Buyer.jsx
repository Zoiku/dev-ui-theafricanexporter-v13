import { Outlet } from "react-router-dom";
import Nav from "../Components/Buyer/Nav";
import { useState, useEffect } from "react";
import Tutorial from "../Components/Tutorial";

import AppLayout from "./AppLayout";

const BuyerLayout = ({ session }) => {
  const user = session?.user;
  const [notLoggedBefore, setNotLoggedBefore] = useState(false);

  useEffect(() => {
    if (user.hasOwnProperty("profile")) {
      const { isLoggedBefore } = user.profile;

      if (isLoggedBefore !== undefined) {
        if (isLoggedBefore) {
          setNotLoggedBefore(false);
        } else {
          setNotLoggedBefore(true);
        }
      }
    }
  }, [user]);

  return notLoggedBefore ? (
    <Tutorial user={user} openDrawer={notLoggedBefore} />
  ) : (
    <AppLayout nav={<Nav session={session} />} userType="buyer">
      <Outlet />
    </AppLayout>
  );
};

export default BuyerLayout;
