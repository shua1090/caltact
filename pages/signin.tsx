import "../app/globals.css";
import Header from "@/components/header";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { config } from "dotenv";
import { useEffect, useState } from "react";
config();

export default function Signin() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or return a loader, placeholder, etc.
  }

  function handleLogin(credentialResponse: any) {
    console.log(credentialResponse);
    // make a request to api/auth
    // Authorization: Bearer YOUR_GOOGLE_TOKEN
    fetch("/api/auth", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${credentialResponse.credential}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(credentialResponse);
        // Record data to local storage
        localStorage.setItem("token", data.session);
        localStorage.setItem("firstName", data.firstName);
        localStorage.setItem("lastName", data.lastName);
        localStorage.setItem("email", data.email);
        window.location.reload();
      });
  }
  return (
    <main className="min-h-screen bg-white">
      <Header />
      {!localStorage.getItem("token") ? (
        <div className="w-40 mx-auto">
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
          >
            <GoogleLogin
              onSuccess={handleLogin}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </GoogleOAuthProvider>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <p className="text-center text-xl font-light mt-10">
            Currently logged in as {localStorage.getItem("email")}{" "}
          </p>
          <button
            className="w-40 mx-auto font-light py-2 px-4 rounded mt-10 border border-black"
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            Logout
          </button>
        </div>
      )}
    </main>
  );
}
