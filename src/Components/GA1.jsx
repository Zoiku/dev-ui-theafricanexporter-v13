import ReactGA from "react-ga";

ReactGA.set({ page: window.location.pathname });
ReactGA.pageview(window.location.pathname);

const GoogleAnalytics = (category) => {
  const eventTracker = (action, label) => {
    ReactGA.event({ category, action, label });
  };
  return eventTracker;
};

export default GoogleAnalytics;
