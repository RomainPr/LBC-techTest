import React, { FC, useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/fr';
import { useRouter } from 'next/router';
import styles from '../../styles/Conversation.module.css';

import data from '../../server/db.json';

import Messages from '../../components/Messages';

const Conversation = () => {
  moment.locale('fr');
  const router = useRouter();
  const { conversationId } = router.query;

  const findMessagesFromConversation = data.messages.filter(
    (item) => item.conversationId === Number(conversationId)
  );
  const conversation = data.conversations.find(
    ({ id }) => id === Number(conversationId)
  );

  return (
    <div className={styles.conversation}>
      <div className={styles.main}>
        <Messages
          messages={findMessagesFromConversation}
          conversationId={conversationId}
          conversation={conversation}
        />
      </div>
    </div>
  );
};

export default Conversation;
