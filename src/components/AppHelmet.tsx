import React from 'react';
import Helmet from 'react-helmet';
import { injectIntl, InjectedIntl, defineMessages } from 'react-intl';

import config from '../../config';


const messages = defineMessages({
  title: {
    id: 'LOCAL_TITLE',
  },
  description: {
    id: 'LOCAL_DESCRIPTION',
  },
});

const locale = '' || 'en_US';
const localeAlternate = '' || 'en_US';

const keywords = [
  'القران الكريم',
  'قران كريم',
  'القرآن',
  'قران',
  'ترتيل',
  'Tarteel',
  'quran',
  "qur'an",
  'koran',
  'kareem',
  'surah',
  'yasin',
  'yaseen',
  'kahf',
  'mulk',
  'rahman',
  'muslim',
  'islam',
  'Allah',
];


const AppHelmet: React.SFC = ({intl}) => {
  const title = intl.formatMessage(messages.title);
  // console.log('title: ', title);
  const description = intl.formatMessage(messages.description);

  const tags = {
    title: title,
    titleTemplate: `%s - ${title}`,
    meta: [
      {
        charset: 'utf-8',
      },
      {
        'http-equiv': 'Content-Type',
        content: 'text/html; charset=utf-8',
      },
      {
        'http-equiv': 'Content-Language',
        content: 'EN; AR',
      },
      {
        name: 'description',
        content: description,
      },
      {
        name: 'keywords',
        content: keywords,
      },
      {
        name: 'Charset',
        content: 'UTF-8',
      },
      {
        name: 'Distribution',
        content: 'Global',
      },
      {
        name: 'Rating',
        content: 'General',
      },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
      },
      {
        name: 'google-site-verification',
        content: 'CWENvKQ-c1fvAqOVC6P0-HJKA6IX0wun-0EwoR6lOcY',
      },
      {
        name: 'theme-color',
        content: '#004f54',
      },
      {
        property: 'og:site_name',
        content: title,
      },
      {
        property: 'og:image',
        content: 'https://tarteel.io/static/img/tarteel_share_photo_50000.png',
      },
      {
        property: 'og:locale',
        content: locale,
      },
      {
        property: 'og:locale:alternate',
        content: localeAlternate,
      },
      {
        property: 'og:title',
        content: title,
      },
      {
        property: 'og:description',
        content: description,
      },
      {
        property: 'og:url',
        // content: 'https://tarteel.io',
        content: '',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        name: 'twitter:card',
        content: 'summary',
      },
      {
        name: 'twitter:title',
        content: title,
      },
      {
        name: 'twitter:description',
        content: description,
      },
      {
        name: 'twitter:image',
        content: 'https://tarteel.io/static/img/tarteel_share_photo_50000.png',
      },
      {
        name: 'twitter:image:width',
        content: '200',
      },
      {
        name: 'twitter:image:height',
        content: '200',
      },
    ],
    link: [

      // {
      //   rel: 'preconnect',
      //   href: 'https://quran-1f14.kxcdn.com',
      //   crossOrigin: '',
      // },
      // {
      //   rel: 'preconnect',
      //   href: 'https://assets-1f14.kxcdn.com',
      //   crossOrigin: '',
      // },
      ...Object.keys(config('locales')).map(key => ({
        rel: 'alternate',
        hrefLang: key,
        href: `https://tarteel.io?lang=${key}`,
      })),
    ],
    /* SEO: https://developers.google.com/structured-data/slsb-overview#markup_examples */
    /* SEO: https://developers.google.com/structured-data/site-name#markup_requirements */
    script: [
      {
        src:
          'https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.en',
        async: '',
        defer: '',
      },
      {
        type: 'application/ld+json',
        innerHTML: `{
            "@context": "http://schema.org",
            "@type": "WebSite",
            "name": "Tarteel",
            "alternateName": "Tarteel.io",
            "url": "https://tarteel.io",
          }`,
      },
      {
        type: 'application/ld+json',
        innerHTML: `{
            "@context": "http://schema.org",
            "@type": "Organization",
            "url": "https://tarteel.io",
            "logo": "https://tarteel.io/static/img/tarteel_share_photo_50000.png"
          }`,
      },
    ],
  };

  return <Helmet {...tags} />;
}

export default injectIntl(AppHelmet);
