import React, { useState, useEffect, Fragment } from 'react';
import styles from '../styles/Home.module.css';

import Conversations from '../components/Conversations';

const ConversationsList = ({ data }) => {
  const renderedConversations = data.map((user) => (
    <Conversations key={user.id} {...(user = { user })} />
  ));

  return (
    <div className={styles.container}>
      <div className={styles.home}>
        <div className={styles.main}>{renderedConversations}</div>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const res = await fetch('http://localhost:3005/users');
  const data = await res.json();
  return { props: { data } };
};

export default ConversationsList;
