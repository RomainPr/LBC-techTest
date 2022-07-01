import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/Conversations.module.css';

const Messages = ({ userId, id, nickname }) => {
  const [messagesList, setMessagesList] = useState([]);
  const [userConversation, setUserConversation] = useState([]);

  const renderedMessages = messagesList.map((message) => message.body);

  useEffect(() => {
    axios
      .get(`http://localhost:3005/conversations/${userId}`)
      .then((response) => {
        setUserConversation(response.data);
      });
  }, [userId]);

  useEffect(() => {
    axios.get(`http://localhost:3005/messages/${id}`).then((response) => {
      setMessagesList(response.data);
    });
  }, [id]);

  return (
    <div className={styles.conversation}>
      {userConversation.map((conversation) => (
        <div key={conversation.id}>
          <p>{conversation.recipientNickname}</p>
          <p>{renderedMessages}</p>
        </div>
      ))}
    </div>
  );
};

export default Messages;
