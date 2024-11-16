import React, { ChangeEvent } from "react";

interface SelectProperties {
  children: React.ReactNode;
  id: string;
  required?: boolean;
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select({
  id,
  required,
  value,
  onChange,
  children,
}: SelectProperties) {
  return (
    <select
      id={id}
      name={id}
      className="form-control"
      value={value}
      onChange={onChange}
      required={required}
    >
      {children}
    </select>
  );
}
