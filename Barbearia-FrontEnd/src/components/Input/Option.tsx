import React from "react";

interface OptionProperties {
  key: string;
  value: string;
  label: string;
}

export default function Option({ key, value, label }: OptionProperties) {
  return (
    <option key={key} value={value}>
      {label}
    </option>
  );
}
