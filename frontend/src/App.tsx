import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import Resume from "./components/Resume/Resume";
import MobxProvider from "./mobx";
import PrintableResume from "./components/PrintableResume/PrintableResume";

import style from "./App.module.scss";

function App() {
  const componentRef = useRef<PrintableResume>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <MobxProvider>
      <button onClick={handlePrint}>Print this out!</button>
      <Resume />
      <div className={style["PrintContent"]}>
        <PrintableResume ref={componentRef} />
      </div>
    </MobxProvider>
  );
}

export default App;
