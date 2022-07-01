import type { FC } from 'react';
import React, { useState, useEffect, Fragment } from 'react';
import axios, { AxiosResponse } from 'axios';
import styles from '../styles/Home.module.css';

import { User } from '../types/user';

import Conversations from '../components/Conversations';

const Home: FC = () => {
  const [userList, setUserList] = useState<User[]>([]);

  const getUsers = async () => {
    const { data } = await axios.get<User[]>('http://localhost:3005/users');
    setUserList(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const renderedConversations = userList.map((user) => (
    <Conversations key={user.id} userId={user.id} nickname={user.nickname} />
  ));

  return (
    <div className={styles.container}>
      <div className={styles.home}>
        <div className={styles.main}>{renderedConversations}</div>
      </div>
    </div>
  );
};

export default Home;
