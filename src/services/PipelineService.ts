import axios from "axios";
import {
  PipelineDescriptionListResponse,
  PipelineDescriptionResponse,
  PipelineDescription,
  PipelineActualDefinition,
  RunDetails,
  CreatePipelineDto,
} from "./types";
import { parseDatesInObject } from "../utility/utils"; // Import the utility function

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/aws-datapipeline";

export class PipelineService {
  private serviceUrl: string = `${API_URL}`;

  async getPipelineDescriptionList(): Promise<PipelineDescription[]> {
    const url = `${this.serviceUrl}/descriptions`;
    try {
      const response = await axios.get<PipelineDescriptionListResponse>(url);
      // console.log("raw...", response.data);

      // Extract pipelineDescriptionList from the response
      const pipelineDescriptionList = response.data.pipelineDescriptionList;

      // Map through the response data to parse date fields in the 'fields' object
      const parsedData = pipelineDescriptionList.map((item) => ({
        ...item, // Spread the original item properties
        fields: parseDatesInObject(item.fields), // Convert date strings in 'fields' to Date objects
      }));
      // console.log("Parsed Pipeline Description ==> ", parsedData);
      return parsedData;
    } catch (error) {
      console.error("Error fetching pipeline description list:", error);
      throw error;
    }
  }

  async getPipelineDescriptionById(
    pipelineId: string
  ): Promise<PipelineDescription> {
    const url = `${this.serviceUrl}/${pipelineId}/description`;
    try {
      const response = await axios.get<PipelineDescriptionResponse>(url);
      // console.log("raw...", response.data);

      // Extract pipelineDescription from the response
      const pipelineDescription = response.data.pipelineDescription;

      // Parse date fields in the 'fields' object
      const parsedData = {
        ...pipelineDescription, // Spread the original properties
        fields: parseDatesInObject(pipelineDescription.fields), // Convert date strings in 'fields' to Date objects
      };

      // console.log("Parsed Pipeline Description ==> ", parsedData);
      return parsedData;
    } catch (error) {
      console.error("Error fetching pipeline description:", error);
      throw error;
    }
  }

  async getPipelineRunDetails(pipelineId: string): Promise<RunDetails[]> {
    const url = `${this.serviceUrl}/${pipelineId}/runDetails`;
    try {
      const response = await axios.get<RunDetails[]>(url);
      // Directly parse each run detail object for date conversion
      const parsedData = response.data.map((item) => parseDatesInObject(item));
      // console.log("RunDetails parsedData", parsedData);
      return parsedData;
    } catch (error) {
      console.error(
        `Error fetching pipeline run details for ${pipelineId}:`,
        error
      );
      throw error;
    }
  }

  async getPipelineActualDefinition(
    pipelineId: string
  ): Promise<PipelineActualDefinition> {
    const url = `${this.serviceUrl}/${pipelineId}/definition`;
    try {
      const response = await axios.get<PipelineActualDefinition>(url);
      // console.log("========-=-=-==-=-", response);
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching pipeline actual definition for ${pipelineId}:`,
        error
      );
      throw error;
    }
  }

  async activateDataPipeline(pipelineId: string): Promise<boolean> {
    const url = `${this.serviceUrl}/${pipelineId}/activate`;
    try {
      await axios.post<void>(url);
      return true;
    } catch (error) {
      console.error(`Error in activating pipeline id ${pipelineId}:`, error);
      throw error;
    }
  }
  async deactivateDataPipeline(pipelineId: string): Promise<boolean> {
    const url = `${this.serviceUrl}/${pipelineId}/deactivate`;
    try {
      await axios.delete<void>(url);
      return true;
    } catch (error) {
      console.error(`Error in deactivating pipeline Id ${pipelineId}:`, error);
      throw error;
    }
  }

  async downloadS3LogsZip(bucketName: string, prefix?: string): Promise<Blob> {
    const url = `http://localhost:3000/s3logs/get-all-logs`;

    try {
      const response = await axios.get(url, {
        params: {
          bucketName,
          prefix,
        },
        responseType: "blob", // Set response type to blob for binary data
      });
      // Return the binary data (zip file) as a Blob
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching logs as zip for bucket ${bucketName}:`,
        error
      );
      throw error;
    }
  }

  async createPipeline(createPipelineDto: CreatePipelineDto): Promise<void> {
    const url = `${this.serviceUrl}/create`;
    try {
      const response = await axios.post(url, createPipelineDto);
      console.log("-=-=-=-=-=-=-1=2-2=1-2-", createPipelineDto);

      console.log("Pipeline created successfully:", response.data);
    } catch (error) {
      console.error("Error creating pipeline:", error);
      throw error;
    }
  }

  async deletePipeline(pipelineId: string): Promise<String> {
    // console.log("Service PipelineId :: ", pipelineId);
    const url = `${this.serviceUrl}/${pipelineId}`;
    try {
      const response = await axios.delete(url);
      return response.data;
    } catch (error) {
      console.error(`Error in deleting Pipeline with id : ${pipelineId}`, error);
      throw error;
    }
  }
}

export const pipelineService = new PipelineService();
