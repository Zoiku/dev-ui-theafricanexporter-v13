import { Outlet } from "react-router-dom";
import Nav from "../Components/Buyer/Nav";
import { useState, useEffect } from "react";
import Tutorial from "../Components/Tutorial";

import AppLayout from "./AppLayout";

const BuyerLayout = ({ session }) => {
  const user = session?.user;
  const [openTutorialView, setOpenTutorialView] = useState(false);

  useEffect(() => {
    if (user.hasOwnProperty("profile")) {
      const isLoggedBefore = user?.profile?.isLoggedBefore;
      if (isLoggedBefore !== undefined) {
        if (isLoggedBefore) {
          setOpenTutorialView(false);
        } else {
          setOpenTutorialView(true);
        }
      }
    }
  }, [user]);

  return openTutorialView ? (
    <Tutorial user={user} openDrawer={openTutorialView} />
  ) : (
    <AppLayout nav={<Nav session={session} />} userType="buyer">
      <Outlet />
    </AppLayout>
  );
};

export default BuyerLayout;
