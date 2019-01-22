import range from 'lodash/range';

import config from '../../config';

const baseUrl = config('fontsURL');

const makeFont = (pageNumber: string | number) => `
@font-face {
  font-family: p${pageNumber};
  src: url('${baseUrl}/fonts/ayahs/p${pageNumber}.ttf')
    format('truetype');
}
.p${pageNumber} {
  font-family: p${pageNumber};
}
.text-p${pageNumber} {
  font-family: text${pageNumber};
}
`;

const makePageNumberFonts = () =>
  range(604)
    .map(number => {
      const pageNumber = number + 1;

      return makeFont(pageNumber);
    })
    .join('');

const fonts = `
${makePageNumberFonts()}

.p0,
.text-p0 {
  font-family: quran-common;
  &.end {
    padding: 0;
    text-align: left;
  }
}

@font-face {
  font-family: 'surah_names';
  src: url('${baseUrl}/fonts/surah_names/surah_names.eot?yg3f94');
  src: url('${baseUrl}/fonts/surah_names/surah_names.eot?yg3f94#iefix')
      format('embedded-opentype'),
    url('${baseUrl}/fonts/surah_names/surah_names.ttf?yg3f94')
      format('truetype'),
    url('${baseUrl}/fonts/surah_names/surah_names.woff?yg3f94')
      format('woff'),
    url('${baseUrl}/fonts/surah_names/surah_names.svg?yg3f94#surah_names')
      format('svg');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'bismillah';
  src: url('${baseUrl}/fonts/bismillah/bismillah.eot?yg3f94');
  src: url('${baseUrl}/fonts/bismillah/bismillah.eot?yg3f94#iefix')
      format('embedded-opentype'),
    url('${baseUrl}/fonts/bismillah/bismillah.ttf?yg3f94')
      format('truetype'),
    url('${baseUrl}/fonts/bismillah/bismillah.woff?yg3f94')
      format('woff'),
    url('${baseUrl}/fonts/bismillah/bismillah.svg?yg3f94#bismillah')
      format('svg');
  font-weight: normal;
  font-style: normal;
}

#bismillah {
  font-family: 'bismillah';
  font-size: 60px;
  color: #000;
  padding: 25px 0;
}

`
  .replace(/\n/g, '')
  .replace(/\s/g, '');

export default fonts;
