import axios from 'axios';
import { PipelineDescription, PipelineActualDefinition } from './types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081';
// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/aws-datapipeline';

export class PipelineService {
    private serviceUrl: string = `${API_URL}`;

    async getPipelineDescriptionList(): Promise<PipelineDescription[]> {
        const url = `${this.serviceUrl}/pipelineDescriptionList`;
        // const url = `${this.serviceUrl}/descriptions`;
        try {
            const response = await axios.get<PipelineDescription[]>(url);
            console.log("raw PipelineDescription ==> ", response);
            const modifiedData = this.removeAtFromKeys(response.data);
            return modifiedData;


            // const response = await axios.get<{ pipelineDescriptionList: PipelineDescription[] }>(url);
            // console.log("raw PipelineDescription ==> ", response);
            // const modifiedData = this.removeAtFromKeys(response.data.pipelineDescriptionList);
            // return modifiedData;
        } catch (error) {
            console.error('Error fetching pipeline description list:', error);
            throw error;
        }
    }
    // Helper method to remove "@" from keys
    private removeAtFromKeys(data: PipelineDescription[]): PipelineDescription[] {
        return data.map(pipeline => ({
            ...pipeline,
            fields: pipeline.fields.map(field => ({
                ...field,
                key: field.key.startsWith('@') ? field.key.substring(1) : field.key
            }))
        }));
    }

    async getPipelineRunDetails(pipelineId: string): Promise<PipelineDescription[]> {
        const url = `${this.serviceUrl}/pipelineRunDetails/${pipelineId}`;
        try {
            const response = await axios.get<PipelineDescription[]>(url);
            return response.data;
        } catch (error) {
            console.error(`Error fetching pipeline run details for ${pipelineId}:`, error);
            throw error;
        }
    }

    async getPipelineActualDefinition(pipelineId: string): Promise<PipelineActualDefinition> {
        const url = `${this.serviceUrl}/pipelineActualDefinition/${pipelineId}`;
        try {
            const response = await axios.get<PipelineActualDefinition>(url);
            return response.data;
        } catch (error) {
            console.error(`Error fetching pipeline actual definition for ${pipelineId}:`, error);
            throw error;
        }
    }
}

export const pipelineService = new PipelineService();
