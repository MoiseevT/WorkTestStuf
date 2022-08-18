import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

const DropZoneTest = (props) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".png", ".gif", ".jpeg", ".jpg"],
    },
    onDrop: (acceptedFiles) => {
      let setPreviewLinks = acceptedFiles.map((file, index) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          position: props.images === 0 ? index : props.images.length + index,
        })
      );
      props.setImages([...props.images, ...setPreviewLinks]);
    },
  });
  return (
    <DragImageAreaStyled {...getRootProps()}>
      <input {...getInputProps()} />
      <DragImageHeaderStyled>
        Перетащите файлы или{" "}
        <span style={{ color: "#7367F0", cursor: "pointer" }}> выберите</span>
      </DragImageHeaderStyled>
      <DragImageWarningStyled>Максимальный размер: 8 МБ</DragImageWarningStyled>
    </DragImageAreaStyled>
  );
};
const DragImageAreaStyled = styled.div`
  width: 500px;
  height: 83px;
  border: 1px dashed #ebe9f1;
  border-radius: 6px;
  background: #fafafc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: default;
`;

const DragImageHeaderStyled = styled.div`
  color: black;
`;
const DragImageWarningStyled = styled.div`
  color: black;
  margin-top: 4px;
`;

export default DropZoneTest;
