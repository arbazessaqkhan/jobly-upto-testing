import React from "react";
import {LineAwesomeIcon} from "@lib/common/line-awesome.icons";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const BUTTON_VARIANTS = ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark", "link"] as const;
export type ButtonVariantsType = typeof BUTTON_VARIANTS[number];


export interface CommonButtonProps {
    loading?: boolean;
    children: React.ReactNode;
    variant?: ButtonVariantsType ;
    onClick?: () => void;
    prefixIcon?: LineAwesomeIcon;
    suffixIcon?: LineAwesomeIcon;
    type?: "submit" | "button";
    disabled?: boolean;
    dataTestId?: string;
}
export function CommonButton({loading, children, onClick,prefixIcon, suffixIcon, variant ="primary", type = "button", dataTestId, disabled,...props}: CommonButtonProps) {
  return (
      <button
          data-testid={dataTestId}
          type={type} className={`btn btn-${variant}`} role="button" disabled={disabled || loading} {...props} onClick={onClick}>


          {loading && <span className="spinner-border" style={{
              width: '16px',
              height: '16px',
              marginRight: '5px',
          }} role="spinner">

          </span>}


          {prefixIcon &&  <i className={`las ${prefixIcon} mr-2`}></i>}


            {children}

          {suffixIcon &&  <i className={`"las ${suffixIcon} ml-2`}></i>}
      </button>
  );
}