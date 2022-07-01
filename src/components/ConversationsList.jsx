import moment from 'moment';
import 'moment/locale/fr';
import React from 'react';
import Link from 'next/link';

import styles from '../styles/Conversations.module.css';

const ConversationsList = ({ conversations, nickname, userId }) => {
  moment.locale('fr');
  const id = `--${userId}`;
  const userNameShort = nickname.charAt(0);

  return (
    <>
      {conversations.map((conversation) => (
        <div key={conversation.id} className={styles.conversation}>
          <div className={styles.conversationHeader}>
            <span className={`${styles.avatar} ${styles[id]}`}>
              {userNameShort}
            </span>
            <div className={styles.conversationDescription}>
              <p>
                {conversations.length > 1 ? 'Conversations' : 'Conversation'} de{' '}
                <strong>{nickname}</strong>
              </p>
            </div>
          </div>

          <div className={styles.conversationContent}>
            <div>
              <div className={styles.content}>
                <p>
                  Avec <strong>{conversation.senderNickname}</strong>
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
            </div>
            <div>
              <Link href={`/discussion/${nickname}/${userId}/${conversation.id}`}>
                <button>Voir la conversation</button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ConversationsList;
