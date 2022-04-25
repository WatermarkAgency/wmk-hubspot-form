import * as React from "react";
import { useEffect, useRef } from "react";

export const HubspotForm = ({
  region = "na1",
  portalId,
  formId,
  style,
  formDelay = 900 // Delay in ms between HS base form code and actual form embed
}: {
  region?: string;
  portalId: string;
  formId: string;
  style?: React.CSSProperties;
  formDelay?: number;
}) => {
  const hsScriptRef = useRef<HTMLDivElement>();
  useEffect(() => {
    const current = hsScriptRef.current;
    const script1 = document.createElement("script");
    const script2 = document.createElement("script");

    script1.type = "text/javascript";
    script1.src = "//js.hsforms.net/forms/shell.js";

    script2.innerHTML = `hbspt.forms.create({
        region: "${region}",
        portalId: "${portalId}",
        formId: "${formId}"
      });`;

    current.appendChild(script1);
    const timeout = setTimeout(() => current.appendChild(script2), formDelay);
    return () => clearTimeout(timeout);
  });
  return <div ref={hsScriptRef} style={style} />;
};
