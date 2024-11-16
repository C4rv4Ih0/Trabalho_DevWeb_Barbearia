import React, { ChangeEvent } from "react";

interface InputProperties {
  type: string;
  id: string;
  placeholder: string;
  required?: boolean;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  options?: any[];
  optionFormatter: (option: any) => string;
  shouldRenderInitialOption: boolean;
  initialValue: string;
  initialLabel: string;
}

export default function Input({
  type,
  id,
  placeholder,
  required,
  value,
  onChange,
}: InputProperties) {
  return (
    <input
      id={id}
      type={type}
      name={id}
      className="form-control"
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
    />
  );
}
