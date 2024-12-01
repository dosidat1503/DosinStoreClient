import "../styles/authentication.css";
import { PanelProps } from "../types";

const Panel = ({ setIsSignInPage }: PanelProps) => {
  return (
    <div className="panels-container-pluid">
      <div className="panel left-panel">
        <div className="content">
          <h3>Bạn mới biết đến cửa hàng chúng tôi ?</h3>
          <p>
            Cửa hàng chúng tôi là điểm đến lý tưởng cho những người yêu thời trang và muốn thể hiện phong cách cá nhân.
            Chúng tôi tự hào là một cửa hàng thời trang chất lượng, mang đến những bộ sưu tập đa dạng về quần áo, giày
            dép và phụ kiện để đáp ứng mọi nhu cầu thời trang của bạn.
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
            Cửa hàng chúng tôi là điểm đến lý tưởng cho những người yêu thời trang và muốn thể hiện phong cách cá nhân.
            Chúng tôi tự hào là một cửa hàng thời trang chất lượng, mang đến những bộ sưu tập đa dạng về quần áo, giày
            dép và phụ kiện để đáp ứng mọi nhu cầu thời trang của bạn.
          </p>
          <button className="btn transparent" id="sign-in-btn" onClick={() => setIsSignInPage(false)}>
            Đăng Nhập
          </button>
        </div>
      </div>
    </div>
  );
};

export default Panel;
