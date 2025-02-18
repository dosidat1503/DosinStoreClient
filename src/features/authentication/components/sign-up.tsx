import { useState } from "react";
import "../styles/authentication.css";
import { SignUpInfo } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { useSignUp } from "../hooks/use-sign-up";
import { useNavigate } from "react-router-dom";
import routes from "@/configs/routes";

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [signUpInfo, setSignUpInfo] = useState<SignUpInfo>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { mutateAsync: signUp, isPending } = useSignUp();

  const handleInputRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpInfo({ ...signUpInfo, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSignUpSubmit = async () => {
    const data = {
      name: signUpInfo.name,
      email: signUpInfo.email,
      password: signUpInfo.password,
      confirmPassword: signUpInfo.confirmPassword,
      gender: signUpInfo.gender,
      role: "Khách hàng",
      adminVerify: 0,
    };

    const isEmpty = Object.values(signUpInfo).some((value) => value === "");
    if (isEmpty) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    } else if (signUpInfo.confirmPassword !== signUpInfo.password) {
      setError("Mật khẩu không khớp");
      return;
    }

    signUp(data).then((res) => {
      if (res.status === 200) {
        navigate(`${routes.signUpSuccess}`);
      }
      if (res.validation_errors) {
        setError(res?.validation_errors?.email ?? "");
      }
    });
  };

  return (
    <div className="sign-up-form">
      <h2 className="title">Đăng Ký</h2>
      <div className="input-field">
        <FontAwesomeIcon icon={faUser} className="input-field_icon"></FontAwesomeIcon>
        <input
          type="text"
          name="name"
          onChange={handleInputRegister}
          value={signUpInfo.name}
          placeholder="Tên người dùng"
        />
      </div>
      <div className="input-field">
        <FontAwesomeIcon icon={faEnvelope} className="input-field_icon"></FontAwesomeIcon>
        <input type="email" name="email" onChange={handleInputRegister} value={signUpInfo.email} placeholder="Email" />
      </div>

      <div className="input-field">
        <FontAwesomeIcon icon={faLock} className="input-field_icon"></FontAwesomeIcon>
        <input
          type="password"
          name="password"
          onChange={handleInputRegister}
          value={signUpInfo.password}
          placeholder="Mật khẩu"
          style={{ overflow: "hidden" }}
        />
      </div>

      <div className="input-field">
        <FontAwesomeIcon icon={faLock} className="input-field_icon"></FontAwesomeIcon>
        <input
          type="password"
          name="confirmPassword"
          onChange={handleInputRegister}
          value={signUpInfo.confirmPassword}
          placeholder="Nhập lại mật khẩu"
        />
      </div>
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
      <span>{error}</span>
      {isPending ? (
        <div className={`donut multi `}></div>
      ) : (
        <input type="submit" onClick={handleSignUpSubmit} className={`btn btn-dark`} value="Đăng ký" />
      )}
    </div>
  );
};

export default SignUp;
