import { useState } from "react";

function App() {
  const [buttonColor, setButtonColor] = useState({ backgroundColor: "red" });
  const newButtonColor = buttonColor.backgroundColor === "red"? "blue" : "red";
  return (
    <div>
      <button
        style={buttonColor}
        onClick={() => {
          setButtonColor({ backgroundColor: newButtonColor });
        }}
      >
        {buttonColor.backgroundColor === "red"
          ? "Change to blue"
          : "Change to red"}
      </button>
    </div>
  );
}

export default App;
