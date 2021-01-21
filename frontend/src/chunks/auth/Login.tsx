import React from "react";
import SuccessButton from "../../components/SuccessButton";

import { login } from "../../util/auth";

const Login = () => {
  return (
    <SuccessButton onClick={() => login("string", "string")}>
      Login
    </SuccessButton>
  );
};

export default Login;
