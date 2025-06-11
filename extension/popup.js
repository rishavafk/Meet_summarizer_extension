let mediaRecorder;
let recordedChunks = [];

document.getElementById('start').onclick = async () => {
  chrome.tabCapture.capture({ audio: true, video: false }, (stream) => {
    mediaRecorder = new MediaRecorder(stream);
    recordedChunks = [];

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
          console.log('Audio uploaded successfully!');

          // Now trigger /test
          const testRes = await fetch('http://localhost:3000/test');
          if (testRes.ok) {
            const result = await testRes.json();
            console.log('Pipeline complete. Summary:', result.summary);
            alert('Summary:\n' + result.summary); // Optional: show summary to user
          } else {
            console.error('Test pipeline failed:', await testRes.text());
          }
        } else {
          console.error('Upload failed:', await uploadRes.text());
        }
      } catch (err) {
        console.error('Error during upload or test:', err);
      }
    };

    mediaRecorder.start();
    document.getElementById('start').disabled = true;
    document.getElementById('stop').disabled = false;
  });
};

document.getElementById('stop').onclick = () => {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
    document.getElementById('start').disabled = false;
    document.getElementById('stop').disabled = true;
  }
};
