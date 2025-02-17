import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "../hooks/use-sign-in";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useRecoverPassword } from "../hooks/use-recover-password";
import { useDispatch } from "react-redux";
import { setIsSignIn } from "@/store/slices/authSlice";
import { SignInInfo } from "../types";
import { setTokens } from "@/ultils/token";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isClickForgetPass, setIsClickForgetPass] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [signInInfo, setSignInInfo] = useState<SignInInfo>({
    email: "",
    password: "",
  });

  const { mutateAsync: signIn, isPending: signInPending } = useSignIn();
  const {
    mutateAsync: recoverPassword,
    isPending: recoverPasswordPending,
    isSuccess: isSendMailSuccess,
  } = useRecoverPassword();

  const handleInputLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignInInfo({ ...signInInfo, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSignIn = async () => {
    const data = {
      email: signInInfo.email,
      password: signInInfo.password,
    };

    const isEmpty = Object.values(signInInfo).some((value) => value === "");
    if (isEmpty) {
      setError("Vui lòng điền đầy đủ thông tin");
    }

    signIn(data).then((res) => {
      if (res.status === 200) {
        const { access_token, refresh_token } = res;
        setTokens([
          {
            token: access_token,
            type: "accessToken",
          },
          {
            token: refresh_token,
            type: "refreshToken",
          },
        ]);

        // localStorage.setItem("auth_token", res.token as string);
        localStorage.setItem("email", res.email as string);
        localStorage.setItem("userId", String(res.matk));
        dispatch(setIsSignIn(true));
        navigate("/");
      } else if (res.status === 401) {
        setError(res.validation_errors as string);
      }
    });
  };

  const handleRecoverPassword = () => {
    const data = {
      email: signInInfo.email,
    };

    recoverPassword(data).then((res) => {
      if (res.status === 401) {
        setError(res.validation_errors as string);
      }
    });
  };

  return (
    <div className="sign-in-form">
      <h2 className="title">Đăng Nhập</h2>
      {isSendMailSuccess && isClickForgetPass ? (
        <p>Chúng tôi đã gửi một mail cho bạn để khôi phục mật khẩu, hãy kiểm tra mail</p>
      ) : (
        <div className={`input-field `}>
          <FontAwesomeIcon icon={faEnvelope} className="input-field_icon" />
          <input type="text" name="email" onChange={handleInputLogin} value={signInInfo.email} placeholder="Email" />
        </div>
      )}{" "}
      {!isClickForgetPass ? (
        <>
          <div className={`input-field`}>
            <FontAwesomeIcon icon={faLock} className="input-field_icon input-field__faclock" />
            <input
              type="password"
              name="password"
              onChange={handleInputLogin}
              value={signInInfo.password}
              placeholder="Mật khẩu"
            />
          </div>
          <span onClick={() => setIsClickForgetPass(true)} className={`quenmatkhau`}>
            Quên mật khẩu
          </span>
        </>
      ) : (
        <span onClick={() => setIsClickForgetPass(false)} className={`quenmatkhau`}>
          Quay lại đăng nhập
        </span>
      )}
      {!signInPending && !isClickForgetPass && (
        <input onClick={handleSignIn} value="Đăng nhập" className={`btn solid btn  `} />
      )}
      {isClickForgetPass && !recoverPasswordPending && (
        <span onClick={handleRecoverPassword} className={`button_recoverPassword `}>
          Khôi phục mật khẩu
        </span>
      )}
      {!isClickForgetPass && !signInPending && <span>{error}</span>}
      {(signInPending || recoverPasswordPending) && <div className={`donut multi`}></div>}
    </div>
  );
};
export default SignIn;
