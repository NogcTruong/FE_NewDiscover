import React, { useState } from "react";
import "./HeaderComponent.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import { useAuth } from "../../contexts/AuthContext";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { Link } from 'react-router-dom';
const HeaderComponent = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth(); // Lấy thông tin user và hàm cập nhật
  const [anchorEl, setAnchorEl] = useState(null); // Trạng thái mở/đóng menu

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget); // Mở dropdown tại vị trí avatar
  };

  const handleClose = () => {
    setAnchorEl(null); // Đóng dropdown
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login"); // Chuyển hướng đến trang đăng nhập
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="container">
          <div className="wrapper">
            <div className="navbar_logo" onClick={() => navigate("/")}>
              <img className="logo" src={logo} />
            </div>

            <ul className="navbar_menu">
              <li className="menu_list">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.3828 3.51562C15.4209 3.51562 13.6797 4.29004 12.5 5.62109C11.3203 4.29004 9.5791 3.51562 7.61719 3.51562C5.90842 3.51769 4.27023 4.19741 3.06195 5.4057C1.85366 6.61398 1.17394 8.25217 1.17188 9.96094C1.17188 17.0254 11.5049 22.6699 11.9443 22.9072C12.1151 22.9992 12.306 23.0473 12.5 23.0473C12.694 23.0473 12.8849 22.9992 13.0557 22.9072C13.4951 22.6699 23.8281 17.0254 23.8281 9.96094C23.8261 8.25217 23.1463 6.61398 21.9381 5.4057C20.7298 4.19741 19.0916 3.51769 17.3828 3.51562ZM16.8467 17.418C15.4866 18.5721 14.0327 19.6109 12.5 20.5234C10.9673 19.6109 9.51341 18.5721 8.15332 17.418C6.03711 15.6025 3.51562 12.834 3.51562 9.96094C3.51562 8.87314 3.94775 7.82989 4.71694 7.06069C5.48614 6.2915 6.52939 5.85938 7.61719 5.85938C9.35547 5.85938 10.8105 6.77734 11.415 8.25586C11.503 8.47139 11.6532 8.65584 11.8464 8.78567C12.0397 8.91551 12.2672 8.98485 12.5 8.98485C12.7328 8.98485 12.9603 8.91551 13.1536 8.78567C13.3468 8.65584 13.497 8.47139 13.585 8.25586C14.1895 6.77734 15.6445 5.85938 17.3828 5.85938C18.4706 5.85938 19.5139 6.2915 20.2831 7.06069C21.0522 7.82989 21.4844 8.87314 21.4844 9.96094C21.4844 12.834 18.9629 15.6025 16.8467 17.418Z"
                    fill="#0194F3"
                  />
                </svg>
                <Link to="/wishlist" className="list_content" >
                  Danh sách ưu thích
                </Link>
              </li>

              <li className="menu_list">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.82441 2.69362C10.0198 2.47538 10.259 2.30081 10.5265 2.18129C10.7939 2.06177 11.0836 2 11.3765 2C11.6694 2 11.9591 2.06177 12.2265 2.18129C12.4939 2.30081 12.7332 2.47538 12.9286 2.69362L13.6577 3.5082C13.8661 3.74101 14.1242 3.92396 14.4129 4.04351C14.7016 4.16305 15.0135 4.21614 15.3254 4.19882L16.4192 4.13841C16.7117 4.12228 17.0044 4.16804 17.2781 4.2727C17.5517 4.37736 17.8002 4.53857 18.0074 4.74579C18.2145 4.95302 18.3756 5.2016 18.4801 5.47531C18.5846 5.74902 18.6303 6.0417 18.614 6.33424L18.5536 7.42695C18.5364 7.73875 18.5896 8.05043 18.7091 8.33892C18.8287 8.6274 19.0115 8.88533 19.2442 9.09362L20.0588 9.82278C20.2772 10.0182 20.4519 10.2575 20.5715 10.525C20.6911 10.7926 20.753 11.0823 20.753 11.3754C20.753 11.6684 20.6911 11.9582 20.5715 12.2258C20.4519 12.4933 20.2772 12.7326 20.0588 12.928L19.2442 13.6572C19.0114 13.8656 18.8284 14.1236 18.7089 14.4123C18.5893 14.701 18.5363 15.0129 18.5536 15.3249L18.614 16.4186C18.6301 16.7112 18.5844 17.0038 18.4797 17.2775C18.375 17.5511 18.2138 17.7996 18.0066 18.0068C17.7994 18.2139 17.5508 18.375 17.2771 18.4795C17.0034 18.5841 16.7107 18.6297 16.4182 18.6134L15.3254 18.553C15.0136 18.5358 14.702 18.589 14.4135 18.7085C14.125 18.8281 13.8671 19.0109 13.6588 19.2436L12.9296 20.0582C12.7342 20.2766 12.4949 20.4513 12.2274 20.5709C11.9598 20.6906 11.6701 20.7524 11.377 20.7524C11.0839 20.7524 10.7942 20.6906 10.5266 20.5709C10.2591 20.4513 10.0198 20.2766 9.82441 20.0582L9.09524 19.2436C8.88684 19.0108 8.62875 18.8279 8.34006 18.7083C8.05138 18.5888 7.73951 18.5357 7.42753 18.553L6.33378 18.6134C6.04123 18.6295 5.74858 18.5838 5.47492 18.4791C5.20125 18.3745 4.95275 18.2132 4.74562 18.006C4.53849 17.7988 4.37741 17.5502 4.27288 17.2765C4.16835 17.0028 4.12272 16.7101 4.13899 16.4176L4.19941 15.3249C4.21656 15.0131 4.1634 14.7014 4.04386 14.4129C3.92431 14.1244 3.74145 13.8665 3.50878 13.6582L2.6942 12.929C2.47579 12.7336 2.30107 12.4943 2.18145 12.2268C2.06183 11.9593 2 11.6695 2 11.3764C2 11.0834 2.06183 10.7936 2.18145 10.5261C2.30107 10.2585 2.47579 10.0192 2.6942 9.82382L3.50878 9.09466C3.74159 8.88626 3.92454 8.62816 4.04409 8.33948C4.16364 8.0508 4.21672 7.73893 4.19941 7.42695L4.13899 6.3332C4.12301 6.04074 4.16889 5.74819 4.27362 5.47466C4.37834 5.20112 4.53957 4.95275 4.74678 4.74573C4.95399 4.53872 5.20252 4.37773 5.47615 4.27326C5.74979 4.16879 6.04238 4.1232 6.33482 4.13945L7.42753 4.19987C7.73934 4.21702 8.05101 4.16386 8.3395 4.04432C8.62799 3.92477 8.88591 3.74191 9.0942 3.50924L9.82441 2.69362Z"
                    stroke="#0194F3"
                    stroke-width="2.08333"
                  />
                  <path
                    d="M8.77234 8.77174H8.78276V8.78216H8.77234V8.77174ZM13.9807 13.9801H13.9911V13.9905H13.9807V13.9801Z"
                    stroke="#0194F3"
                    stroke-width="3.125"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14.5015 8.2509L8.25146 14.5009"
                    stroke="#0194F3"
                    stroke-width="2.08333"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <a className="list_content" href="">
                  Khuyến mãi
                </a>
              </li>

              <li className="menu_list">
                <a className="list_content" href="">
                  Blog
                </a>
              </li>

              <li className="menu_list">
                <a className="list_content" href="">
                  Hỗ trợ
                </a>
              </li>
            </ul>

            <div className="buttons-container">
              {user ? ( // Nếu đã đăng nhập
                <div className="user-info">
                  <Avatar
                    alt={user.username}
                    src={user.avatar || "/default-avatar.jpg"}
                    onClick={handleAvatarClick}
                    style={{ cursor: "pointer" }}
                  />
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={() => navigate("/edit-profile")}>
                      Chỉnh sửa thông tin
                    </MenuItem>
                    <MenuItem onClick={() => navigate("/history")}>
                      Lịch sử lịch trình
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                  </Menu>
                </div>
              ) : (
                // Nếu chưa đăng nhập
                <>
                  <button
                    className="btn login-btn"
                    onClick={() => navigate("/login")}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.069 12.8737C13.0246 12.9536 12.9608 13.0199 12.884 13.066C12.8072 13.1121 12.72 13.1364 12.6313 13.1364H0.504754C0.416105 13.1363 0.329039 13.1119 0.2523 13.0658C0.175561 13.0196 0.11185 12.9533 0.0675642 12.8734C0.0232786 12.7936 -2.27425e-05 12.703 1.66562e-08 12.6108C2.27758e-05 12.5187 0.0233688 12.4281 0.0676938 12.3483C1.02961 10.6191 2.51195 9.37922 4.24188 8.79145C3.38618 8.26177 2.72135 7.45466 2.3495 6.49407C1.97764 5.53349 1.91932 4.47254 2.18348 3.47415C2.44765 2.47576 3.0197 1.59514 3.81178 0.967523C4.60386 0.339907 5.57218 0 6.56802 0C7.56387 0 8.53219 0.339907 9.32427 0.967523C10.1164 1.59514 10.6884 2.47576 10.9526 3.47415C11.2167 4.47254 11.1584 5.53349 10.7866 6.49407C10.4147 7.45466 9.74987 8.26177 8.89417 8.79145C10.6241 9.37922 12.1064 10.6191 13.0684 12.3483C13.1128 12.4281 13.1363 12.5187 13.1364 12.6109C13.1365 12.7031 13.1132 12.7937 13.069 12.8737Z"
                        fill="white"
                      />
                    </svg>
                    Đăng nhập
                  </button>
                  <button
                    className="btn register-btn"
                    onClick={() => navigate("/register")}
                  >
                    Đăng ký
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default HeaderComponent;
