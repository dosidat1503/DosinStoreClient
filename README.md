# 🛒 DosinStore - E-Commerce Web Application

Một ứng dụng thương mại điện tử hiện đại được xây dựng bằng **React**, **TypeScript**, và **Vite**, cung cấp trải nghiệm mua sắm trực tuyến hoàn chỉnh với giao diện người dùng đẹp mắt và hiệu suất cao.

## 🌟 Tính năng chính

### 🔐 Xác thực & Bảo mật
- **Đăng ký/Đăng nhập** an toàn với validation đầy đủ
- **Quên mật khẩu** với hệ thống gửi email khôi phục
- **Bảo vệ routes** cho các trang cần xác thực
- **Quản lý session** với Redux và Local Storage

### 🛍️ Trải nghiệm mua sắm
- **Trang chủ** với sản phẩm nổi bật và giao diện hiện đại
- **Danh mục sản phẩm** với bộ lọc và tìm kiếm thông minh
- **Chi tiết sản phẩm** với hình ảnh carousel và thông tin đầy đủ
- **Giỏ hàng** với cập nhật số lượng và tính tổng tiền tự động
- **Thanh toán** tích hợp với nhiều phương thức

### 👤 Quản lý tài khoản
- **Thông tin cá nhân** có thể chỉnh sửa
- **Lịch sử đơn hàng** với chi tiết từng giao dịch
- **Trạng thái đơn hàng** theo dõi realtime

## 🚀 Công nghệ sử dụng

### Frontend Core
- **React 18** - Library UI hiện đại
- **TypeScript** - Type safety và developer experience
- **Vite** - Build tool nhanh và hiệu quả
- **React Router DOM** - Client-side routing

### State Management & Data Fetching
- **Redux Toolkit** - Quản lý global state
- **TanStack Query (React Query)** - Server state management
- **Axios** - HTTP client với interceptors

### UI/UX Libraries
- **Material-UI (MUI)** - Component library chất lượng cao
- **Ant Design** - Bộ components phong phú
- **Bootstrap 5** - Responsive grid system
- **Sass** - CSS preprocessor
- **FontAwesome** - Icon library đa dạng

### Carousel & Animations
- **React Slick** - Carousel component mượt mà
- **Slick Carousel** - Base carousel library

### Development Tools
- **ESLint** - Code linting và formatting
- **Prettier** - Code formatter
- **TypeScript Config** - Strict type checking

## 📁 Cấu trúc dự án

```
src/
├── components/          # Reusable UI components
│   ├── Layouts/        # Layout components (UserLayout)
│   └── ui/             # Basic UI components
├── features/           # Feature-based modules
│   ├── authentication/ # Đăng nhập, đăng ký
│   ├── cart/           # Giỏ hàng
│   ├── home/           # Trang chủ
│   ├── collection/     # Danh mục sản phẩm
│   ├── product-detail/ # Chi tiết sản phẩm
│   ├── payment/        # Thanh toán
│   ├── my-order/       # Quản lý đơn hàng
│   └── account-info/   # Thông tin tài khoản
├── pages/              # Page components
├── store/              # Redux store và slices
├── routes/             # Routing configuration
├── configs/            # App configurations
├── hooks/              # Custom React hooks
├── ultils/             # Utility functions
└── assets/             # Static assets
```

## ⚡ Cài đặt & Chạy dự án

### Yêu cầu hệ thống
- **Node.js** >= 16.0.0
- **npm** hoặc **yarn**

### Cài đặt dependencies
```bash
# Clone repository
git clone [repository-url]
cd dosinstoreclient

# Cài đặt packages
npm install
# hoặc
yarn install
```

### Chạy ở môi trường development
```bash
npm run dev
# hoặc
yarn dev
```

### Build cho production
```bash
npm run build
# hoặc
yarn build
```

### Linting & Code quality
```bash
# Kiểm tra linting
npm run lint

# Preview build
npm run preview
```

## 🎯 Highlights kỹ thuật

### ⚡ Performance Optimization
- **Code Splitting** với React.lazy() cho từng page
- **Lazy Loading** components để giảm bundle size
- **React Query** cache và optimize API calls
- **Vite** cho build time nhanh chóng

### 🛡️ Type Safety
- **100% TypeScript** với strict mode
- **Custom Types** cho API responses
- **Props Validation** cho tất cả components

### 🎨 UI/UX Excellence
- **Responsive Design** hoạt động mượt trên mọi thiết bị
- **Modern UI** với Material Design principles
- **Loading States** và error handling UI
- **Consistent Theme** với MUI ThemeProvider

### 🔄 State Management
- **Redux Toolkit** cho global state (auth, cart)
- **React Query** cho server state caching
- **Local Storage** persistence cho user session

### 🌐 API Integration
- **RESTful API** integration với Axios
- **Request/Response Interceptors** cho authentication
- **Error Handling** centralized
- **Loading States** cho UX tốt hơn

## 🔗 Demo & Screenshots

*(Có thể thêm link demo và screenshots của ứng dụng)*

## 📈 Kế hoạch phát triển

- [ ] Tích hợp thanh toán trực tuyến (VNPay, MoMo)
- [ ] Hệ thống review và rating sản phẩm
- [ ] Wishlist và so sánh sản phẩm
- [ ] Admin dashboard
- [ ] Mobile app với React Native
- [ ] PWA support

## 👨‍💻 Tác giả

**[Tên của bạn]**
- Email: [email của bạn]
- LinkedIn: [LinkedIn profile]
- GitHub: [GitHub profile]

---

*Dự án này được xây dựng như một phần của portfolio phát triển web, thể hiện khả năng làm việc với các công nghệ frontend hiện đại và xây dựng ứng dụng web quy mô lớn.*
 
