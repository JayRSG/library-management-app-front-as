import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const FingerprintReader = () => {
  const [fingerprint, setFingerPrint] = useState('');
  const [rfid, setRfid] = useState('');

  useEffect(() => {
    const socket = io('http://sensor.libraryman.com');

    // Listen for 'fingerprintData' event from the server
    socket.on('sensors', (data) => {
      console.log(data);

      if (data?.id) {
        setRfid(data?.id)
      } else if (data?.fingerprint) {
        setFingerPrint(data?.fingerprint)
      }
    });

    // Clean up the socket connection when the component is unmounted
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      {/* <button onClick={handleFingerprintRequest}>Request Fingerprint Data</button> */}
      <div>
        <h2>Fingerprint Data:</h2>
        <p>{fingerprint}</p>
        <h2>RFID Data</h2>
        <p>{rfid}</p>
      </div>
    </div>
  );
};

export default FingerprintReader;
