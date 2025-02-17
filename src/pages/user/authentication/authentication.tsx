import "bootstrap/dist/css/bootstrap.css";
import "@/features/authentication/styles/authentication.css";
import { useEffect, useState } from "react";
import Panel from "@/features/authentication/components/panel";
import SignUp from "@/features/authentication/components/sign-up";
import SignIn from "@/features/authentication/components/sign-in";

interface Authentication {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: "";
}

function Authentication() {
  useEffect(() => {
    document.title = "Dosin | Đăng nhập";
  }, []);
  const [isSignInPage, setIsSignInPage] = useState(false);

  return (
    <div>
      <div className={`container-pluid_all`}>
        <div className={`container-pluid ${isSignInPage ? "sign-up-mode" : ""}`}>
          <div className="forms-container-pluid">
            <div className="signin-signup">
              <SignIn />
              <SignUp />
            </div>
          </div>

          <Panel setIsSignInPage={setIsSignInPage} />
        </div>
      </div>
    </div>
  );
}

export default Authentication;
