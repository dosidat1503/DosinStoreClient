import style from "../styles/base-info.module.scss";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import { message } from "antd";
import { usePasswordChange } from "../hooks/use-password-change";
import { Message, PasswordChangeInfo } from "../types";

const PasswordChange = () => {
  const [passwordChangeInfo, setPasswordChangeInfo] = useState<PasswordChangeInfo>({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    matk: localStorage.getItem("userId"),
  });
  const [messageSetting, setMessageSetting] = useState<Message>({
    type: "info",
    content: "",
  });

  const { mutateAsync: passwordChange, isPending } = usePasswordChange();
  const [messageApi, contextHolderMessage] = message.useMessage();

  const handleChangePassword = useCallback(() => {
    if (passwordChangeInfo.newPassword !== passwordChangeInfo.confirmNewPassword) {
      setMessageSetting({ type: "error", content: "Xác nhận mật khẩu mới không khớp" });
    } else {
      passwordChange(passwordChangeInfo).then((res) => {
        if (res.status === 200) {
          setMessageSetting({ type: "success", content: "Lưu thành công" });
          setPasswordChangeInfo({
            ...passwordChangeInfo,
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          });
        } else if (res.status === 401) {
          setMessageSetting({ type: "error", content: "Mật khẩu cũ sai" });
        }
      });
    }
  }, [passwordChangeInfo]);

  const handleInputInfoChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordChangeInfo({
      ...passwordChangeInfo,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (messageSetting.content) {
      messageApi.open({
        type: messageSetting.type,
        content: messageSetting.content,
        duration: 3,
        style: { marginTop: 220 },
      });
    }
  }, [messageSetting]);

  return (
    <div className="col-5">
      {contextHolderMessage}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontWeight: "bold",
        }}
      >
        <span className={style.nameRow}>THAY ĐỔI MẬT KHẨU</span>
      </div>
      <div className={clsx(style.nameRow, "row")}>
        <p className="text-end col-4">Mật khẩu cũ</p>
        <input
          className={clsx("col-7", style.roundCornerInput)}
          type="text"
          width="180"
          name="oldPassword"
          onChange={handleInputInfoChangePassword}
          value={passwordChangeInfo.oldPassword}
        />
      </div>
      <div className={clsx(style.nameRow, "row")}>
        <p className="text-end col-4">Mật khẩu mới</p>
        <input
          className={clsx("col-7", style.roundCornerInput)}
          type="password"
          width="250"
          name="newPassword"
          onChange={handleInputInfoChangePassword}
          value={passwordChangeInfo.newPassword}
        />
      </div>
      <div className={clsx(style.nameRow, "row")}>
        <p className="text-end col-4">Xác nhận mật khẩu</p>
        <input
          className={clsx("col-7", style.roundCornerInput)}
          type="password"
          width="250"
          name="confirmNewPassword"
          onChange={handleInputInfoChangePassword}
          value={passwordChangeInfo.confirmNewPassword}
        />
      </div>
      <div className={style.dCenter}>
        {isPending ? (
          <div className={clsx(style.donutAccountInfo, style.multiAccountInfo)}></div>
        ) : (
          <input
            onClick={handleChangePassword}
            className={style.passwordChangeButton}
            type="button"
            value="Đổi mật khẩu"
          />
        )}
      </div>
    </div>
  );
};

export default PasswordChange;
