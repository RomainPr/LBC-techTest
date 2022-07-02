import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LBCLogo from '../assets/Leboncoin_Logo.svg';
import styles from '../styles/Header.module.css';

const Layout = ({ children }) => (
  <>
    <Link href="/">
      <div className={styles.header}>
        <Image src={LBCLogo} alt="LBC_Logo" width={300} height={100} />
      </div>
    </Link>

    <div>{children}</div>
  </>
);

export default Layout;
