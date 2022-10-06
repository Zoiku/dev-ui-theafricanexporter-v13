import ReactGA from "react-ga";

const GoogleAnalytics = (category) => {
  const eventTracker = (action, label) => {
    ReactGA.event({ category, action, label });
  };
  return eventTracker;
};

export default GoogleAnalytics;
