import React, { useState } from 'react';

const ElementContainer = () => {
  const [elements, setElements] = useState([]);

  const handleDragStart = (e, buttonId) => {
    e.dataTransfer.setData('buttonId', buttonId.toString());
    e.dataTransfer.effectAllowed = 'move';
  
    const draggingElement = document.createElement('div');
    draggingElement.classList.add('dragging-element');
    draggingElement.innerText = `Element ${buttonId}`;
  
    document.body.appendChild(draggingElement);
  
    const rect = e.target.getBoundingClientRect();
    const offsetX = rect.width / 2;
    const offsetY = rect.height / 4;
  
    e.dataTransfer.setDragImage(draggingElement, offsetX, offsetY);
  
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
    const newElement = {
      id: Date.now(),
      name: `Element ${buttonId}`,
      position: {
        x: e.clientX - e.currentTarget.getBoundingClientRect().left,
        y: e.clientY - e.currentTarget.getBoundingClientRect().top,
      },
    };

    setElements((prevElements) => [...prevElements, newElement]);
  };

  return (
    <div>
      <div
        className="dropzone"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{ height: '90vh', width: '90vw' }}
      >
        {elements.map((element) => (
          <div
            key={element.id}
            className="draggable-element"
            style={{
              position: 'absolute',
              left: element.position.x,
              top: element.position.y,
              width: '50px',
              height: '50px',
              backgroundColor: '#FF0000',
            }}
          >
            {element.name}
          </div>
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
