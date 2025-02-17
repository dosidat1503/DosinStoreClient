import { useCallback, useEffect, useState } from "react";
import { useBaseInfo } from "../hooks";
import { message, Skeleton } from "antd";
import { useSaveBaseInfo } from "../hooks/use-save-base-info";
import style from "../styles/base-info.module.scss";
import clsx from "clsx";
import { AccountInfoInput, Message } from "../types";

const BaseInfo = () => {
  const { data, isLoading } = useBaseInfo();
  const { mutateAsync: saveInfoAccount, isPending } = useSaveBaseInfo();

  const [messageApi, contextHolderMessage] = message.useMessage();

  const [messageSetting, setMessageSetting] = useState<Message>({
    type: "info",
    content: "",
  });
  const [accountInfo, setAccountInfo] = useState<AccountInfoInput>({
    name: "",
    email: "",
    gender: "",
    numberPhone: "",
    address: "",
  });

  const handleInputInfoAccount = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const name = e.target.name;
      let value = e.target.value;

      if (name === "numberPhone") {
        value = value.replace(/[^0-9]/g, "");
      }

      setAccountInfo({ ...accountInfo, [name]: value });
    },
    [accountInfo],
  );

  const handleSaveBaseInfo = useCallback(() => {
    const data = {
      name: accountInfo.name,
      email: accountInfo.email,
      gender: accountInfo.gender,
      numberPhone: accountInfo.numberPhone,
      address: accountInfo.address,
      matk: localStorage.getItem("userId"),
    };

    const isEmptyField = Object.values(data).some((value) => !value);
    if (isEmptyField) {
      setMessageSetting({ type: "error", content: "Vui lòng điền đầy đủ thông tin" });
      return;
    }

    if (accountInfo.numberPhone !== "") {
      const phoneRegex = /^0\d{9}$/;
      if (!phoneRegex.test(accountInfo.numberPhone)) {
        setMessageSetting({ type: "error", content: "Số điện thoại không đúng định dạng" });
        return;
      }
    }

    saveInfoAccount(data).then((res) => {
      if (res.statuscode === 200) {
        setMessageSetting({ type: "success", content: "Lưu thành công" });
      } else {
        setMessageSetting({ type: "error", content: "Lưu thất bại" });
      }
    });
  }, [accountInfo, saveInfoAccount]);

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

  useEffect(() => {
    if (data) {
      setAccountInfo({
        name: data.TEN,
        email: data.EMAIL,
        gender: data.gioitinh,
        numberPhone: data.SDT,
        address: data.DIACHI,
      });
    }
  }, [data]);

  if (isLoading) return <Skeleton active />;

  return (
    <div className="container col-6">
      {contextHolderMessage}
      <div className={clsx("row", style.nameRow)}>
        <p className="text-end col-3">Họ và Tên</p>
        <input
          className={clsx("col-7", style.roundCornerInput)}
          type="text"
          width="250"
          name="name"
          onChange={handleInputInfoAccount}
          value={accountInfo.name}
        />
      </div>
      <div className={clsx("row", style.nameRow)}>
        <p className="text-end col-3">Giới tính</p>
        <div className="text-start col-7">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="inlineRadio1"
              value="Nam"
              checked={accountInfo.gender === "Nam"}
              onChange={handleInputInfoAccount}
            />
            <label className="form-check-label" htmlFor="inlineRadio1">
              Nam
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="inlineRadio2"
              value="Nữ"
              checked={accountInfo.gender === "Nữ"}
              onChange={handleInputInfoAccount}
            />
            <label className="form-check-label" htmlFor="inlineRadio2">
              Nữ
            </label>
          </div>
        </div>
      </div>
      <div className={clsx("row", style.nameRow)}>
        <p className="text-end col-3">Email</p>
        <input
          className={clsx("col-7", style.roundCornerInput)}
          type="text"
          width="250"
          name="email"
          onChange={handleInputInfoAccount}
          value={accountInfo.email}
          disabled
        />
      </div>
      <div className={clsx("row", style.nameRow)}>
        <p className="text-end col-3">SĐT</p>
        <input
          className={clsx("col-7", style.roundCornerInput)}
          type="text"
          width="250"
          name="numberPhone"
          onChange={handleInputInfoAccount}
          value={accountInfo.numberPhone}
        />
      </div>
      <div className={clsx(style.nameRow, "address", "row")}>
        <p className="text-end col-3">Địa chỉ</p>
        <input
          className={clsx("col-7", style.roundCornerInput)}
          type="text"
          name="address"
          onChange={handleInputInfoAccount}
          value={accountInfo.address}
        />
      </div>
      <div className={clsx(style.nameRow, "row", style.dCenter)}>
        {!isPending ? (
          <input onClick={handleSaveBaseInfo} className={clsx(style.lastButton)} type="button" value="Lưu thay đổi" />
        ) : (
          <div className={clsx(style.donutAccountInfo, style.multiAccountInfo)}></div>
        )}
      </div>
    </div>
  );
};

export default BaseInfo;
