import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../../styles/Conversation.module.css';

import Messages from '../../components/Messages';

const Conversation: FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [messagesList, setMessagesList] = useState([]);
  const [userConversation, setUserConversation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMessagesFromConversation = async () => {
      const { data } = await axios.get(`http://localhost:3005/messages/${id}`);
      setMessagesList(data);
      setLoading(false);
    };

    const getConversations = async () => {
      const { data } = await axios.get(
        `http://localhost:3005/conversations/${id}`
      );
      setUserConversation(data);
    };

    getConversations();
    getMessagesFromConversation();
  }, [id]);

  return (
    <div className={styles.container}>
      <div className={styles.conversation}>
        <div className={styles.main}>
          <div className={styles.conversationHeader}>
            <p>John</p>
          </div>
          <Messages messages={messagesList} conversations={userConversation} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Conversation;
