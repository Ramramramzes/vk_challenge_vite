import React, { useEffect, useState } from 'react';
import styles from './body.module.css';
import { useCatsData } from '../../hooks/useCatsData';
import { Image } from './Imags';
import { useContext } from 'react';
import { catsContext } from '../../context/catsContext';

interface IBodyProps {
  dataState: boolean;
}

export function Body({ dataState }: IBodyProps) {
  const allCats = useCatsData();
  const favCats = useContext(catsContext)?.imageList;

  const dataCats = dataState ? favCats : allCats;

  const [hoveredItem, setHoveredItem] = useState('');

  const handleMouseEnter = (itemId: string) => {
    setHoveredItem(itemId);
  };

  const handleMouseLeave = () => {
    setHoveredItem('');
  };
  
  useEffect(() => {
    console.log("Updated imageList:", favCats);
    // Другие действия, если необходимо
  }, [favCats]);
  return (
    <ul className={styles.cats_list}>
      {dataCats.map((el) => {
        const imageStyles: React.CSSProperties = {
          backgroundImage: el.url ? `url('${el.url}')` : 'none',
        };
        return (
          <li
            key={el.id}
            className={styles.list_block}
            style={imageStyles}
            onMouseEnter={() => handleMouseEnter(el.id)}
            onMouseLeave={handleMouseLeave}>
            <Image hover={hoveredItem === el.id} url={el.url} id={el.id} />
          </li>
        );
      })}
    </ul>
  );
}
