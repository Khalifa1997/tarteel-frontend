import ReactGA from 'react-ga';

const logScreen = () => {
  console.log(
    'Screen Logged: ',
    window.location.pathname + window.location.search
  );
  ReactGA.pageview(window.location.pathname + window.location.search);
};

export default logScreen;
