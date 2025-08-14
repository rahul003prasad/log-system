// src/services/socket.js
let socket;

export function connectWebSocket(onMessage) {
  // Replace with your backend URL if different
  socket = new WebSocket('ws://localhost:5000');

  socket.onopen = () => {
    console.log('Connected to WebSocket server');
  };

  socket.onmessage = (event) => {
    try {
      const message = JSON.parse(event.data);
      if (onMessage && message.type === 'NEW_LOG') {
        onMessage(message.payload);
      }
    } catch (err) {
      console.error('WebSocket message parse error', err);
    }
  };

  socket.onclose = () => {
    console.log('WebSocket disconnected');
  };
}

export function disconnectWebSocket() {
  if (socket) {
    socket.close();
  }
}
