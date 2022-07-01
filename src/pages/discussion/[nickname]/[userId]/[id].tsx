import React, { FC } from 'react';
import { useRouter } from 'next/router';

import Messages from '../../../../components/Messages';

const Discussion: FC = () => {
  const router = useRouter();
  const { id, userId, nickname } = router.query;

  return <Messages id={id} userId={userId} nickname={nickname} />;
};

export default Discussion;
