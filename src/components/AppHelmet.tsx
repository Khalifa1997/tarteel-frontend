import React, { ReactNode } from 'react';
import Helmet from 'react-helmet';
import { defineMessages, injectIntl, InjectedIntl } from 'react-intl';

import config from '../../config';

const messages = defineMessages({
  title: {
    id: 'LOCAL_TITLE',
  },
  description: {
    id: 'LOCAL_DESCRIPTION',
  },
  localName: {
    id: 'LOCAL_NAME',
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

interface IProps {
  intl: InjectedIntl;
  path: string;
  children?: ReactNode;
}

const AppHelmet: React.SFC = ({ intl, path }: IProps) => {
  const title = intl.formatMessage(messages.title);
  const description = intl.formatMessage(messages.description);
  const localName = intl.formatMessage(messages.localName);
  let ogTitle: string = '';

  // Making the og:title to be dynamic based on each page title.
  if (__SERVER__) {
    const helmet = Helmet.rewind();
    if (helmet.title.toString().match(/>.+</gi)) {
      ogTitle = helmet.title
        .toString()
        .match(/>.+</gi)[0]
        .replace(/\<|\>/gi, '');
    }
  }

  const tags = {
    title,
    titleTemplate: `%s`,
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
        content: '66FOg5_DAyDr7kihZYrWG0oW-4hc8z20r7E8DAMiFiA',
      },
      {
        name: 'msvalidate.01',
        content: 'B3EB6CF2ACCBA23C47B1C80C51C49FA6',
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
        content: 'http://www.tarteel.io/public/og/main_en.png',
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
        content: ogTitle,
      },
      {
        property: 'og:description',
        content: description,
      },
      {
        property: 'og:url',
        content: `https://www.tarteel.io` + path,
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
        content: ogTitle,
      },
      {
        name: 'twitter:description',
        content: description,
      },
      {
        name: 'twitter:image',
        content: 'http://www.tarteel.io/public/og/main_en.png',
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
      {
        rel: 'preconnect',
        href: 'https://d2sf46268wowyo.cloudfront.net',
        crossOrigin: '',
      },
      // {
      //   rel: 'preconnect',
      //   href: 'https://assets-1f14.kxcdn.com',
      //   crossOrigin: '',
      // },
      ...Object.keys(config('locales')).map(key => ({
        rel: 'alternate',
        hrefLang: key,
        href: `https://www.tarteel.io?lang=${key}`,
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
            "url": "https://www.tarteel.io",
          }`,
      },
      {
        type: 'application/ld+json',
        innerHTML: `{
            "@context": "http://schema.org",
            "@type": "Organization",
            "url": "https://www.tarteel.io",
            "logo": "https://d2sf46268wowyo.cloudfront.net/logo-3x.png"
          }`,
      },
    ],
  };

  return <Helmet {...tags} />;
};

export default injectIntl(AppHelmet);
