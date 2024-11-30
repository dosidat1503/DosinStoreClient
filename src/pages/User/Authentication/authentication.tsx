import "bootstrap/dist/css/bootstrap.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import "@/features/authentication/styles/authentication.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import request from "@/ultils/request";
import { useAppSelector } from "@/store";

interface Authentication {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: "";
  errorList: ErrorList;
}

interface ErrorList {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface AuthenticationResponse {
  status?: number;
  email?: string;
  matk?: number;
  token?: string;
  message?: string;
  validation_errors?: string;
}

function Authentication() {
  useEffect(() => {
    document.title = "Dosin | Đăng nhập";
  }, []);
  const [isSignInPage, setIsSignInPage] = useState(false);
  const [isNotifyOpenMailToVerify, setIsNotifyOpenMailToVerify] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isClickForgetPass, setIsClickForgetPass] = useState(false);
  const [isSendMailRecoverSuccess, setIsSendMailRecoverSuccess] = useState(false);
  const isSignIn = useAppSelector((state) => state.auth.isSignIn);

  useEffect(() => {
    if (isSignIn === true) {
      setIsSignInPage(false);
    } else {
      setIsSignInPage(true);
    }
  }, [isSignIn]);

  const navigate = useNavigate();

  //lưu giá trị từ những ô nhập thông tin đăng ký
  const [authentication, setAuthentication] = useState<Authentication>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    errorList: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleInputRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthentication({ ...authentication, [e.currentTarget.name]: e.currentTarget.value });
  };

  const registerSubmit = async () => {
    setIsLoading(true);
    const data = {
      name: authentication.name,
      email: authentication.email,
      password: authentication.password,
      confirmPassword: authentication.confirmPassword,
      gender: authentication.gender,
      role: "Khách hàng",
      AdminVerify: 0,
    };

    request
      .get("/sanctum/csrf-cookie")
      .then(async () => {
        request
          .post("/api/authentication", data) //request post để lưu thông tin
          .then((res) => {
            console.log(res.data.status);
            if (res.data.status === 200) {
              setIsNotifyOpenMailToVerify(true);

              window.location.reload();
            } else {
              setIsLoading(false);
              if (authentication.confirmPassword !== authentication.password) {
                // setAuthentication({
                //   ...authentication,
                //   errorList: [ ...authentication, confirmPassword: "Mật khẩu không khớp" },
                // });
              } else {
                setAuthentication({ ...authentication, errorList: res.data.validation_errors });
              }
            }
          });
      })
      .catch((error) => {
        console.log("lỗi", error);
      });
  };

  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
    errorList: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleInputLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setLoginInput({ ...loginInput, [e.currentTarget.name]: e.currentTarget.value });
  };

  const loginSubmit = async () => {
    setIsLoading(true);

    const data = {
      email: loginInput.email,
      password: loginInput.password,
    };

    request.post<any, AuthenticationResponse>("/login", data).then((res) => {
      if (res.status === 200) {
        console.log(res);
        localStorage.setItem("auth_token", res.token as string);
        localStorage.setItem("auth_email", res.email as string);
        localStorage.setItem("auth_matk", String(res.matk));
        setIsLoading(false);

        navigate("/");
      } else if (res.status === 401) {
        // setLoginInput({
        //   ...loginInput,
        //   errorList: { ...loginInput.errorList, password: res.validation_errors as string },
        // });
        setIsLoading(false);
      } else {
        // setLoginInput({
        //   ...loginInput,
        //   errorList: { ...loginInput.errorList, password: res.validation_errors as string },
        // });
        setIsLoading(false);
      }
    });
  };

  const handleForgetPassword = () => {
    setIsClickForgetPass(true);
  };

  const handleReturnLogin = () => {
    setIsClickForgetPass(false);
    setIsSendMailRecoverSuccess(false);
    // setLoginInput({ ...loginInput, errorList: [] });
  };

  const recoverPassword = () => {
    const data = {
      email: loginInput.email,
    };
    setIsLoading(true);

    request.post<any, { status: number; validation_errors: string }>("/sendMailRecoverPassword", data).then((res) => {
      if (res.status === 200) setIsSendMailRecoverSuccess(true);
      else setLoginInput({ ...loginInput, errorList: { ...loginInput.errorList, email: res.validation_errors } });

      setIsLoading(false);
    });
  };

  const renderNotifyRegisterSuccess = () => {
    return (
      <div className={`NotifyRegisterSuccess ${isNotifyOpenMailToVerify ? "" : "display_hidden"}`}>
        <div className="notify_SuccessRegister_div">
          <div className="notify_SuccessRegister">Đăng ký thành công</div>
          <br />
          <p>Hãy kiểm tra và xác nhận email để kích hoạt tài khoản của bạn</p>
          <div>
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  };

  const renderLoading = () => {
    return <div className={`donut multi ${isLoading ? "" : "display_hidden"}`}></div>;
  };

  return (
    <div>
      {renderNotifyRegisterSuccess()}
      <div className={`container-pluid_all ${isNotifyOpenMailToVerify ? "display_hidden" : ""}`}>
        <div className={`container-pluid ${isSignInPage ? "sign-up-mode" : ""}`}>
          <div className="forms-container-pluid">
            <div className="signin-signup">
              <form action="#" className="sign-in-form" onSubmit={loginSubmit}>
                <h2 className="title">Đăng Nhập</h2>
                <div className={`input-field ${isSendMailRecoverSuccess ? "display_hidden" : ""}`}>
                  <FontAwesomeIcon icon={faEnvelope} className="input-field_icon"></FontAwesomeIcon>
                  {/* <i className="fas fa-user"></i> */}
                  <input
                    type="text"
                    name="email"
                    onChange={handleInputLogin}
                    value={loginInput.email}
                    placeholder="Email"
                  />
                </div>
                <p className={`${isSendMailRecoverSuccess ? "" : "display_hidden"}`}>
                  Chúng tôi đã gửi một mail cho bạn để khôi phục mật khẩu, hãy kiểm tra mail
                </p>
                <span className={`${isSendMailRecoverSuccess ? "display_hidden" : ""}`}>
                  {loginInput.errorList.email}
                </span>
                <div className={`input-field ${isClickForgetPass ? "display_hidden" : ""}`}>
                  <FontAwesomeIcon icon={faLock} className="input-field_icon input-field__faclock"></FontAwesomeIcon>
                  {/* <i className="fas fa-lock"></i> */}
                  <input
                    type="password"
                    name="password"
                    onChange={handleInputLogin}
                    value={loginInput.password}
                    placeholder="Mật khẩu"
                  />
                </div>
                <span
                  onClick={handleForgetPassword}
                  className={`quenmatkhau ${isClickForgetPass ? "display_hidden" : ""}`}
                >
                  Quên mật khẩu
                </span>
                <span
                  onClick={handleReturnLogin}
                  className={`quenmatkhau ${isClickForgetPass ? "" : "display_hidden"}`}
                >
                  Quay lại đăng nhập
                </span>
                <span>{loginInput.errorList.password}</span>
                <input
                  type="submit"
                  value="Đăng nhập"
                  className={`btn solid btn 
                    ${isClickForgetPass ? "display_hidden" : ""}
                    ${isLoading ? "display_hidden" : ""}`}
                />

                <span
                  onClick={recoverPassword}
                  className={`button_recoverPassword 
                    ${isClickForgetPass ? "" : "display_hidden"} 
                    ${isLoading ? "display_hidden" : ""}
                    ${isSendMailRecoverSuccess ? "display_hidden" : ""}`}
                >
                  Khôi phục mật khẩu
                </span>
                {renderLoading()}
              </form>
              <form action="#" className="sign-up-form" onSubmit={registerSubmit}>
                <h2 className="title">Đăng Ký</h2>
                <div className="input-field">
                  <FontAwesomeIcon icon={faUser} className="input-field_icon"></FontAwesomeIcon>
                  <input
                    type="text"
                    name="name"
                    onChange={handleInputRegister}
                    value={authentication.name}
                    placeholder="Tên người dùng"
                  />
                </div>
                <span>{authentication.errorList.name}</span>
                <div className="input-field">
                  <FontAwesomeIcon icon={faEnvelope} className="input-field_icon"></FontAwesomeIcon>
                  <input
                    type="email"
                    name="email"
                    onChange={handleInputRegister}
                    value={authentication.email}
                    placeholder="Email"
                  />
                </div>
                <span>{authentication.errorList.email}</span>

                <div className="input-field">
                  <FontAwesomeIcon icon={faLock} className="input-field_icon"></FontAwesomeIcon>
                  <input
                    type="password"
                    name="password"
                    onChange={handleInputRegister}
                    value={authentication.password}
                    placeholder="Mật khẩu"
                    style={{ overflow: "hidden" }}
                  />
                </div>
                <span>{authentication.errorList.password}</span>

                <div className="input-field">
                  <FontAwesomeIcon icon={faLock} className="input-field_icon"></FontAwesomeIcon>
                  <input
                    type="password"
                    name="confirmPassword"
                    onChange={handleInputRegister}
                    value={authentication.confirmPassword}
                    placeholder="Nhập lại mật khẩu"
                  />
                </div>
                <span>{authentication.errorList.confirmPassword}</span>
                <h5>Giới tính</h5>
                <div className="gender-input">
                  <div id=" male-input">
                    <input
                      type="radio"
                      name="gender"
                      value="Nam"
                      id="male"
                      onChange={handleInputRegister}
                      className="css-gender"
                    />
                    <label htmlFor="male" className="gender_css">
                      Nam
                    </label>
                  </div>
                  <div id="female-input">
                    <input
                      type="radio"
                      name="gender"
                      value="Nữ"
                      id="female"
                      onChange={handleInputRegister}
                      className="css-gender"
                    />
                    <label htmlFor="female" className="gender_css">
                      Nữ
                    </label>
                  </div>
                </div>
                <input
                  type="submit"
                  className={`btn btn_sign_up ${isLoading ? "display_hidden" : ""}`}
                  value="Đăng ký"
                />
                {renderLoading()}
              </form>
            </div>
          </div>

          <div className="panels-container-pluid">
            <div className="panel left-panel">
              <div className="content">
                <h3>Bạn mới biết đến cửa hàng chúng tôi ?</h3>
                <p>
                  Cửa hàng chúng tôi là điểm đến lý tưởng cho những người yêu thời trang và muốn thể hiện phong cách cá
                  nhân. Chúng tôi tự hào là một cửa hàng thời trang chất lượng, mang đến những bộ sưu tập đa dạng về
                  quần áo, giày dép và phụ kiện để đáp ứng mọi nhu cầu thời trang của bạn.
                </p>
                <button className="btn transparent" id="sign-up-btn" onClick={() => setIsSignInPage(true)}>
                  Đăng Ký
                </button>
              </div>
            </div>
            <div className="panel right-panel">
              <div className="content">
                <h3>Đã có tài khoản ?</h3>
                <p>
                  Cửa hàng chúng tôi là điểm đến lý tưởng cho những người yêu thời trang và muốn thể hiện phong cách cá
                  nhân. Chúng tôi tự hào là một cửa hàng thời trang chất lượng, mang đến những bộ sưu tập đa dạng về
                  quần áo, giày dép và phụ kiện để đáp ứng mọi nhu cầu thời trang của bạn.
                </p>
                <button className="btn transparent" id="sign-in-btn" onClick={() => setIsSignInPage(false)}>
                  Đăng Nhập
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Authentication;
