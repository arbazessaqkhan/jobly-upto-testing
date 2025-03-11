import React from "react";
import {LineAwesomeIcon} from "@lib/common/line-awesome.icons";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const variants = ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark", "link"] as const;
export type Variant = typeof variants[number];


export interface CommonButtonProps {
    loading: boolean;
    children: React.ReactNode;
    variant?: Variant ;
    onClick?: () => void;
    prefixIcon?: LineAwesomeIcon;
    suffixIcon?: LineAwesomeIcon;
}
export function CommonButton({loading, children, onClick,prefixIcon, suffixIcon, variant ="primary", ...props}: CommonButtonProps) {
  return (
      <button type="submit" className={`btn btn-${variant}`} role="button" disabled={loading} {...props} onClick={onClick}>


          {loading && <span className="spinner-border" style={{
              width: '16px',
              height: '16px',
              marginRight: '5px',
          }} role="status">

          </span>}


          {prefixIcon &&  <i className={`las ${prefixIcon} mr-2`}></i>}
            {children}

          {suffixIcon &&  <i className={`"las ${suffixIcon} ml-2`}></i>}
      </button>
  );
}