import { useState } from 'react';
import styles from './content.module.css';
import { Body } from './Body';
import { UseCatsContext } from '../context/catsContext';

export function Content() {
  const[cats, setCats] = useState(false);

  const handleMouseClick1 = () => {
    setCats(false);
  };

  const handleMouseClick2 = () => {
      setCats(true);
  };
  return (
    <UseCatsContext>
      <div className={styles.background}>
        <div className={styles.btns}>
        <button className={styles.btn} onClick={handleMouseClick1}>Все котики</button>
        <button className={styles.btn} onClick={handleMouseClick2}>Любимые котики</button>
        </div>
        <Body dataState={cats} />
      </div>
    </UseCatsContext>
  );
}

