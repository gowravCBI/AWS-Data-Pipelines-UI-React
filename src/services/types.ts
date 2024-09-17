// Define the types according to your API response structure
export interface PipelineField {
    key: string;
    stringValue: string;
}

export interface PipelineTag {
    key: string;
    value: string;
}

export interface PipelineDescription {
    pipelineId: string;
    name: string;
    fields: PipelineField[];
    description?: string | null;
    runDetails?: unknown;  // You can specify a more detailed type if you have more information
    tags: PipelineTag[];  // Updated to reflect the actual structure
}

// Transformed PipelineDescription with fields as an object
export interface TransformedPipelineDescription {
    pipelineId: string;
    name: string;
    fields: Record<string, string>;  // Transformed from array to object
    description?: string | null;
    runDetails?: unknown;
    tags: PipelineTag[];
}


export interface PipelineRunDetails {
    id: number;
    status: string;
    // Add other relevant fields
}

export interface PipelineActualDefinition {
    id: number;
    definition: string;
    // Add other relevant fields
}

// Update pipelineId type if needed
export type PipelineId = number | string;