import {createContext, useContext, useState} from "react";
import AccordionItem from "./AccordionItem.jsx";

const AccordionContext = createContext();

export function useAccordionContext() {
  const ctx = useContext(AccordionContext);

  if (!ctx) {
    throw new Error("Accordion compound components cannot be rendered outside the Accordion component");
  }

  return ctx;
}

export default function Accordion({children, className}) {
  const [openItemId, setOpenItemId] = useState(null);

  function toggleItem(id) {
    setOpenItemId(prevState => prevState === id ? null : id);
  }

  const contextValue = {
    openItemId,
    toggleItem,
  };

  return (
    <AccordionContext.Provider value={contextValue}>
      <ul className={className}>
        {children}
      </ul>
    </AccordionContext.Provider>
  );
}

Accordion.Item = AccordionItem;