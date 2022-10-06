import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga";

const GoogleAnalytics = () => {
    const location = useLocation();
    useEffect(() => {
        ReactGA.pageview(location.pathname);
    }, [location]);
};

export default GoogleAnalytics;
