import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Divider,
  Alert
} from '@mui/material';
import AutocompleteInput from './AutocompleteInput';

const AutocompleteDemo: React.FC = () => {
  // State cho single select
  const [singleValue, setSingleValue] = useState<string>('');
  
  // State cho multiple select
  const [multipleValue, setMultipleValue] = useState<string[]>([]);
  
  // State cho category select
  const [categoryValue, setCategoryValue] = useState<string>('');

  // Dữ liệu mẫu
  const fruits = [
    'Táo', 'Chuối', 'Cam', 'Xoài', 'Nho', 'Dâu tây', 
    'Kiwi', 'Dưa hấu', 'Dưa lưới', 'Ổi', 'Mít', 'Sầu riêng'
  ];

  const skills = [
    'React', 'Vue.js', 'Angular', 'JavaScript', 'TypeScript',
    'Node.js', 'Python', 'Java', 'PHP', 'Laravel', 'Spring Boot'
  ];

  const categories = [
    'Điện tử', 'Thời trang', 'Gia dụng', 'Sách & Văn phòng phẩm',
    'Thể thao & Du lịch', 'Sức khỏe & Làm đẹp', 'Xe cộ & Phụ kiện'
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        MUI Autocomplete Demo
      </Typography>
      
      <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
        Component có thể vừa chọn từ danh sách vừa nhập giá trị tùy chỉnh
      </Typography>

      <Grid container spacing={3}>
        {/* Single Select với FreeSolo */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                1. Chọn đơn với nhập tự do
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Có thể chọn từ danh sách hoặc nhập giá trị mới
              </Typography>
              
              <AutocompleteInput
                label="Chọn trái cây"
                placeholder="Chọn hoặc nhập tên trái cây..."
                options={fruits}
                value={singleValue}
                onChange={(value) => setSingleValue(value as string)}
                multiple={false}
                freeSolo={true}
              />
              
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">
                  <strong>Giá trị đã chọn:</strong> {singleValue || 'Chưa chọn'}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Multiple Select */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                2. Chọn nhiều với Tags
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Có thể chọn nhiều kỹ năng và thêm kỹ năng mới
              </Typography>
              
              <AutocompleteInput
                label="Kỹ năng lập trình"
                placeholder="Chọn hoặc thêm kỹ năng..."
                options={skills}
                value={multipleValue}
                onChange={(value) => setMultipleValue(value as string[])}
                multiple={true}
                freeSolo={true}
              />
              
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">
                  <strong>Kỹ năng đã chọn:</strong> {multipleValue.length > 0 ? multipleValue.join(', ') : 'Chưa chọn'}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Strict Select (không cho phép nhập tự do) */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                3. Chọn nghiêm ngặt
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Chỉ cho phép chọn từ danh sách có sẵn
              </Typography>
              
              <AutocompleteInput
                label="Danh mục sản phẩm"
                placeholder="Chọn danh mục..."
                options={categories}
                value={categoryValue}
                onChange={(value) => setCategoryValue(value as string)}
                multiple={false}
                freeSolo={false}
              />
              
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">
                  <strong>Danh mục đã chọn:</strong> {categoryValue || 'Chưa chọn'}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Size variations */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                4. Kích thước khác nhau
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>Kích thước nhỏ:</Typography>
                <AutocompleteInput
                  label="Size small"
                  options={fruits.slice(0, 5)}
                  size="small"
                />
              </Box>
              
              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>Kích thước trung bình:</Typography>
                <AutocompleteInput
                  label="Size medium"
                  options={fruits.slice(0, 5)}
                  size="medium"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Alert severity="info" sx={{ mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Các tính năng chính:
        </Typography>
        <ul>
          <li><strong>FreeSolo:</strong> Cho phép nhập giá trị tùy chỉnh ngoài danh sách</li>
          <li><strong>Multiple Selection:</strong> Có thể chọn nhiều giá trị với hiển thị dạng tags</li>
          <li><strong>Search & Filter:</strong> Tìm kiếm trong danh sách options</li>
          <li><strong>Customizable:</strong> Có thể tùy chỉnh label, placeholder, size, validation</li>
          <li><strong>Add New Suggestion:</strong> Gợi ý thêm mới khi không tìm thấy trong danh sách</li>
        </ul>
      </Alert>

      <Alert severity="success">
        <Typography variant="body2">
          <strong>Cách sử dụng:</strong> Import component AutocompleteInput và truyền props phù hợp. 
          Component hỗ trợ TypeScript với đầy đủ type definitions.
        </Typography>
      </Alert>
    </Container>
  );
};

export default AutocompleteDemo;