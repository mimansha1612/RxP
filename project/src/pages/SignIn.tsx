import { SignIn } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const SignInPage = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Navigate to="/chat" replace />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignIn/>
    </div>
  );
};

export default SignInPage;