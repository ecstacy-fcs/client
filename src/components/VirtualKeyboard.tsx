import { useState } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

const VirtualKeyboard: React.FC<{
  onChange: (input: string) => void;
  keyboardRef: any;
}> = ({ onChange, keyboardRef }) => {
  const [layoutName, setLayoutName] = useState("default");
  const onKeyPress = (button: string) => {
    if (button === "{shift}" || button === "{lock}") {
      setLayoutName(layoutName === "default" ? "shift" : "default");
    }
  };
  return (
    <Keyboard
      keyboardRef={(ref: typeof Keyboard) => (keyboardRef.current = ref)}
      onChange={onChange}
      layoutName={layoutName}
      onKeyPress={onKeyPress}
    />
  );
};

export default VirtualKeyboard;
