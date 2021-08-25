import { useState } from "react"

export default function About() {
  const [contador, setContador] = useState(1);

  function add() {
    setContador(contador + 1);
  }
  return (
    <>
      <div>ABOUT</div>
      <button onClick={add}>ABOUT</button>
      <div>{contador}</div>
    </>
  )
}