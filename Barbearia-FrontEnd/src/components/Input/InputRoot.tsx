import React from "react";

interface InputRootProperties {
  children: React.ReactNode;
}

export default function InputRoot({ children }: InputRootProperties) {
  return <div className="form-group">{children}</div>;
}
