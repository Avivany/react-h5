import { useState } from 'react';

import reactLogo from '@/assets/react.svg';

import styles  from'./index.module.less';
import viteLogo from '/vite.svg';

function Home() {
  const [count, setCount] = useState(0);
  return (
    <div className={styles.pgHome}>
      <div className={styles.logoCont}>
        <a href="https://vite.dev" target="_blank" rel="noopener norefferrer" >
          <img src={viteLogo} className={styles.logo} alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener norefferrer">
          <img src={reactLogo} className={`${styles.logo} ${styles.react}`} alt="React logo" />
        </a>
      </div>
      <h1 className={styles.h1}>Vite + React</h1>
      <div className={styles.card}>
        <button className={styles.button} onClick={() => setCount((count) => count + 1)}>count is {count}</button>
      </div>
      <p className={styles.readTheDocs}>Click on the Vite and React logos to learn more</p>
    </div>
  );
}

export default Home;