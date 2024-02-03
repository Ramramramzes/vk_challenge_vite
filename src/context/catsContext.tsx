import { createContext, ReactNode, useState } from "react";

interface IDataObj {
  imageList: { id: string; url: string }[];
  addImage: (id: string, url: string) => void;
  removeImage: (id: string) => void;
}

const defaultContextValue: IDataObj = {
  imageList: [],
  addImage: () => {},
  removeImage: () => {},
};

// eslint-disable-next-line react-refresh/only-export-components
export const catsContext = createContext<IDataObj>(defaultContextValue);

export function UseCatsContext({ children }: { children: ReactNode }) {
  const [contextValue, setContextValue] = useState<IDataObj>(defaultContextValue);

  const addImage = (id: string, url: string) => {
    setContextValue((prev) => {
      return { ...prev, imageList: [...prev.imageList, { id, url }] };
    });
  };

  const removeImage = (id: string) => {
    setContextValue((prev) => {
      return { ...prev, imageList: prev.imageList.filter((image) => image.id !== id) };
    });
  };

  return (
    <catsContext.Provider value={{ ...contextValue, addImage, removeImage }}>
      {children}
    </catsContext.Provider>
  );
}
