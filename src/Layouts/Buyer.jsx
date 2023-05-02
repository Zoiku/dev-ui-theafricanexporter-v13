import "../Styles/AppLayout.css";
import { Outlet } from "react-router-dom";
import Nav from "../Components/Buyer/Nav";
import Menu from "../Components/Buyer/Menu";
import AppNav from "../Components/Buyer/AppNav";
import { useState, useEffect } from "react";
import Tutorial from "../Components/Tutorial";

const BuyerLayout = ({ session }) => {
    const { user } = session;
    const [notLoggedBefore, setNotLoggedBefore] = useState(false);

    useEffect(() => {
        if (user.hasOwnProperty('profile')) {
            const { isLoggedBefore } = user.profile.user;
            if (isLoggedBefore) {
                setNotLoggedBefore(false);
            } else {
                setNotLoggedBefore(true);
            }
        }
    }, [user]);

    return (
        notLoggedBefore ?
            <Tutorial user={user} openDrawer={notLoggedBefore} role="BUYER" />
            :
            <div className="Buyer-Layout App-Layout">
                <Nav session={session} />
                <div className="app-container">
                    <div className="app-menu-container">
                        <Menu />
                    </div>
                    <div className="app-body-container">
                        <div className="app-body">
                            <Outlet />
                        </div>
                    </div>
                    <div className="app-bottom-navigation">
                        <AppNav />
                    </div>
                </div>
            </div>
    );
}

export default BuyerLayout;