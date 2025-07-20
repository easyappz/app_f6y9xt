import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { instance } from '../../api/axios';

const MessagesPage = () => {
  const { data: conversations, isLoading, error } = useQuery({
    queryKey: ['conversations'],
    queryFn: async () => {
      const response = await instance.get('/api/message/conversations');
      return response.data;
    },
  });

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка загрузки сообщений.</p>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2>Сообщения</h2>
      {conversations && conversations.length > 0 ? (
        conversations.map((conv) => (
          <Card key={conv._id} style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: '#1877f2',
                marginRight: '15px',
              }}
            ></div>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: 0 }}>{conv.participant?.name || 'Пользователь'}</h4>
              <small style={{ color: '#65676b' }}>{conv.lastMessage?.content || 'Нет сообщений'}</small>
            </div>
            <Button variant="secondary">Открыть</Button>
          </Card>
        ))
      ) : (
        <p>У вас нет активных переписок.</p>
      )}
    </div>
  );
};

export default MessagesPage;
