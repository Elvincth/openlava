import React, { useState } from "react";
import ResellPrice from "~/components/resellPrice";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <input type="button" value="Click to Open Popup" onClick={togglePopup} />
      {isOpen && (
        <ResellPrice
          content={<button>Test button</button>}
          handleClose={togglePopup}
        />
      )}
    </div>
  );
}

export default App;
