import moment from 'moment';
import 'moment/locale/fr';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

import data from '../server/db.json';

import Modal from './Modal';

import styles from '../styles/Conversations.module.css';
import modalStyles from '../styles/Modal.module.css';

const Conversations = ({ allUsers }) => {
  const [conversations, setConversationsList] = useState(data.conversations);
  const [ShowCreateConversation, setShowCreateConversation] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedUserName, setSelectedUserName] = useState('');

  useEffect(() => {
    setConversationsList(data.conversations);
  }, []);

  moment.locale('fr');

  const onSelectUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserName(e.target.options[e.target.selectedIndex].text);
    setSelectedUserId(e.target.value);
  };

  const onCreateConversation = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    await axios.post(`http://localhost:3005/conversations/${selectedUserId}`, {
      recipientId: selectedUserId,
      recipientNickname: selectedUserName,
      senderId: 5,
      senderNickname: 'Romain',
    });
    setSelectedUserId('');
    setShowCreateConversation(false);
  };

  return (
    <>
      <div className={styles.createConversation}>
        <button
          className={styles.buttonConversation}
          onClick={() => setShowCreateConversation(true)}
        >
          Créer une nouvelle conversation
        </button>
      </div>
      {conversations.map((conversation) => (
        <div key={conversation.id} className={styles.conversation}>
          <div className={styles.conversationContent}>
            <div className={styles.content}>
              <span
                className={`${styles.avatar} ${
                  styles[conversation.senderNickname]
                }`}
              >
                {conversation.senderNickname.charAt(0)}
              </span>
              <div>
                <p>
                  Conversation entre{' '}
                  <strong>{conversation.senderNickname}</strong> et{' '}
                  <strong>{conversation.recipientNickname}</strong>
                </p>
                {conversation.lastMessageTimestamp && (
                  <p>
                    Dernier message reçu le{' '}
                    <strong>
                      {moment.unix(conversation.lastMessageTimestamp).format(
                        ("HH MMMM")
                      )}
                    </strong>
                  </p>
                )}
              </div>
            </div>
            <div>
              <Link href={`/conversation/${conversation.id}`}>
                <button className="buttonLBC">Voir la conversation</button>
              </Link>
            </div>
          </div>
        </div>
      ))}
      {ShowCreateConversation ? (
        <Modal
          className={modalStyles.show}
          title="Créer une nouvelle conversation"
          onClose={() => setShowCreateConversation(false)}
          onValidate={onCreateConversation}
        >
          <h2>Avec qui souhaitez-vous créer une conversation ?</h2>
          <select value={selectedUserId} onChange={onSelectUser} className={modalStyles.select}>
            <option value="" disabled>
              Veuillez sélectionner un utilisateur
            </option>
            {allUsers.map((user: any) => (
              <option key={user.id} value={user.id}>
                {user.nickname}
              </option>
            ))}
          </select>
        </Modal>
      ) : null}
    </>
  );
};

export default Conversations;
