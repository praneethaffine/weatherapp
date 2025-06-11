import React from "react";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";

const msalInstance = new PublicClientApplication(msalConfig);

const MsalAuthWrapper = ({ children }) => {
  return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
};

export default MsalAuthWrapper;
