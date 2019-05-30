import Recorder from 'recorder-js';

import { createAudioMeter } from './volume-meter';

let audioContext: any;
export let recorder: any;
let audioStream: any;
let meter: any;
let currentBlob: Blob;

export const getBlob: () => Blob = () => currentBlob;

// Handles the animation of the mic button while recording based on the voice volume.
function drawLoop() {
  const mic: null | HTMLElement = document.querySelector('.mic');
  if (mic) {
    mic.style.transform = `scale(${1 +
      Number(parseFloat(meter.volume).toFixed(2))})`;
  }
  const rafID = window.requestAnimationFrame(drawLoop);
}

function startUserMedia(stream: any) {
  audioStream = stream;
  meter = createAudioMeter(audioContext);
  recorder = new Recorder(audioContext);
  recorder.init(stream);
  recorder.realAudioInput.connect(meter);
  drawLoop();
  if (recorder) {
    recorder.start().catch(e => {
      console.log(e);
    });
  }
}

export function stopRecording() {
  if (recorder) {
    return recorder.stop().then(({ blob }: { blob: Blob }) => {
      currentBlob = blob;
      meter.shutdown();
      audioStream.getTracks()[0].stop();
    });
  } else {
    return Promise.reject();
  }
}

export async function startRecording(props?: any) {
  // Default error handler
  let onError = (e: string) => console.log(e);
  if (props && props.onError) {
    onError = props.onError;
  }

  try {
    // webkit shim.
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    navigator.getUserMedia =
      navigator.getUserMedia || navigator.webkitGetUserMedia;
    window.URL = window.URL || window.webkitURL;
    if (!audioContext) {
      audioContext = new AudioContext();
    }
  } catch (e) {
    console.log('No web audio support in this browser! ', e.message);
  }

  try {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream: MediaStream) => {
        startUserMedia(stream);
      })
      .catch(e => {
        if (e) {
          onError(e);
        }
      });
  } catch (e) {
    onError(e);
  }
}
