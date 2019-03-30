import React from 'react';
import { Helmet } from 'react-helmet';
import { InjectedIntl, injectIntl } from 'react-intl';
import styled from 'styled-components';

import KEYS from '../../locale/keys';
import Navbar from '../../components/Navbar';
import Image from '../../components/Image';
import Headline from '../../components/Headline';

// Partners Images
import iqraaLogo from '../../../public/images/partners/iqraa.png';
import isbLogo from '../../../public/images/partners/isb.png';
import isbccLogo from '../../../public/images/partners/ISBCC-evo.png';
import quranclubLogo from '../../../public/images/partners/quranclub.png';
import quranicLogo from '../../../public/images/partners/quranic.png';
import quranreflectLogo from '../../../public/images/partners/quranreflect.png';

interface IProps {
  intl: InjectedIntl;
}

class Partners extends React.Component<IProps> {
  public render() {
    const { intl } = this.props;

    return (
      <Container>
        <Helmet>
          <title>{intl.formatMessage({ id: KEYS.PARTNERS_LINK_TEXT })}</title>
        </Helmet>
        <Navbar />
        <div className="content">
          <Headline
            headtag={KEYS.PARTNERS_LINK_TEXT}
            paragraph={KEYS.PARTNERS_PARAGRAPH}
            width={45}
            align={'center'}
            paragraphGray
          />
          <FlexGird>
            <Row>
              <Image
                size={200}
                grey
                title={'ISB Logo'}
                linkUrl={'http://isboston.net/'}
                pictureUrl={isbLogo}
              />
              <Image
                size={100}
                grey
                title={'Quranic Logo'}
                linkUrl={'https://getquranic.com/'}
                pictureUrl={quranicLogo}
              />
              <Image
                size={200}
                grey
                title={'QuranReflect Logo'}
                linkUrl={'https://quranreflect.com/'}
                pictureUrl={quranreflectLogo}
              />
            </Row>
            <Row>
              <Image
                size={200}
                grey
                title={'QuranClub Logo'}
                linkUrl={'http://www.quranclub.org/'}
                pictureUrl={quranclubLogo}
              />
              <Image
                size={100}
                grey
                title={'IQRAA Logo'}
                linkUrl={'https://iqraapp.com/'}
                pictureUrl={iqraaLogo}
              />
              <Image
                size={200}
                grey
                title={'ISBCC Logo'}
                linkUrl={'http://Isbcc.org/'}
                pictureUrl={isbccLogo}
              />
            </Row>
          </FlexGird>
        </div>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;
  padding: 1em;
  box-sizing: border-box;

  .content {
    padding-top: 5em;
    display: flex;
    align-items: center;
    flex-flow: column;
    flex: 1;
    text-align: center;
  }
`;

const FlexGird = styled.div`
  display: -ms-flexbox;
  display: -webkit-box;
  display: inline-flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 5em 0;
  max-width: 100%;
`;

const Row = styled.div`
  display: flex;
  padding-bottom: 80px;
  width: 100%;
  margin: auto;
  align-items: center;
  justify-content: space-around;
  @media screen and (max-width: ${props => props.theme.breakpoints.md}px) {
    flex-wrap: wrap;
    padding-bottom: unset;
  }
`;

export default injectIntl(Partners);
