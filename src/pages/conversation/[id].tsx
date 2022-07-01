import React, { FC } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css';

import Messages from '../../components/Messages';

const Conversation: FC = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className={styles.container}>
      <div className={styles.home}>
        <div className={styles.main}>
          <Messages id={id} />
        </div>
      </div>
    </div>
  );
};

export default Conversation;
