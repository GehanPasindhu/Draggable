import React,{useState, useEffect} from 'react'

function EditPanel({editElement, onClose, setElements, elements}) {
    const [elementName, setElmentName] = useState(editElement.name)
    const [backgroundColor, changeBackgroundColor] = useState(editElement.backgroundColor)
  
    const handleNameChange = (e) =>{
      setElmentName(e.target.value)
    }
  
    const setBackgroundColor = (color) =>{
  changeBackgroundColor(color)
    }
  
  
    const updateValues = () =>{
      const updatedElements = elements.map((el) => {
        if (el.id === editElement.id) {
          return {
            ...el,
            name: elementName,
            backgroundColor : backgroundColor
          };
        }
        return el;
      });
  
      setElements(updatedElements);
    }
  
    useEffect(()=>{updateValues()},[elementName, backgroundColor])
  
  
    return( 
      <>
        <div className="bg-black/90 text-white top-0 right-0 min-h-screen w-80 z-50 px-5 flex flex-col gap-3 fixed">
        <div className="flex flex-row gap-2 justify-between items-center border-b-2 border-green-500 p-2 my-4">
        <div className="text-lg ">Edit Your Component </div>
          <div className="closebutton text-white cursor-pointer" onClick={()=>onClose()}>X</div>
        </div>
  
        <div className="nameGroup">
            <div className="text-md text-start">Edit Name</div>
            <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={elementName}
            onChange={handleNameChange}
          />
        </div>
          </div>
          
          <div className="colorGroup">
            <div className="text-md text-start"> Change Background Color</div>
            <div className="grid grid-cols-5 gap-2 colorWheels my-2">
              <div className="w-10 h-10 rounded-full cursor-pointer bg-red-300" onClick={()=>setBackgroundColor("#FCA5A5")}></div>
              <div className="w-10 h-10 rounded-full cursor-pointer bg-green-300" onClick={()=>setBackgroundColor("#87EEAB")}></div>
              <div className="w-10 h-10 rounded-full cursor-pointer bg-yellow-300" onClick={()=>setBackgroundColor("#FDE046")}></div>
              <div className="w-10 h-10 rounded-full cursor-pointer bg-orange-300" onClick={()=>setBackgroundColor("#FDBA74")}></div>
              <div className="w-10 h-10 rounded-full cursor-pointer bg-blue-300" onClick={()=>setBackgroundColor("#92C5FD")}></div>
              <div className="w-10 h-10 rounded-full cursor-pointer bg-purple-300" onClick={()=>setBackgroundColor("#D8B3FE")}></div>
              <div className="w-10 h-10 rounded-full cursor-pointer bg-white" onClick={()=>setBackgroundColor("#f1f1f1")}></div>
              <div className="w-10 h-10 rounded-full cursor-pointer bg-black ring-1" onClick={()=>setBackgroundColor("#000000")}></div>
              <div className="w-10 h-10 rounded-full cursor-pointer bg-blue-700" onClick={()=>setBackgroundColor("#1C4ED8")}></div>
              <div className="w-10 h-10 rounded-full cursor-pointer bg-red-700" onClick={()=>setBackgroundColor("#B91C1B")}></div>
            </div>
          </div>
        </div>
      </>
    )
}

export default EditPanel