/**
 * This module is responsible for generating the HTML page response for
 * the react application middleware.
 */

/* eslint-disable react/no-danger */
/* eslint-disable react/no-array-index-key */

import PropTypes from 'prop-types';
import React, { Children } from 'react';
import serialize from 'serialize-javascript';

import config from '../../../../config/index';
import removeNil from '../../../shared/utils/arrays/removeNil';
import ifElse from '../../../shared/utils/logic/ifElse';
import getClientBundleEntryAssets from './getClientBundleEntryAssets';

import ClientConfig from '../../../../config/components/ClientConfig';
import fontsStyle from '../../../helpers/fontsStyle';
import HTML from '../../../shared/components/HTML/index';

// PRIVATES

function KeyedComponent({ children }) {
  return Children.only(children);
}

// Resolve the assets (js/css) for the client bundle's entry chunk.
const clientEntryAssets = getClientBundleEntryAssets();

function stylesheetTag(stylesheetFilePath) {
  return (
    <link href={stylesheetFilePath} media="screen, projection" rel="stylesheet" type="text/css" />
  );
}

function scriptTag(jsFilePath) {
  return <script type="text/javascript" src={jsFilePath} />;
}

function inlineStyle(body: any) {
  return <style dangerouslySetInnerHTML={{ __html: body }} />;
}

// COMPONENT

interface IProps {
  asyncComponentsState?: object;
  reduxData?: object;
  helmet?: object;
  nonce?: string;
  reactAppString?: string;
  styleTags?: HTMLStyleElement[];
}

const ServerHTML: React.SFC<any> = (props: IProps) => {
  const {
    asyncComponentsState,
    helmet,
    nonce,
    reactAppString,
    reduxData,
    styleTags,
  } = props;


  // Creates an inline script definition that is protected by the nonce.
  const inlineScript = (body: any) => (
    <script
      nonce={nonce}
      type="text/javascript"
      dangerouslySetInnerHTML={{ __html: body }}
    />
  );

  const isProd = process.env.NODE_ENV === 'production';

  const thirdPartyTags = [
    // ifElse(isProd)(() =>
    //   inlineScript(`(function(a,s,y,n,c,h,i,d,e){s.className+=' '+y;h.start=1*new Date;
    // h.end=i=function(){s.className=s.className.replace(RegExp(' ?'+y),'')};
    // (a[n]=a[n]||[]).hide=h;setTimeout(function(){i();h.end=null},c);h.timeout=c;
    // })(window,document.documentElement,'async-hide','dataLayer',4000,
    // {'GTM-PNMFTW3':true});`)
    // ),

    // ifElse(isProd)(() =>
    //   inlineScript(`
    //     (function(e,b){if(!b.__SV){var a,f,i,g;window.mixpanel=b;b._i=[];b.init=function(a,e,d){function f(b,h){var a=h.split(".");2==a.length&&(b=b[a[0]],h=a[1]);b[h]=function(){b.push([h].concat(Array.prototype.slice.call(arguments,0)))}}var c=b;"undefined"!==typeof d?c=b[d]=[]:d="mixpanel";c.people=c.people||[];c.toString=function(b){var a="mixpanel";"mixpanel"!==d&&(a+="."+d);b||(a+=" (stub)");return a};c.people.toString=function(){return c.toString(1)+".people (stub)"};i="disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config reset people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");for(g=0;g<i.length;g++)f(c,i[g]);b._i.push([a,e,d])};b.__SV=1.2;a=e.createElement("script");a.type="text/javascript";a.async=!0;a.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===e.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\\/\\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";f=e.getElementsByTagName("script")[0];f.parentNode.insertBefore(a,f)}})(document,window.mixpanel||[]);mixpanel.init("d3f9b2f15c4bf0509e85845b56921034");
    //   `)
    // ),

    // ifElse(isProd)(() => scriptTag(config('sentry.url'))),
    // ifElse(isProd)(() =>
    //   scriptTag(config('zendesk.url'), { id: config('zendesk.id') })
    // ),

  ];

  const headerElements = removeNil([
    ...ifElse(helmet)(() => helmet.meta.toComponent(), []),
    ...ifElse(helmet)(() => helmet.title.toComponent(), []),
    ...ifElse(helmet)(() => helmet.base.toComponent(), []),
    ...ifElse(helmet)(() => helmet.link.toComponent(), []),
    ifElse(clientEntryAssets && clientEntryAssets.css)(() => stylesheetTag(clientEntryAssets.css)),
    ...ifElse(helmet)(() => helmet.style.toComponent(), []),
    ...styleTags,
    stylesheetTag("//cdn-images.mailchimp.com/embedcode/horizontal-slim-10_7.css"),
  ]);

  const bodyElements = removeNil([
    ...thirdPartyTags,
    inlineScript(`window.__INITIAL_STATE__=${serialize(reduxData)};`),
    // Binds the client configuration object to the window object so
    // that we can safely expose some configuration values to the
    // client bundle that gets executed in the browser.
    <ClientConfig nonce={nonce} />,
    // Bind our async components state so the client knows which ones
    // to initialise so that the checksum matches the server response.
    // @see https://github.com/ctrlplusb/react-async-component
    ifElse(asyncComponentsState)(() =>
      inlineScript(
        `window.__ASYNC_COMPONENTS_REHYDRATE_STATE__=${serialize(asyncComponentsState)};`,
      ),
    ),
    // Enable the polyfill io script?
    // This can't be configured within a react-helmet component as we
    // may need the polyfill's before our client JS gets parsed.
    ifElse(config('polyfillIO.enabled'))(() =>
      scriptTag(`${config('polyfillIO.url')}?features=${config('polyfillIO.features').join(',')}`),
    ),

    inlineStyle(fontsStyle),

    // When we are in development mode our development server will
    // generate a vendor DLL in order to dramatically reduce our
    // compilation times.  Therefore we need to inject the path to the
    // vendor dll bundle below.
    ifElse(
      process.env.BUILD_FLAG_IS_DEV === 'true' && config('bundles.client.devVendorDLL.enabled'),
    )(() =>
      scriptTag(
        `${config('bundles.client.webPath')}${config(
          'bundles.client.devVendorDLL.name',
        )}.js?t=${Date.now()}`,
      ),
    ),
    ifElse(clientEntryAssets && clientEntryAssets.js)(() => scriptTag(clientEntryAssets.js)),
    ...ifElse(helmet)(() => helmet.script.toComponent(), []),
  ]);

  return (
    <HTML
      htmlAttributes={ifElse(helmet)(() => helmet.htmlAttributes.toComponent(), null)}
      headerElements={headerElements.map((x, idx) =>
        (<KeyedComponent key={idx}>
          {x}
        </KeyedComponent>),
      )}
      bodyElements={bodyElements.map((x, idx) =>
        (<KeyedComponent key={idx}>
          {x}
        </KeyedComponent>),
      )}
      appBodyString={reactAppString}
    />
  );
}

ServerHTML.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  asyncComponentsState: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  helmet: PropTypes.object,
  nonce: PropTypes.string,
  reactAppString: PropTypes.string,
};

// EXPORT

export default ServerHTML;
