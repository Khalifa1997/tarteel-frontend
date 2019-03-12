import { asyncComponent } from 'react-async-component';
import { EvaluatorContainer } from './containers/EvaluatorContainer';
import { MainPageContainer } from './containers/MainPageContainer';
import { AyahPageContainer } from './containers/AyahPageContainer';
import { DataSetContainer } from './containers/DataSetContainer';

export default [
  {
    path: '/',
    ...MainPageContainer,
    exact: true,
  },
  {
    path: '/surah/:num',
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "AyahPicker" */ './pages/AyahPicker'),
    }),
  },
  {
    path: '/surahs',
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "SurahPicker" */ './pages/SurahPicker'),
    }),
  },
  {
    path: '/demographics',
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "DemographicsPage" */ './pages/DemographicsPage'),
    }),
  },
  {
    path: '/mobile',
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "MobileAppPage" */ './pages/MobileAppPage'),
    }),
  },
  {
    path: '/about',
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "AboutPage" */ './pages/AboutPage'),
    }),
  },
  {
    path: '/subscribe',
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "SubscribePage" */ './pages/SubscribePage'),
    }),
  },
  {
    path: '/profile/:sessionKey',
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "ProfilePage" */ './pages/ProfilePage'),
    }),
  },
  {
    path: '/welcome',
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "WelcomePage" */ './pages/WelcomePage'),
    }),
  },
  {
    path: '/evaluator',
    ...EvaluatorContainer,
  },
  {
    path: '/privacy',
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "PrivacyPage" */ './pages/Privacy'),
    }),
  },
  {
    path: '/login',
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "LoginPage" */ './pages/Login'),
    }),
  },
  {
    path: '/forgot_password',
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "ForgotPassword" */ './pages/ForgotPassword'),
    }),
  },
  {
    path: '/recognition',
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "Recognition" */ './pages/Recognition'),
    }),
    exact: true,
  },
  {
    path: '/recognition/results',
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "RecognitionResults" */ './pages/RecognitionResults'),
    }),
  },
  {
    path: '/ayah/:surah/:ayah',
    ...AyahPageContainer,
  },
  {
    path: '/ayah_not_found',
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "AyahNotFound" */ './pages/NotFound/Ayah'),
    }),
  },
  {
    path: '/contact',
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "ContactUs" */ './pages/ContactUs'),
    }),
  },
  {
    path: '/dataset',
    ...DataSetContainer,
  },
  {
    path: '/partners',
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "Partners" */ './pages/Partners'),
    }),
  },
  {
    path: '/donate',
    component: asyncComponent({
      resolve: () => import(/* webpackChunkName: "Donate" */ './pages/Donate'),
    }),
  },
];
