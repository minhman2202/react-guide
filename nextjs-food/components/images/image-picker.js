'use client';

import {useRef} from "react";

import classes from './image-picker.module.css';

export default function ImagePicker({label, name}) {
  const imageInput = useRef();

  function handlePickClick() {
    imageInput.current.click();
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <input
          ref={imageInput}
          className={classes.input}
          type="file"
          id={name}
          name={name}
          accept="image/*"/> {/* // accept="image/*" allows to select any image type */}
        <button
          className={classes.button}
          onClick={handlePickClick}
          type="button">
          Pick an Image
        </button>
      </div>
    </div>
  );
}