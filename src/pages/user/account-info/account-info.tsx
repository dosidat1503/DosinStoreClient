import { BaseInfo, PasswordChange } from "@/features/account-info/component";
import { useEffect } from "react";
import style from "@/features/account-info/styles/account-info.module.scss";
import clsx from "clsx";
import { useBaseInfo } from "@/features/account-info/hooks";
import { Skeleton } from "antd";

const AccountInfo = () => {
  useEffect(() => {
    document.title = "DosiIn | Thông tin tài khoản";
  }, []);
  const { isLoading } = useBaseInfo();
  if (isLoading) return <Skeleton active />;

  return (
    <div className={clsx(style.orderInfoBody)}>
      <div className={clsx("heading text-uppercase text-center", style.accountInfo)}>
        <h1>Thông tin tài khoản</h1>
      </div>
      <div className={clsx("row", style.formContainer)}>
        <BaseInfo />
        <PasswordChange />
      </div>
    </div>
  );
};

export default AccountInfo;
