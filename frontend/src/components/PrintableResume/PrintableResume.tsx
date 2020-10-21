import React from "react";
import Resume from "../Resume/Resume";

class PrintableResume extends React.Component {
  render() {
    return <Resume editable={false} />;
  }
}

export default PrintableResume;
