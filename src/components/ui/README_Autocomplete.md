# MUI AutocompleteInput Component

Component MUI Autocomplete tùy chỉnh có khả năng vừa chọn từ danh sách vừa nhập giá trị tùy chỉnh.

## Tính năng chính

- ✅ **FreeSolo**: Cho phép nhập giá trị tùy chỉnh ngoài danh sách
- ✅ **Multiple Selection**: Có thể chọn nhiều giá trị với hiển thị dạng tags
- ✅ **Search & Filter**: Tìm kiếm trong danh sách options
- ✅ **Customizable**: Có thể tùy chỉnh label, placeholder, size, validation
- ✅ **Add New Suggestion**: Gợi ý thêm mới khi không tìm thấy trong danh sách
- ✅ **TypeScript Support**: Đầy đủ type definitions

## Cách sử dụng

### Import

```tsx
import { AutocompleteInput } from '@/components/ui';
// hoặc
import AutocompleteInput from '@/components/ui/AutocompleteInput';
```

### Ví dụ cơ bản - Single Select

```tsx
import React, { useState } from 'react';
import { AutocompleteInput } from '@/components/ui';

const MyComponent = () => {
  const [selectedCity, setSelectedCity] = useState<string>('');
  
  const cities = ['Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng'];

  return (
    <AutocompleteInput
      label="Chọn thành phố"
      placeholder="Chọn hoặc nhập tên thành phố..."
      options={cities}
      value={selectedCity}
      onChange={(value) => setSelectedCity(value as string)}
      freeSolo={true}
      multiple={false}
    />
  );
};
```

### Ví dụ Multiple Select

```tsx
import React, { useState } from 'react';
import { AutocompleteInput } from '@/components/ui';

const SkillsSelector = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  
  const skills = ['React', 'Vue.js', 'Angular', 'JavaScript', 'TypeScript'];

  return (
    <AutocompleteInput
      label="Kỹ năng lập trình"
      placeholder="Chọn hoặc thêm kỹ năng..."
      options={skills}
      value={selectedSkills}
      onChange={(value) => setSelectedSkills(value as string[])}
      freeSolo={true}
      multiple={true}
    />
  );
};
```

### Ví dụ Strict Select (không cho nhập tự do)

```tsx
const CategorySelector = () => {
  const [category, setCategory] = useState<string>('');
  
  const categories = ['Điện tử', 'Thời trang', 'Gia dụng'];

  return (
    <AutocompleteInput
      label="Danh mục sản phẩm"
      placeholder="Chọn danh mục..."
      options={categories}
      value={category}
      onChange={(value) => setCategory(value as string)}
      freeSolo={false}  // Không cho phép nhập tự do
      multiple={false}
    />
  );
};
```

## Props Interface

```tsx
interface AutocompleteInputProps {
  label?: string;                    // Label của input
  placeholder?: string;              // Placeholder text
  options: string[];                 // Danh sách options
  value?: string | string[];         // Giá trị hiện tại
  onChange?: (value: string | string[]) => void; // Callback khi thay đổi
  multiple?: boolean;                // Cho phép chọn nhiều
  freeSolo?: boolean;                // Cho phép nhập tự do
  disabled?: boolean;                // Vô hiệu hóa input
  error?: boolean;                   // Hiển thị trạng thái lỗi
  helperText?: string;               // Text hỗ trợ/lỗi
  size?: 'small' | 'medium';         // Kích thước
  fullWidth?: boolean;               // Chiều rộng đầy đủ
}
```

## Các Props mặc định

```tsx
{
  label: "Chọn hoặc nhập giá trị",
  placeholder: "Nhập để tìm kiếm hoặc thêm mới...",
  multiple: false,
  freeSolo: true,
  disabled: false,
  error: false,
  size: 'medium',
  fullWidth: true
}
```

## Validation Example

```tsx
const ValidatedAutocomplete = () => {
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [helperText, setHelperText] = useState<string>('');

  const handleChange = (newValue: string | string[]) => {
    setValue(newValue as string);
    
    // Validation logic
    if (!newValue || (newValue as string).length < 2) {
      setError(true);
      setHelperText('Vui lòng chọn hoặc nhập ít nhất 2 ký tự');
    } else {
      setError(false);
      setHelperText('');
    }
  };

  return (
    <AutocompleteInput
      label="Tên sản phẩm"
      options={['iPhone', 'Samsung', 'Xiaomi']}
      value={value}
      onChange={handleChange}
      error={error}
      helperText={helperText}
    />
  );
};
```

## Demo Components

Để xem các ví dụ chi tiết, bạn có thể sử dụng:

1. **SimpleAutocompleteExample**: Ví dụ đơn giản và dễ hiểu
2. **AutocompleteDemo**: Demo đầy đủ các tính năng

```tsx
import { SimpleAutocompleteExample, AutocompleteDemo } from '@/components/ui';

// Sử dụng trong component của bạn
<SimpleAutocompleteExample />
// hoặc
<AutocompleteDemo />
```

## Styling

Component sử dụng MUI theme và có thể tùy chỉnh thông qua:

- MUI theme customization
- Styled components (đã có sẵn StyledPaper và StyledChip)
- sx prop (có thể mở rộng thêm)

## Lưu ý

1. Component yêu cầu MUI v5+ và React 18+
2. Khi sử dụng `freeSolo={true}`, người dùng có thể nhập giá trị mới
3. Với `multiple={true}`, giá trị trả về sẽ là array
4. Component tự động gợi ý "Thêm mới" khi không tìm thấy trong danh sách
