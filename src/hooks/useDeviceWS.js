import { useEffect } from 'react';
import { useState } from 'react';

// command values can be - enroll, verify (fingerprint), register, read (rfid)
export const useDeviceData = () => {
  const wsServerURL = process.env.NEXT_PUBLIC_WS_SERVER_URL
  const [deviceData, setDeviceData] = useState(null)
  const [isScanning, setIsScanning] = useState(false)
  const [websocket, setWebSocket] = useState(null)

  useEffect(() => {
    if (wsServerURL) {
      const socket = new WebSocket(wsServerURL);

      socket.onopen = () => {
        console.log('WebSocket connection opened');
        setWebSocket(socket); // Save the WebSocket instance in state
      };

      socket.onclose = () => {
        console.log('WebSocket connection closed');
        // Optionally, you can handle reconnection here if needed
      };

      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        // socket.close(); // Close the WebSocket on error
      };
    }
  }, []);

  function communicateDevice(commands) {
    // Send a message to the server to request RFID data
    if (websocket?.readyState == 1) {

      websocket.send(JSON.stringify(commands))
      setIsScanning(true)

      // Receive the response from the server
      websocket.onmessage = (event) => {
        if (event?.data) {
          const data = JSON.parse(event?.data)
          setDeviceData(data)
          setIsScanning(false)
        }

        // Close the WebSocket connection after receiving the data
        // websocket.close();
      };

      // Handle WebSocket connection errors
      websocket.onerror = (error) => {
        console.error('Device error:', error)
        // websocket.close()
      };
    }
  };

  return {
    deviceData,
    isScanning,
    socket: websocket,
    communicateDevice
  };
};

