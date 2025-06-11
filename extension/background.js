/*let mediaRecorder;
let recordedChunks = [];

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type === 'start-recording') {
    const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    
    chrome.tabCapture.capture({ audio: true, video: false }, async (tabStream) => {
      const context = new AudioContext();
      const destination = context.createMediaStreamDestination();

      const micSource = context.createMediaStreamSource(micStream);
      const tabSource = context.createMediaStreamSource(tabStream);

      micSource.connect(destination);
      tabSource.connect(destination);

      const combinedStream = destination.stream;

      recordedChunks = [];
      mediaRecorder = new MediaRecorder(combinedStream);

      mediaRecorder.ondataavailable = e => {
        if (e.data.size > 0) recordedChunks.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(recordedChunks, { type: 'audio/webm' });

        const formData = new FormData();
        formData.append('audio', blob, 'latest.webm');

        try {
          const uploadRes = await fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData
          });

          if (uploadRes.ok) {
            const testRes = await fetch('http://localhost:3000/test');
            const result = await testRes.json();
            chrome.runtime.sendMessage({ type: 'summary', summary: result.summary });
          } else {
            console.error('Upload failed:', await uploadRes.text());
          }
        } catch (err) {
          console.error('Error during upload or test:', err);
        }
      };

      mediaRecorder.start();
    });
  }

  if (message.type === 'stop-recording') {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
    }
  }
});*/
