import React from 'react';

import { Container } from './styles';
import Navbar from '../../components/Navbar';
import RecordingButton from '../../components/RecordingButton';

const testingAyahText = "قل هو الله احد";

class FollowAlong extends React.Component {
  componentDidMount() {
    
  }
  render() {
    return (
      <Container>
        <Navbar />
        <div className={'ayah'} >
          <div className="text">
            {
              testingAyahText.split(' ')
            }
          </div>
          <RecordingButton />
        </div>
      </Container>
    )
  }
}

export default FollowAlong;

