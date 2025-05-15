// frontend/src/components/ui/CallButton.jsx
import React from 'react';

function CallButton({ phoneNumber }) {
  return (
    <button className="call-button" onClick={() => window.location.href = `tel:${phoneNumber}`}>
      📞 Llamar al Cliente
    </button>
  );
}

export default CallButton;