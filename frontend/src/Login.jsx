import { useMsal } from "@azure/msal-react";
const LoginButton = () => {
  const { instance } = useMsal();

  const handleLogin = async () => {
    try {
      const loginResponse = await instance.loginPopup();
      console.log("Logged in:", loginResponse.account);

      // Save account info
      localStorage.setItem(
        "msalAccount",
        JSON.stringify(loginResponse.account)
      );

      //  add backend url
      const tokenResponse = await instance.acquireTokenSilent({
        scopes: ["api://13a6fa3d-0f9b-4598-b2b5-756be226505e/user_impersonation"],
        account: loginResponse.account,
      });

      localStorage.setItem("accessToken", tokenResponse.accessToken);
      console.log("Access Token:", tokenResponse.accessToken);
    } catch (error) {
      console.error("Login or token error", error);
    }
  };

  return <button onClick={handleLogin}>Login</button>;
};

export default LoginButton;
0