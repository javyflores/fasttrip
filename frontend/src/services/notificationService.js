// frontend/src/services/notificationService.js
import socket from '../utils/socketClient';

function listenForNewRequests(onRequestReceived) {
  socket.on('new-service-request', (request) => {
    onRequestReceived(request);
  });
}

export default {
  listenForNewRequests
};