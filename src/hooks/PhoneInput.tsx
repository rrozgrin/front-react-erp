import React, { useEffect, useRef } from "react";
import IMask from "imask";

interface PhoneInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

export function PhoneInput({ value, onChange, name }: PhoneInputProps) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      const mask = IMask(ref.current, {
        mask: [
          { mask: "(00) 0000-0000" },   // fixo
          { mask: "(00) 00000-0000" }   // celular
        ]
      });

      mask.on("accept", () => {
        // Criamos um evento sintético para compatibilidade com onChange
        const event = {
          target: { name, value: mask.value }
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      });

      return () => mask.destroy();
    }
  }, [onChange, name]);

  return (
    <input
      ref={ref}
      defaultValue={value}
      className="form-control"
      name={name}
    />
  );
}
