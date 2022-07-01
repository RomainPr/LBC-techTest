import moment from 'moment';
import 'moment/locale/fr';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import styles from '../styles/Conversations.module.css';

const Conversations = ({ user }) => {
  const [conversations, setConversationsList] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      const { data } = await axios.get(
        `http://localhost:3005/conversations/${user.id}`
      );
      setConversationsList(data);
    };
    getConversations();
  }, [user.id]);

  moment.locale('fr');
  const userid = `--${user.id}`;
  const userNameShort = user.nickname.charAt(0);

  return (
    <>
      <div className={styles.conversation}>
        <div className={styles.conversationHeader}>
          <span className={`${styles.avatar} ${styles[userid]}`}>
            {userNameShort}
          </span>
          <div className={styles.conversationDescription}>
            <p>
              {conversations.length > 1 ? 'Conversations' : 'Conversation'} de{' '}
              <strong>{user.nickname}</strong>
            </p>
          </div>
        </div>

        {conversations.map((conversation) => (
          <div key={conversation.id} className={styles.conversationContent}>
            <div className={styles.content}>
              <div>
                <p>
                  Avec{' '}
                  <strong>
                    {conversation.recipientNickname === user.nickname
                      ? conversation.senderNickname
                      : conversation.recipientNickname}
                  </strong>
                </p>
                <p>
                  Dernier message reçu le{' '}
                  <strong>
                    {moment(conversation.lastMessageTimestamp, 'X').format(
                      'DD MMMM'
                    )}
                  </strong>
                </p>
              </div>
              <div>
                <Link href={`/conversation/${conversation.id}`}>
                  <button>Voir la conversation</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Conversations;
