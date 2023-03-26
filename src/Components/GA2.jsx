import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga";

ReactGA.set({ page: window.location.pathname }); 
ReactGA.pageview(window.location.pathname);

const GoogleAnalytics = () => {
    const location = useLocation();
    useEffect(() => {
        ReactGA.pageview(location.pathname);
    }, [location]);
};

export default GoogleAnalytics;
