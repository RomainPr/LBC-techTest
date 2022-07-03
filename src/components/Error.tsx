import React from 'react';
import Link from 'next/link';

import styles from '../styles/Error.module.css';

const Error = () => (
  <div className={styles.home}>
    <div className={styles.main}>
      <p>Aïe aïe aïe le serveur a crashé !!</p>
      <Link href="/">
        <button className='buttonLBC'>Revenir à l&apos;accueil</button>
      </Link>
    </div>
  </div>
);

export default Error;
