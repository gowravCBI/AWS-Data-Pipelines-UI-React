import { pipelineService } from "./PipelineService";
import { PipelineDescription, TransformedPipelineDescription } from './types';

// Function to transform fields array into an object
const transformFields = (fields: { key: string; stringValue: string }[]): Record<string, string> => {
    return fields.reduce((acc, field) => {
        const key = field.key.startsWith('@') ? field.key.slice(1) : field.key;
        acc[key] = field.stringValue;
        return acc;
    }, {} as Record<string, string>);
};

export class PipelineServiceModified {
    async getModifiedPipelineDescriptionList(): Promise<TransformedPipelineDescription[]> {
        try {
            const rawList: PipelineDescription[] = await pipelineService.getPipelineDescriptionList();
            
            // Transform the raw list into the desired structure
            return rawList.map(item => ({
                pipelineId: item.pipelineId,
                name: item.name,
                fields: transformFields(item.fields),  // Transforming fields array into an object
                description: item.description,
                runDetails: item.runDetails,
                tags: item.tags
            }));
        } catch (error) {
            console.error('Error fetching and transforming pipeline description list:', error);
            throw error;
        }
    }

    async getModifiedPipelineRunDetails(pipelineId: string) {
        try {
            return await pipelineService.getPipelineRunDetails(pipelineId);
        } catch (error) {
            console.error(`Error fetching and transforming pipeline run details for ${pipelineId}:`, error);
            throw error;
        }
    }

    async getModifiedPipelineActualDefinition(pipelineId: string) {
        try {
            return await pipelineService.getPipelineActualDefinition(pipelineId);
        } catch (error) {
            console.error(`Error fetching and transforming pipeline actual definition for ${pipelineId}:`, error);
            throw error;
        }
    }
}

export const pipelineServiceModified = new PipelineServiceModified();
