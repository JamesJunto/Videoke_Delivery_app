let socket = null;

export const connectWebSocket = () => {
  if (socket) return;

  socket = new WebSocket("ws://192.168.254.110:3000");

  socket.onopen = () => {
    console.log("WebSocket connected");
    socket.send("Im here server");
  };

  socket.onmessage = (event) => {
    console.log("Server:", event.data);
  };

  socket.onerror = (error) => {
    console.log("WebSocket error:", error);
  };

  socket.onclose = () => {
    console.log("WebSocket closed");
    socket = null;
  };
};
export default connectWebSocket
