import { useState } from "react";

export function replaceCamelWithSpaces(colorName){
  return colorName.replace(/\B([A-Z])\B/g, ' $1');
}

function App() {
  const [buttonColor, setButtonColor] = useState({ backgroundColor: "red" });
  const [disabled, setDisabled] = useState(false);
  const newButtonColor = buttonColor.backgroundColor === "red" ? "blue" : "red";
  const [colorState, setColorState] = useState(buttonColor.backgroundColor);

  return (
    <div>
      <button
        style={buttonColor}
        onClick={() => {
          setButtonColor({ backgroundColor: newButtonColor });
          setColorState(newButtonColor);
        }}
        disabled={disabled}
      >
        {buttonColor.backgroundColor === "red"
          ? "Change to blue"
          : "Change to red"}
      </button>
      <input
        type="checkbox"
        id="disable-button-checkbox"
        defaultChecked={disabled}
        aria-checked={disabled}
        onChange={(e) => {
          setButtonColor({ backgroundColor: e.target.checked === true? 'gray' : colorState  })
          setDisabled(e.target.checked);
        }}
      />
      <label htmlFor="disable-button-checkbox">Disable Button</label>
    </div>
  );
}

export default App;
