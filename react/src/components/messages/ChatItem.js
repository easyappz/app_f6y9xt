import React from 'react';

function ChatItem({ chat, onSelect, isSelected }) {
  return (
    <div
      className={`chat-item ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
    >
      <div className="chat-avatar">
        {chat.user.avatar ? (
          <img src={chat.user.avatar} alt={chat.user.name} />
        ) : (
          <div className="avatar-placeholder">{chat.user.name.charAt(0)}</div>
        )}
      </div>
      <div className="chat-info">
        <div className="chat-name">{chat.user.name}</div>
        <div className="chat-last-message">{chat.lastMessage || 'Нет сообщений'}</div>
      </div>
      {chat.unreadCount > 0 && (
        <div className="chat-unread-count">{chat.unreadCount}</div>
      )}
    </div>
  );
}

export default ChatItem;
