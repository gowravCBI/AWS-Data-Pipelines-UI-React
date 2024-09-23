import { Typography, Box } from "@mui/material";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold">
        {title}
      </Typography>
    </Box>
  );
};

export default Header;
