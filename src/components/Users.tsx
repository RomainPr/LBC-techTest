import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import UserList from './UserList';
import axios, { AxiosResponse } from 'axios';
import { User } from '../types/user';

const Users: FC = (props) => {
  const [users, setUserList] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get<User[]>('http://localhost:3005/users')
      .then((response: AxiosResponse) => {
        setUserList(response.data);
      });
  }, []);

  return <UserList items={users} />;
};
export default Users;
