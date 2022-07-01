import React, { useEffect, useState } from 'react';
import styles from '../styles/Conversations.module.css';

import Loader from './Loader';

const Messages = ({ messages, conversations, loading }) => {

  return (
    <>
      {loading ? (
        <div className={styles.loader}>
          <Loader />
        </div>
      ) : (
        <div className={styles.conversation}>
          <div>
            {messages.map((message) => (
              <p key={message.id} className={styles.message}>{message.body}</p>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Messages;
