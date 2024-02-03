import { useState } from 'react';
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
  const [defaultLink, setDefaultLink] = useState(false);

  const context = useContext(catsContext);
  
  if (!hover && !defaultLink) {
    return null;
  }

  const handleClick = () => {
    setDefaultLink(!defaultLink);
    if (context) {
      const { imageList, addImage, removeImage } = context;
      
      const imageIndex = imageList.findIndex((image) => image.id === id);

      if (imageIndex === -1) {
        addImage(id, url);
      } else {
        removeImage(id);
      }  
    }
    setIsActive(!isActive);
    
  };


  return (
    <div className={styles.heart} onClick={handleClick}>
      {defaultLink ? <Icon /> : <Icon_b />}
    </div>
  );
}

