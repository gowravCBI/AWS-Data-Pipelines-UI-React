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

// Lazy load components for performance optimization
const NotFound = lazy(() => import("./components/NotFound"));

const App = () => {
  return (
    <div className="app">
      <main className="content">
        <Router>
          <Layout>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                {/* Redirect to pipeline list by default */}
                <Route path="/" element={<Navigate to="/pipeline/list" />} />

                {/* Define nested routes for pipeline */}
                <Route path="pipeline">
                  <Route path="list" element={<PipelineList />} />
                  <Route
                    path="details/:pipelineId"
                    element={<PipelineDetails />}
                  />
                </Route>

                {/* Fallback route for unmatched paths */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Layout>
        </Router>
      </main>
    </div>
  );
};
export default App;
