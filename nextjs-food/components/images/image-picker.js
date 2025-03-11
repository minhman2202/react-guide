'use client';

import {useRef, useState} from "react";
import Image from "next/image";

import classes from './image-picker.module.css';

export default function ImagePicker({label, name}) {
  const [pickedImage, setPickedImage] = useState();

  const imageInput = useRef();

  function handlePickClick() {
    imageInput.current.click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (!file) {
      setPickedImage(null); // make sure that the preview is reset
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            <Image src={pickedImage} alt="The image selected by the user." fill />
          )}
        </div>
        <input
          ref={imageInput}
          className={classes.input}
          type="file"
          id={name}
          name={name}
          accept="image/*" // accept="image/*" allows to select any image type
          onChange={handleImageChange}
        />
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