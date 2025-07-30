import { useState } from "react";
import "./Input.css";

interface InputProps {
  onSubmit: (title: string) => void;
}

const Input: React.FC<InputProps> = ({ onSubmit }) => {
  const [ input, setInput ] = useState<string>("");

  const handleSubmit = () => {
    if (!input) return;

    onSubmit(input);

    setInput("");
  }

  return (
    <div className="container">
      <input type="text" className="input" value={input} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)} />
      <button className="button" onClick={handleSubmit}>Add</button>
    </div>
  )
}

export default Input
