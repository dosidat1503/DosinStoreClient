import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import AutocompleteInput from './AutocompleteInput';

const SimpleAutocompleteExample: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  // Dữ liệu mẫu
  const vietnameseCities = [
    'Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ',
    'Nha Trang', 'Huế', 'Vũng Tàu', 'Đà Lạt', 'Quy Nhon'
  ];

  const programmingSkills = [
    'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Angular',
    'Node.js', 'Python', 'Java', 'C#', 'PHP'
  ];

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Ví dụ sử dụng MUI Autocomplete
      </Typography>

      {/* Ví dụ 1: Chọn đơn với freeSolo */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          1. Chọn thành phố (có thể nhập thành phố mới)
        </Typography>
        <AutocompleteInput
          label="Thành phố"
          placeholder="Chọn hoặc nhập tên thành phố..."
          options={vietnameseCities}
          value={selectedValue}
          onChange={(value) => setSelectedValue(value as string)}
          freeSolo={true}
          multiple={false}
        />
        <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
          Giá trị đã chọn: <strong>{selectedValue || 'Chưa chọn'}</strong>
        </Typography>
      </Box>

      {/* Ví dụ 2: Multiple select */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          2. Chọn kỹ năng lập trình (chọn nhiều)
        </Typography>
        <AutocompleteInput
          label="Kỹ năng lập trình"
          placeholder="Chọn hoặc thêm kỹ năng..."
          options={programmingSkills}
          value={selectedSkills}
          onChange={(value) => setSelectedSkills(value as string[])}
          freeSolo={true}
          multiple={true}
        />
        <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
          Kỹ năng đã chọn: <strong>{selectedSkills.length > 0 ? selectedSkills.join(', ') : 'Chưa chọn'}</strong>
        </Typography>
      </Box>

      {/* Hướng dẫn sử dụng */}
      <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
        <Typography variant="body2">
          <strong>Hướng dẫn:</strong>
          <br />
          • Gõ để tìm kiếm trong danh sách
          <br />
          • Nhấn Enter hoặc click để chọn
          <br />
          • Có thể nhập giá trị mới không có trong danh sách
          <br />
          • Với multiple select, có thể chọn nhiều giá trị
        </Typography>
      </Box>
    </Box>
  );
};

export default SimpleAutocompleteExample;