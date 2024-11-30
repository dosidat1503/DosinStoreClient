import style from "../styles/delivery-info.module.scss";

import clsx from "clsx";
import { faCaretDown, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

import { shipInformationInitial, HCMDeliveryFee, defaultDeliveryFee, HCMCity } from "../constants/index";
import { CommuneList, DistrictList, ProvinceList } from "./address-select";
import { Address, DeliveryInfoProps } from "../types";
import { useCommune, useDistrict, useInfoForPayment, useProvince } from "../hooks";
import { Divider } from "antd";

const DeliveryInfo = (props: DeliveryInfoProps) => {
  const { setShipInformation, shipInformation, infoToSaveOrder, setInfoToSaveOrder } = props;

  const { data: infoForPayment } = useInfoForPayment();
  const address = infoForPayment?.address;

  const { data: provinces, isSuccess: isProvincesLoaded } = useProvince();

  const idProvince = provinces?.find((item) => item.name === shipInformation.city)?.id || null;
  const { data: districts, isSuccess: isDistrictsLoaded } = useDistrict(idProvince);

  const idDistrict = districts?.find((item) => item.name === shipInformation.district)?.id || null;
  const { data: communes, isSuccess: isCommunesLoaded } = useCommune(idDistrict);

  useEffect(() => {
    if (isProvincesLoaded && provinces !== null) {
      const cityName = shipInformation.city !== "" ? shipInformation.city : provinces[0].name;

      setShipInformation({
        ...shipInformation,
        city: cityName,
      });
    }
  }, [provinces, isProvincesLoaded]);

  useEffect(() => {
    if (isDistrictsLoaded && districts !== null) {
      const districtName = shipInformation.district !== "" ? shipInformation.district : districts[0].name;

      setShipInformation({
        ...shipInformation,
        district: districtName,
      });
    }
  }, [districts, isDistrictsLoaded]);

  useEffect(() => {
    if (isCommunesLoaded && communes !== null) {
      const communeName = shipInformation.ward !== "" ? shipInformation.ward : communes[0].name;

      setShipInformation({
        ...shipInformation,
        ward: communeName,
      });
    }
  }, [communes, isCommunesLoaded]);

  const [isOpenAddessList, setIsOpenAddessList] = useState(false);

  const handleInputShipInformation = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const propertyName = (e.target as HTMLInputElement).name;
    const propertyValue = (e.target as HTMLInputElement).value;

    let totalPayable = 0;
    let deliveryFee = 0;
    if (propertyValue === HCMCity) {
      totalPayable = infoToSaveOrder.totalProductAmount + HCMDeliveryFee;
      deliveryFee = HCMDeliveryFee;
    } else {
      totalPayable = infoToSaveOrder.totalProductAmount + defaultDeliveryFee;
      deliveryFee = defaultDeliveryFee;
    }

    setShipInformation({
      ...shipInformation,
      [propertyName]: propertyValue,
    });
    setInfoToSaveOrder({
      ...infoToSaveOrder,
      totalPayable: totalPayable,
      deliveryFee: deliveryFee,
    });
  };

  const handleChooseAdress = (index: number) => {
    if (!address) return;
    const { MATTGH, TEN, SDT, DIACHI, TINH_TP, QUAN_HUYEN, PHUONG_XA } = address[index];

    setShipInformation({
      ...shipInformation,
      name: TEN,
      numberPhone: SDT,
      address: DIACHI,
      city: TINH_TP,
      district: QUAN_HUYEN,
      ward: PHUONG_XA,
    });
    setInfoToSaveOrder({
      ...infoToSaveOrder,
      oldAddressCode: MATTGH,
    });
    setIsOpenAddessList(false);
  };

  const handleClickAddNewAddress = () => {
    setShipInformation({
      ...shipInformation,
      ...shipInformationInitial,
    });
    setInfoToSaveOrder({
      ...infoToSaveOrder,
      oldAddressCode: "",
    });
    setIsOpenAddessList(false);
  };

  const AddressList = address?.map((item: Address, index: number) => {
    return (
      <div className={style.previousAddressContainer} key={index}>
        <div className="row text-start align-items-center">
          <div className="col-auto text-center">
            <input type="radio" onClick={() => handleChooseAdress(index)} />
          </div>
          <div className={clsx(style.addressInfoText, "col-2")} id="itemmm">
            <span>{item.TEN}</span>
          </div>
          <div className={clsx(style.addressInfoText, "col-2")}>
            <span>{item.SDT}</span>
          </div>
          <div className={clsx(style.addressInfoText, "col")}>
            <span>
              {item.DIACHI}, {item.PHUONG_XA}, {item.QUAN_HUYEN}, {item.TINH_TP}
            </span>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className={style.previousAddressContainer}>
        <div className={clsx(style.addressTitle, "row")}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <FontAwesomeIcon className={style.faLocationDot} icon={faLocationDot}></FontAwesomeIcon>
            <span>Thông tin giao hàng đã đặt hàng những lần trước</span>
            <div
              onClick={() => {
                setIsOpenAddessList(!isOpenAddessList);
              }}
              style={{ cursor: "pointer", marginLeft: "10px" }}
            >
              <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
            </div>
          </div>
        </div>
      </div>
      {isOpenAddessList && (
        <div>
          <div className={style.previousAddressContainer}>
            <div className="row text-center">
              <div className="col-auto">
                <span>&nbsp;</span>
              </div>
              <div className={clsx("col-2", style.tableHeaderContainer)}>
                <span>Tên người nhận</span>
              </div>
              <div className={clsx("col-2", style.tableHeaderContainer)}>
                <span>SĐT</span>
              </div>
              <div className={clsx("col", style.tableHeaderContainer)}>
                <span>Địa chỉ</span>
              </div>
            </div>
          </div>
          {AddressList}
          <button type="button" className={clsx("link-dark", style.addNewAddress)} onClick={handleClickAddNewAddress}>
            + Thêm địa chỉ mới
          </button>
        </div>
      )}
      <div className="address_update" id="address_update">
        <Divider variant="solid" style={{ borderColor: "gray" }} />
        <div className="row mb-2 mt-3">
          <div className="col-6">
            <label htmlFor="#" className="form-label">
              Tên người nhận hàng
            </label>
            <input
              type="text"
              className="form-control "
              value={shipInformation.name}
              onChange={handleInputShipInformation}
              name="name"
              required
            />
          </div>
          <div className="col-6">
            <label htmlFor="#" className="form-label">
              SDT người nhận hàng
            </label>
            <input
              type="text"
              className="form-control"
              value={shipInformation.numberPhone}
              onChange={handleInputShipInformation}
              name="numberPhone"
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-4">
            <label htmlFor="#" className="form-label">
              Tỉnh/Thành phố
            </label>
            <select
              className={clsx("form-select", style.selectContainer)}
              required
              value={shipInformation.city}
              onChange={handleInputShipInformation}
              name="city"
            >
              <option value="">-- Chọn tỉnh/thành phố --</option>
              <ProvinceList list={provinces || []} />
            </select>
          </div>
          <div className="col-4">
            <label htmlFor="#" className="form-label">
              Quận/Huyện
            </label>
            <select
              className={clsx("form-select", style.selectContainer)}
              required
              value={shipInformation.district}
              onChange={handleInputShipInformation}
              name="district"
            >
              <option value="">-- Chọn quận/huyện --</option>
              <DistrictList list={districts || []} />
            </select>
          </div>
          <div className="col-4">
            <label htmlFor="#" className="form-label">
              Phường/Xã
            </label>
            <select
              className={clsx("form-select", style.selectContainer)}
              required
              value={shipInformation.ward}
              onChange={handleInputShipInformation}
              name="ward"
            >
              <option value="">-- Chọn phường/xã --</option>
              <CommuneList list={communes || []} />
            </select>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-12">
            <label htmlFor="#" className="form-label">
              Địa chỉ chi tiết
            </label>
            <input
              type="text"
              className="form-control"
              value={shipInformation.address}
              onChange={handleInputShipInformation}
              name="address"
              required
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DeliveryInfo;
