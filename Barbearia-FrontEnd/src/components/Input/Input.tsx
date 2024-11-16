import React, { ChangeEvent } from "react";

interface InputProperties {
  label?: string;
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

export default function Input<T>({
  label,
  type,
  id,
  placeholder,
  required,
  value,
  onChange,
  options,
  optionFormatter,
  shouldRenderInitialOption,
  initialValue,
  initialLabel,
}: InputProperties) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      {options ? (
        <select
          id={id}
          name={id}
          className="form-control"
          value={value}
          onChange={onChange}
          required={required}
        >
          {shouldRenderInitialOption ? (
            <option value={initialValue}>{initialLabel}</option>
          ) : (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options?.map((option) => (
            <option key={option.id} value={option.id}>
              {optionFormatter(option)}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={id}
          name={id}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
      )}
    </div>
  );
}
