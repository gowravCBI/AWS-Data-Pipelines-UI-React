import axios from "axios";
import {
  PipelineDescriptionListResponse,
  PipelineDescriptionResponse,
  PipelineDescription,
  PipelineActualDefinition,
  RunDetails,
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
}

export const pipelineService = new PipelineService();
