// frontend/src/components/ui/CallButton.jsx
import React from 'react';

function CallButton({ phoneNumber }) {
  return (
    <button
      onClick={() => window.location.href = `tel:${phoneNumber}`}
      className="w-full mt-4 bg-secondary text-white py-2 rounded"
    >
      📞 Llamar al Cliente
    </button>
  );
}

export default CallButton;