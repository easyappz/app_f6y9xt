import React from 'react';
import ChatItem from './ChatItem';

function ChatList({ chats, onSelectChat, selectedChatId }) {
  return (
    <div className="chat-list">
      {chats.length === 0 ? (
        <div className="no-chats">Нет активных чатов</div>
      ) : (
        chats.map((chat) => (
          <ChatItem
            key={chat.id}
            chat={chat}
            onSelect={() => onSelectChat(chat)}
            isSelected={selectedChatId === chat.id}
          />
        ))
      )}
    </div>
  );
}

export default ChatList;
