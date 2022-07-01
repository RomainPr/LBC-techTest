import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/Conversations.module.css';

const Messages = ({ id }) => {
  const [messagesList, setMessagesList] = useState([]);
  const [userConversation, setUserConversation] = useState([]);

  const filteredRecipientMessage = messagesList.filter(
    ({ authorId }) => id === authorId.toString()
  );
  const filteredSenderMessage = messagesList.filter(
    ({ authorId }) => id !== authorId.toString()
  );

  const res = messagesList.filter((array_el) => {
    return userConversation.find((another_el) => {
      return another_el.senderId === array_el.authorId
    });
  })

  useEffect(() => {
    axios
      .get(`http://localhost:3005/conversations/${id}`)
      .then((response) => {
        setUserConversation(response.data);
      });
  }, [id]);

  useEffect(() => {
    axios.get(`http://localhost:3005/messages/${id}`).then((response) => {
      setMessagesList(response.data);
    });
  }, [id]);

  return (
    <div className={styles.conversation}>
      <>
        <div>
          {filteredSenderMessage.map((message) => (
            <p key={message.id}>{message.body}</p>
          ))}
        </div>
        <div>
          {filteredRecipientMessage.map((message) => (
            <p key={message.id}>{message.body}</p>
          ))}
        </div>
      </>
    </div>
  );
};

export default Messages;
