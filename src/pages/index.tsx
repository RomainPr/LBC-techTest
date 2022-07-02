import React from 'react';

import styles from '../styles/Home.module.css';

import Conversations from '../components/Conversations';

const ConversationsList = ({ data }) => {
  return (
    <div className={styles.home}>
      <div className={styles.main}>
        <Conversations allUsers={data} />
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
