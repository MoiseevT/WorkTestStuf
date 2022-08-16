import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const ImageDropZone = () => {

  const [images, setImages] = useState([]);
  console.log(images);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".png", ".gif", ".jpeg", ".jpg"],
    },
    onDrop: (acceptedFiles) => {
      let setPreviewLinks = acceptedFiles.map((file, index) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          position: images === 0 ? index : images.length + index,
        })
      );
      setImages([...images, ...setPreviewLinks]);
    },
  });

  const onDeletingImage = (e) => {
    let currentImageIndex = images.findIndex(
      (file) => file.preview === e.target.src
    );
    images.splice(currentImageIndex, 1);
  };

  const changeVariationImagePosition = (props) => {
    console.log(props)
    images.splice(props[1], 0, images.splice(props[0], 1)[0]);
  };

  return (
    <AddImagesAreaStyled>
      <DragDropContext
        onDragEnd={(param) => {
          const srcIndex = param.source.index;
          const desIndex = param.destination?.index;
          changeVariationImagePosition([srcIndex, desIndex]);
        }}
      >
        <DragImageAreaStyled {...getRootProps()}>
          <input {...getInputProps()} />
          <DragImageHeaderStyled>
            Перетащите файлы или{" "}
            <span style={{ color: "#7367F0", cursor: "pointer" }}>
              {" "}
              выберите
            </span>
          </DragImageHeaderStyled>
          <DragImageWarningStyled>
            Максимальный размер: 8 МБ
          </DragImageWarningStyled>
        </DragImageAreaStyled>
        <Droppable droppableId="droppable-1" direction="horizontal">
          {(provided) => (
            <ImagesPreviewContainerStyled
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {images.map((file, index) => (
                <Draggable
                  key={file.position}
                  draggableId={"draggable-" + file.position}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <ImageContainerStyled
                      style={{
                        position: "relative",
                        ...provided.draggableProps.style,
                        boxShadow: snapshot.isDragging ? "0 0 .4rem" : "none",
                      }}
                      onClick={(e) => onDeletingImage(e)}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <StyledIMG src={file.preview} />
                      <DeleteIconAreaStyled>
                        {/*<DeleteIcon />*/}
                      </DeleteIconAreaStyled>
                    </ImageContainerStyled>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ImagesPreviewContainerStyled>
          )}
        </Droppable>
      </DragDropContext>
    </AddImagesAreaStyled>
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
const ImagesPreviewContainerStyled = styled.div`
  width: 500px;
  height: 126px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;
const ImageContainerStyled = styled.div`
  position: relative;
  &:hover {
    opacity: 0.48;
  }
`;
const DeleteIconAreaStyled = styled.div`
  display: none;
  ${ImageContainerStyled}:hover & {
    display: flex;
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: white;
    bottom: 29px;
    left: 35px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;
const StyledIMG = styled.img`
  display: block;
  width: 86px;
  height: 86px;
  margin-left: 8px;
  cursor: pointer;
  border-radius: 6px;
`;
const AddImagesAreaStyled = styled.div`
  width: 500px;
  height: 209px;
  display: flex;
  flex-direction: column;
`;

export default ImageDropZone;
