import React from 'react';

function MessageItem({ message }) {
  const isSentByCurrentUser = message.senderId === 'currentUserId'; // Replace with actual user ID logic

  return (
    <div className={`message-item ${isSentByCurrentUser ? 'sent' : 'received'}`}>
      <div className="message-content">{message.content}</div>
      <div className="message-time">{new Date(message.timestamp).toLocaleTimeString()}</div>
    </div>
  );
}

export default MessageItem;
