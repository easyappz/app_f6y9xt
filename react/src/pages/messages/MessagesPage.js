import React from 'react';
import './MessagesPage.css';

const MessagesPage = () => {
  return (
    <div className="messages-container">
      <div className="messages-sidebar">
        <div className="messages-block">
          <h3 className="messages-block-title">Чаты</h3>
          <div className="messages-chat-list">Список чатов</div>
        </div>
      </div>
      <div className="messages-main">
        <div className="messages-block">
          <h3 className="messages-block-title">Сообщения</h3>
          <div className="messages-chat-area">Область чата</div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
