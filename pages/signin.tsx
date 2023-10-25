import "../app/globals.css";
import Header from "@/components/header";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { config } from "dotenv";
config();


export default function Signin() {
  function handleLogin(credentialResponse: any) {
    console.log(credentialResponse);
    // make a request to api/auth 
    // Authorization: Bearer YOUR_GOOGLE_TOKEN
    fetch("/api/auth", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${credentialResponse.credential}`
      }
    }).then((response) => {
      console.log(response);
    });
  }
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="w-40 mx-auto">
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
          <GoogleLogin
            onSuccess={handleLogin}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </GoogleOAuthProvider>
      </div>
    </main>
  );
}
