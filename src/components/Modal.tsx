import React from 'react';
import { X } from 'react-feather';

import styles from '../styles/Modal.module.css';

export default function Modal({
  className,
  onClose,
  onValidate,
  title,
  children,
}) {
  return (
    <div className={`${styles.customModal} ${className}`} onClick={onClose}>
      <div
        className={styles.customModalDialog}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.customModalHeader}>
          <h2>{title}</h2>
        </div>
        <button className={styles.closeModalButton} onClick={onClose}>
          <X size={30} />
        </button>
        <div className={styles.customModalContent}>{children}</div>
        <div className={styles.customModalFooter}>
          <button
            className={styles.customModalConfirmationButton}
            type="submit"
            onClick={onValidate}
          >
            Créer une conversation
          </button>
        </div>
      </div>
    </div>
  );
}
