import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ConversationsList from './ConversationsList';

const Conversations = ({ userId, nickname }) => {
  const [conversations, setConversationsList] = useState([]);

  const getConversations = async () => {
    const { data } = await axios.get(`http://localhost:3005/conversations/${userId}`);
    setConversationsList(data);
  }

  useEffect(() => {
    getConversations();
  }, []);

  return <ConversationsList conversations={conversations} nickname={nickname} userId={userId} />;
};

export default Conversations;
