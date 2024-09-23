import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./global/Layout";
import PipelineList from "./pages/pipeline-list/PipelineList";
import PipelineDetails from "./pages/pipeline-details/PipelineDetails";

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
              </Route>
            </Routes>
          </Layout>
        </Router>
      </main>
    </div>
  );
};

export default App;
