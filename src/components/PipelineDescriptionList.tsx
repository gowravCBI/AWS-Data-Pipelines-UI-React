import React, { useEffect, useState } from "react";
import { pipelineService } from "../services/PipelineService"; // Adjust the path as needed
import { PipelineDescription } from "../services/types"; // Adjust the path as needed

const PipelineDescriptionList: React.FC = () => {
  const [pipelineDescriptions, setPipelineDescriptions] = useState<
    PipelineDescription[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPipelineDescriptions = async () => {
      try {
        const descriptions = await pipelineService.getPipelineDescriptionList();
        console.log(descriptions);

        setPipelineDescriptions(descriptions);
      } catch (err) {
        setError("Failed to fetch pipeline descriptions");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPipelineDescriptions();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Pipeline Descriptions</h1>
      <ul>
        {/* {pipelineDescriptions.map((desc) => (
                    <li key={desc.id}>
                        {desc.name}
                    </li>
                ))} */}
      </ul>
    </div>
  );
};

export default PipelineDescriptionList;
