import ReactGA from 'react-ga';

const logScreen = () => {
  ReactGA.pageview(window.location.pathname + window.location.search);
};

export default logScreen;
