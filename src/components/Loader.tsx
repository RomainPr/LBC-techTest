import React from 'react';
import Image from 'next/image';
import Logo from '../assets/leboncoin-icon.png';
import styles from '../styles/Loader.module.css';

const Loader = () => (
  <div className={styles.loader}>
    <Image src={Logo} alt="LBC_logo" />
  </div>
);

export default Loader;
