import React from 'react';
import { FC } from 'react';

interface UserListProps {
  items: { id: number; nickname: string }[];
}

const UserList: FC<UserListProps> = (props) => {
  return (
    <ul>
      {props.items.map((user) => (
        <li key={user.id}>
          <span>{user.nickname}</span>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
