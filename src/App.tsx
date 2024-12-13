import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./global/Layout";
import PipelineList from "./pages/pipeline-list/PipelineList";
import PipelineDetails from "./pages/pipeline-details/PipelineDetails";
import { lazy, Suspense } from "react";
import AccountSwitch from "./pages/AccountSwitch";

// Lazy load components for performance optimization
const NotFound = lazy(() => import("./components/NotFound"));

const App = () => {
  return (
    <div className="app">
      <main className="content">
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {/* Redirect to login page if not authenticated */}
              <Route path="/" element={<Navigate to="/account-switch" />} />

              {/* Define routes */}
              <Route path="account-switch" element={<AccountSwitch />} /> {/* Login route */}

              {/* Define routes that require Layout */}
              <Route path="/" element={<Layout />}>
                <Route path="pipeline">
                  <Route path="list" element={<PipelineList />} />
                  <Route
                    path="details/:pipelineId"
                    element={<PipelineDetails />}
                  />
                </Route>
              </Route>

              {/* Fallback route for unmatched paths */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Router>
      </main>
    </div>
  );
};
export default App;
