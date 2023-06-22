import React, { useState } from 'react';
import Draggable from 'react-draggable';

const ElementContainer = () => {
  const [elements, setElements] = useState([]);

  const handleDragStart = (e, buttonId) => {
    e.dataTransfer.setData('buttonId', buttonId.toString());
    e.dataTransfer.effectAllowed = 'move';
  
    const draggingElement = document.createElement('div');
    draggingElement.style.width = '150px';
    draggingElement.style.height = '150px';
    draggingElement.style.backgroundColor = 'transparent';
    draggingElement.style.border = '2px dashed yellow';
    draggingElement.innerText = `Element ${buttonId}`;
  
    document.body.appendChild(draggingElement);
  
    // Set the dragged element as the drag image
    e.dataTransfer.setDragImage(draggingElement, 0, 0);
  
    setTimeout(() => {
      document.body.removeChild(draggingElement);
    }, 0);
  };
  
  
  
  

  const handleDragEnd = (e) => {
    const draggingElement = document.querySelector('.dragging-element');
    if (draggingElement) {
      draggingElement.classList.remove('dragging-element');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const buttonId = e.dataTransfer.getData('buttonId');
    
    const dropX = e.clientX - e.currentTarget.getBoundingClientRect().left;
    const dropY = e.clientY - e.currentTarget.getBoundingClientRect().top;
    
    const elementWidth = 150; 
    const elementHeight = 150;
    
    const dropzoneWidth = e.currentTarget.offsetWidth;
    const dropzoneHeight = e.currentTarget.offsetHeight;
    
    if (
      dropX < 0 ||
      dropX + elementWidth > dropzoneWidth ||
      dropY < 0 ||
      dropY + elementHeight > dropzoneHeight
    ) {
      return; 
    }
    
    const newElement = {
      id: Date.now(),
      name: `Element ${buttonId}`,
      position: {
        x: dropX,
        y: dropY,
      },
      showDeleteButton: true, 
    };
  
    setElements((prevElements) => [...prevElements, newElement]);
  };
  
  const handleDelete = (elementId) => {
    setElements((prevElements) =>
      prevElements.filter((element) => element.id !== elementId)
    );
  };

  return (
    <div style={{margin:"10px"}}>
      <div
        className="dropzone"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{ height: '85vh', width: '95vw', border:"2px solid red" }}
      >
        {elements.map((element) => (
          <Draggable
        grid={[25, 25]}
        scale={1}
            >
          <div
            key={element.id}
            id={element.id}
            className="draggable-element"
            style={{
              position: 'absolute',
              left: element.position.x,
              top: element.position.y,
              width: '150px',
              height: '150px',
              backgroundColor: '#FF0000',
            }}
          >
            {element.name}
            {element.showDeleteButton && ( 
              <button
                className="delete-button"
                onClick={() => handleDelete(element.id)}
              >
                Delete
              </button>
            )}
          </div>
          </Draggable>
        ))}
      </div>
      <div className="button-container">
        <button
          draggable
          onDragStart={(e) => handleDragStart(e, 1)}
          onDragEnd={handleDragEnd}
          id="btn1"
          style={{
            backgroundColor: '#FF0000',
          }}
        >
          Element 1
        </button>
        <button
          draggable
          onDragStart={(e) => handleDragStart(e, 2)}
          onDragEnd={handleDragEnd}
          id="btn2"
          style={{
            backgroundColor: '#FF0000',
          }}
        >
          Element 2
        </button>
        <button
          draggable
          onDragStart={(e) => handleDragStart(e, 3)}
          onDragEnd={handleDragEnd}
          id="btn3"
          style={{
            backgroundColor: '#FF0000',
          }}
        >
          Element 3
        </button>
      </div>
    </div>
  );
};

export default ElementContainer;
