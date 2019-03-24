// Stream Audio
let bufferSize = 2048
let AudioContext
let context
let processor
let input
let globalStream;

// audioStream constraints
const constraints = {
  audio: true,
  video: false,
};

class AudioStreamer {
  /*
  * @param {function} onData Callback to run on data each time it's received
  * @param {function} onError Callback to run on an error if one is emitted.
  */
  constructor(socket) {
    this.socket = socket;

    this.initRecording = this.initRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.microphoneProcess = this.microphoneProcess.bind(this);
    this.convertFloat32ToInt16 = this.convertFloat32ToInt16.bind(this);
    this.closeAll = this.closeAll.bind(this);

  }
  initRecording(onData, onError) {
    this.socket.emit('startStream'); // init this.socket Google Speech Connection
    AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new AudioContext();
    processor = context.createScriptProcessor(bufferSize, 1, 1);
    processor.connect(context.destination);
    context.resume();

    const handleSuccess = (stream) => {
      globalStream = stream;
      input = context.createMediaStreamSource(stream);
      input.connect(processor);

      processor.onaudioprocess = this.microphoneProcess;
    };

    try {
      navigator.mediaDevices.getUserMedia(constraints)
        .then(handleSuccess)
          .catch(e => {
            if (e) {
              onError();
            }
          });
    } catch (e) {
      onError();
    }


    // Bind the data handler callback
    this.socket.on('speechData', (data) => {
      console.log(data.results[0] && data.results[0].alternatives[0]
      ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
      : `\n\nReached transcription time limit, press Ctrl+C\n`);

      if(onData) {
        onData(data);
      }
    });

    this.socket.on('streamError', (error: Error) => {
      if(onError) {
        onError('error');
      }
      // We don't want to emit another end stream event
      this.closeAll();
    });
  }

  stopRecording() {
    this.socket.emit('endStream');
    this.closeAll();
  }
  microphoneProcess(e) {
    /*
    * Processes microphone data into a data stream
    *
    * @param {object} e Input from the microphone
    */
    const left = e.inputBuffer.getChannelData(0);
    const left16 = this.convertFloat32ToInt16(left);
    this.socket.emit('binaryAudioData', left16);
  }
  convertFloat32ToInt16(buffer) {
    /*
    * Converts a buffer from float32 to int16. Necessary for streaming.
    * sampleRateHertz of 1600.
    *
    * @param {object} buffer Buffer being converted
    */
    let l = buffer.length;
    let buf = new Int16Array(l / 3);

    while (l--) {
      if (l % 3 === 0) {
        buf[l / 3] = buffer[l] * 0xFFFF;
      }
    }
    return buf.buffer
  }
  closeAll() {
    /*
    * Stops recording and closes everything down. Runs on error or on stop.
    */
    // Clear the listeners (prevents issue if opening and closing repeatedly)
    this.socket.off('speechData');
    this.socket.off('streamError');
    let tracks = globalStream ? globalStream.getTracks() : null;
    let track = tracks ? tracks[0] : null;
    if(track) {
      track.stop();
    }

    if(processor) {
      if(input) {
        try {
          input.disconnect(processor);
        } catch(error) {
          console.warn('Attempt to disconnect input failed.')
        }
      }
      processor.disconnect(context.destination);
    }
    if(context) {
      context.close().then(() => {
        input = null;
        processor = null;
        context = null;
        AudioContext = null;
      });
    }
  }
}

export default AudioStreamer;
