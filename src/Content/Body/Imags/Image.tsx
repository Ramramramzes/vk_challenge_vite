import { useState, useEffect } from 'react';
import styles from './image.module.css';
import { useContext } from 'react';
import { catsContext } from '../../../context/catsContext';
import { Icon_b } from '../../../Image/icon_b';
import { Icon } from '../../../Image/icon'; 

interface IImageProps {
  hover: boolean;
  url: string;
  id: string;
}

export function Image({ hover, url, id }: IImageProps) {
  const [isActive, setIsActive] = useState(false);
  const [isInFavCats, setIsInFavCats] = useState(false);
  const context = useContext(catsContext);

  useEffect(() => {
    // Проверяем, содержится ли id в localStorage
    const favCatsFromStorage = localStorage.getItem('favCats');
    if (favCatsFromStorage) {
      const favCatsArray = JSON.parse(favCatsFromStorage);
      // Проверяем, есть ли текущий id в списке избранных
      const isInLocalStorage = favCatsArray.some((cat: IImageProps) => cat.id === id);
      setIsInFavCats(isInLocalStorage);
    }
  }, [id]);

  if (!hover && !isInFavCats) {
    return null;
  }

  const handleClick = () => {
    if (context) {
      const { addImage, removeImage } = context;
      
      if (!isInFavCats) {
        addImage(id, url);
        setIsInFavCats(true);
        const favCatsFromStorage = localStorage.getItem('favCats');
        if (!favCatsFromStorage) {
          const newFavCats = [{ id, url }];
          localStorage.setItem('favCats', JSON.stringify(newFavCats));
        } else {
          const favCatsArray = JSON.parse(favCatsFromStorage);
          favCatsArray.push({ id, url });
          localStorage.setItem('favCats', JSON.stringify(favCatsArray));
        }
      } else {
        removeImage(id);
        setIsInFavCats(false);
        const favCatsFromStorage = localStorage.getItem('favCats');
        if (favCatsFromStorage) {
          const favCatsArray = JSON.parse(favCatsFromStorage);
          const updatedFavCatsArray = favCatsArray.filter((cat: IImageProps) => cat.id !== id);
          localStorage.setItem('favCats', JSON.stringify(updatedFavCatsArray));
        }
      }
    }
    setIsActive(!isActive);
  };

  return (
    <div className={styles.heart} onClick={handleClick}>
      {isInFavCats ? <Icon /> : <Icon_b />}
    </div>
  );
}
