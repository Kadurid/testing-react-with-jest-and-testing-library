import { useState } from "react";

function App() {
  const [buttonColor, setButtonColor] = useState({ backgroundColor: "red" });
  const [disabled, setDisabled] = useState(false);
  const newButtonColor = buttonColor.backgroundColor === "red" ? "blue" : "red";

  return (
    <div>
      <button
        style={buttonColor}
        onClick={() => {
          setButtonColor({ backgroundColor: newButtonColor });
        }}
        disabled={disabled}
      >
        {buttonColor.backgroundColor === "red"
          ? "Change to blue"
          : "Change to red"}
      </button>
      <input
        type="checkbox"
        defaultChecked={disabled}
        aria-checked={disabled}
        onChange={(e) => {
          setDisabled(e.target.checked);
        }}
      />
    </div>
  );
}

export default App;
