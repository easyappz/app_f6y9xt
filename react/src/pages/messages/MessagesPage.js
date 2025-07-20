import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { instance } from '../../api/axios';
import ChatList from '../../components/messages/ChatList';
import ChatWindow from '../../components/messages/ChatWindow';
import '../../styles/messages.css';

function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState(null);

  // Fetch chats list
  const { data: chats, isLoading, error } = useQuery(['chats'], async () => {
    const response = await instance.get('/api/message/chats');
    return response.data;
  }, {
    staleTime: 60000, // Cache for 1 minute
  });

  // Handle chat selection
  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <div className="messages-container">
      <div className="messages-sidebar">
        <h2>Сообщения</h2>
        {isLoading && <div>Загрузка...</div>}
        {error && <div>Ошибка загрузки чатов: {error.message}</div>}
        {chats && <ChatList chats={chats} onSelectChat={handleChatSelect} selectedChatId={selectedChat?.id} />}
      </div>
      <div className="messages-content">
        {selectedChat ? (
          <ChatWindow chat={selectedChat} />
        ) : (
          <div className="no-chat-selected">
            <p>Выберите чат, чтобы начать общение</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessagesPage;
