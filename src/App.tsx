import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Layout from "./global/Layout";
import PipelineList from "./pages/pipeline-list/PipelineList";
import PipelineDetails from "./pages/pipeline-details/PipelineDetails";
import { Box, Typography, Button } from "@mui/material";

const App = () => {
  return (
    <div className="app">
      <main className="content">
        <Router>
          <Layout>
            <Routes>
              <Route path="pipeline">
                <Route path="list" element={<PipelineList />} />
                <Route
                  path="details/:pipelineId"
                  element={<PipelineDetails />}
                />
                {/* Add a fallback route for unmatched paths */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Layout>
        </Router>
      </main>
    </div>
  );
};
// A simple NotFound component (you can customize this)
const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="background.default"
      p={3}
      textAlign="center"
    >
      <Typography variant="h1" color="error">
        404
      </Typography>
      <Typography variant="h5" color="primary" fontWeight="600">
        Page Not Found
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
        sx={{ marginTop: 2 }}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default App;
