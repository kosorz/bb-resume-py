import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import Resume from "./components/Resume/Resume";

function App() {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    //@ts-ignore

    content: () => componentRef.current,
  });

  return (
    <>
      <Resume
        //@ts-ignore
        ref={componentRef}
      />
      <button onClick={handlePrint}>Print this out!</button>
    </>
  );
}

export default App;
