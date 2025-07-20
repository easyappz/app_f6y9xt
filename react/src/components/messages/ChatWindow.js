import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { instance } from '../../api/axios';
import MessageItem from './MessageItem';

function ChatWindow({ chat }) {
  const [newMessage, setNewMessage] = useState('');
  const queryClient = useQueryClient();
  const messagesEndRef = useRef(null);

  // Fetch messages for the selected chat
  const { data: messages, isLoading, error } = useQuery(
    ['messages', chat.id],
    async () => {
      const response = await instance.get(`/api/message/chat/${chat.id}`);
      return response.data;
    },
    { staleTime: 60000 }
  );

  // Mutation for sending a new message
  const sendMessageMutation = useMutation(
    async (messageData) => {
      const response = await instance.post('/api/message/send', messageData);
      return response.data;
    },
    {
      onSuccess: () => {
        // Invalidate messages and chats to refresh data
        queryClient.invalidateQueries(['messages', chat.id]);
        queryClient.invalidateQueries(['chats']);
        setNewMessage('');
      },
    }
  );

  // Scroll to the bottom of messages on load and new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessageMutation.mutate({
        chatId: chat.id,
        content: newMessage,
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="chat-avatar">
          {chat.user.avatar ? (
            <img src={chat.user.avatar} alt={chat.user.name} />
          ) : (
            <div className="avatar-placeholder">{chat.user.name.charAt(0)}</div>
          )}
        </div>
        <div className="chat-name">{chat.user.name}</div>
      </div>
      <div className="chat-messages">
        {isLoading && <div>Загрузка сообщений...</div>}
        {error && <div>Ошибка загрузки сообщений: {error.message}</div>}
        {messages && messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Напишите сообщение..."
        />
        <button onClick={handleSendMessage} disabled={sendMessageMutation.isLoading}>
          Отправить
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;
