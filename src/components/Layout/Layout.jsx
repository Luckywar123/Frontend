import React from 'react';
import { Sidebar } from './components/Sidebar'; 

import styles from "./style.module.css";
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};
