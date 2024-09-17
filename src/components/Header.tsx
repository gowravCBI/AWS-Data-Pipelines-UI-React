import { Typography, Box } from "@mui/material";

interface HeaderProps {
  title: string;
  subtitle: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <Box mb="30px">
      <Typography variant="h4" fontWeight="bold" sx={{ m: "0 0 5px 0" }}>
        {title}
      </Typography>
    </Box>
  );
};

export default Header;
