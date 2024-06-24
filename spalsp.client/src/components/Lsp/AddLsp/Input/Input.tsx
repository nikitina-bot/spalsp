import { useState } from "react";
import { Button } from '@chakra-ui/react'

import "./Input.css";

export const Input = ( onSubmit:any) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (!input) return;

    onSubmit(input);

    setInput("");
  };

  return (
    <div className="container">
      <input
        className="input"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button
        variant="primary"
        type="submit"
        onClick={handleSubmit}
      >
        Добавить
      </Button>
    </div>
  );
};
