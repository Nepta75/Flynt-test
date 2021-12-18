import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';

export const useAlertMessage = () => {
  const [message, setMessage] = useState(null);

  const renderMessage = () => {
    if (message && message?.message?.length > 0) {
      return (
        <Alert
          onClose={() => setMessage(null)}
          variant={message.error ? 'danger' : 'success'}
          dismissible
        >
          {message.message}
        </Alert>
      )
    }
  }

  return {
    renderMessage,
    setMessage,
  }
}