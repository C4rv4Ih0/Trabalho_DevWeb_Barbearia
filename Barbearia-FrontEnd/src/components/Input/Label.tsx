import React from "react";

interface LabelProperties {
  label: string;
  htmlFor: string;
}

export default function Label({ label, htmlFor }: LabelProperties) {
  return <label htmlFor={htmlFor}>{label}</label>;
}
