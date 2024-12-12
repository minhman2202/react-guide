import {createPortal} from "react-dom";
import {useRef, useImperativeHandle} from "react";
import Button from "./Button.jsx";

export default function Modal({ref, children, buttonCaption}) {
  const dialog = useRef();

  useImperativeHandle(ref, () => ({
    show: () => dialog.current.showModal(),
    close: () => dialog.current.close()
  }));

  return createPortal(
    <dialog ref={dialog} className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md">
      {children}
      <form method="dialog" className="mt-4 text-right">
        <Button>{buttonCaption}</Button>
      </form>
    </dialog>,
    document.getElementById("modal-root"));
}