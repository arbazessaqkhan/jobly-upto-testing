"use client";
import {FieldError, FieldValues, Path, UseFormRegister} from "react-hook-form";

/** Common (base) props for all form fields */
interface BaseFormFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>; // Ensures `name` matches keys of your form fields
  register: UseFormRegister<T>;
  error?: FieldError;
  placeholder?: string;
  loading?: boolean;
}

/** Props for text/number/checkbox fields */
interface InputFieldProps<T extends FieldValues> extends BaseFormFieldProps<T> {
  type: "text" | "number" | "checkbox";
  /** Only relevant if type is "number"; otherwise can be ignored */
  valueAsNumber?: boolean;
}

/** Props for textarea fields */
interface TextAreaFieldProps<T extends FieldValues> extends BaseFormFieldProps<T> {
  type: "textarea";
}

/** Props for select fields */
interface SelectFieldProps<T extends FieldValues> extends BaseFormFieldProps<T> {
  type: "select";
  options: { value: string; label: string }[];
}

/**
 * Combine all variations into a single union type:
 *   - text, number, checkbox
 *   - textarea
 *   - select
 */
export type FormFieldProps<T extends FieldValues> =
    | InputFieldProps<T>
    | TextAreaFieldProps<T>
    | SelectFieldProps<T>;

export default function FormField<T extends FieldValues>(props: FormFieldProps<T>) {
  const { label, name, register, error, placeholder } = props;

  return (
      <div className="mb-3">
        <label
            htmlFor={name}
            className={`form-label ${
                props.type === "checkbox" ? "form-check-label me-2" : ""
            }`}
        >
          {label}
        </label>

        {props.type === "select" && (
            <select
                className="form-select"
                id={name}
                {...register(name)}
                data-testid={name}
                disabled={props.loading}
            >
              {props.options.map((option) => (
                  <option
                      key={option.value}
                      value={option.value}
                      data-testid={option.value}
                  >
                    {option.label}
                  </option>
              ))}
            </select>
        )}

        {props.type === "textarea" && (
            <textarea
                data-testid={name}
                className="form-control"
                id={name}
                placeholder={placeholder}
                disabled={props.loading}
                {...register(name)}
            />
        )}

        {props.type !== "select" && props.type !== "textarea" && (
            <input
                data-testid={name}
                type={props.type}
                className={`${
                    props.type === "checkbox" ? "form-check-input" : "form-control"
                }`}
                disabled={props.loading}
                id={name}
                placeholder={placeholder}
                {...register(name, {
                  valueAsNumber: props.type === "number"
                      ? true
                      : props.valueAsNumber,
                })}
            />
        )}

        <div id="error" className="form-text">
          {error && <span className="error-message" style={{
            color: "red"
          }} >{error.message}</span>}
        </div>
      </div>
  );
}
