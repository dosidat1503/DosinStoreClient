import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "black", color: "white", mt: 40 }}>
      <Container maxWidth="xl">
        <Grid container spacing={3} sx={{ pb: 4 }}>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Giới thiệu
            </Typography>
            <Typography variant="body2">
              Đây là một trang web bán áo quần, phục vụ cho dự án môn phát triển web của học sinh trường UIT.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Thông tin liên hệ
            </Typography>
            <Typography variant="body2">
              25, Nguyễn Du, Khu Phố 6, Phường Linh Trung, TP. Thủ Đức
              <br />
              0867474444
              <br />
              email123@gmail.com
              <br />
              9h-18h từ thứ 2 đến chủ nhật
            </Typography>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Nội dung chính sách
            </Typography>
            <Stack direction="column" spacing={1} sx={{ fontSize: "14px" }}>
              <Typography>Những câu hỏi thường gặp</Typography>
              <Typography>Chính sách thành viên</Typography>
              <Typography>Chính sách thanh toán</Typography>
              <Typography>Chính sách vận chuyển</Typography>
              <Typography>Chính sách khiếu nại</Typography>
              <Typography>Chính sách đổi trả</Typography>
              <Typography>Chính sách bảo hành</Typography>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Fanpage
            </Typography>
            <Typography variant="body2">Fanpage của chúng tôi</Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
