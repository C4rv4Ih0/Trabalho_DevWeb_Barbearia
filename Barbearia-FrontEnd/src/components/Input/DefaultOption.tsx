import React from "react";

interface DefaultOptionProperties {
  label: string;
  disabled?: boolean;
}

export default function Option({
  label,
  disabled = true,
}: DefaultOptionProperties) {
  return (
    <option value="" disabled={disabled}>
      {label}
    </option>
  );
}
