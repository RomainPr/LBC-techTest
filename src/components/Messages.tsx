import React, { useEffect, useState, useRef } from 'react';
import moment, { max } from 'moment';
import axios from 'axios';
import { Send } from 'react-feather';

import Error from '../components/Error';

import styles from '../styles/Messages.module.css';

const Messages = ({ messages, conversationId, conversation }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [messagesList, setMessagesList] = useState(messages);
  const [error, setError] = useState();

  useEffect(() => {
    setMessagesList(messages);
  }, [messages]);

  const formattedDate = Math.floor(Date.now() / 1000);

  const newMessages = messages.map((message) => {
    return {
      ...message,
      nickName:
        message.authorId === conversation.senderId
          ? conversation.senderNickname
          : conversation.recipientNickname,
      senderMessage:
        message.authorId === conversation.senderId ? message.body : '',
      recipientMessage:
        message.authorId !== conversation.senderId ? message.body : '',
    };
  });

  const sortedMessages = newMessages
    .sort((convA: any, convB: any) => {
      const firstDate = convA.timestamp;
      const secondDate = convB.timestamp;

      if (moment(firstDate).isBefore(moment(secondDate))) {
        return 1;
      } else if (moment(firstDate).isAfter(moment(secondDate))) {
        return -1;
      } else return 0;
    })
    .reverse();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    if (messagesRef.current) {
      messagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [sortedMessages]);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await axios
      .post(`http://localhost:3005/messages/${conversationId}`, {
        authorId: conversation.senderId,
        body: inputValue,
        conversationId: Number(conversationId),
        timestamp: formattedDate,
      })
      .catch((error) => {
        setError(error);
      });
    setInputValue('');
  };

  if (error) {
    return <Error />;
  }

  return (
    <>
      <div className={styles.messagesHeader}>
        <p>{conversation && conversation.senderNickname} {conversation.senderNickname === 'Romain' ? '- Vous' : ''}</p>
        {conversation && conversation.lastMessageTimestamp && (
          <p>
            Dernier message le{' '}
            {moment.unix(conversation.lastMessageTimestamp).format('HH MMMM')}
          </p>
        )}
      </div>
      <div className={styles.messagesContainer}>
        <div className={styles.messages}>
          {sortedMessages.map((message: any) => (
            <div key={message.id}>
              <p className={styles.message}>{message.nickName}</p>
              <p
                className={`${styles.messageInnerTest} ${styles.message} ${
                  conversation.senderId === message.authorId
                    ? styles.owner
                    : styles.recipient
                }`}
              >
                {message.body}
              </p>
            </div>
          ))}
          <div ref={messagesRef} />
        </div>
        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={onSubmit}>
            <input
              ref={inputRef}
              className={styles.formInput}
              type="text"
              placeholder="Saisissez votre message..."
              value={inputValue}
              onChange={onInputChange}
              required
              pattern="^(?!\s*$).+"
            />
            <button className={styles.formSubmit} type="submit">
              <Send size={32} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Messages;
