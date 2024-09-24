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
    runDetails?: RunDetails[];
    tags?: PipelineTag[] | null;
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


export interface RunDetails {
    id: string,
    name: string,
    parent: string,
    triesLeft: string,
    resourceRegion: string,
    headAttempt: string,
    resource: string,
    sphere: string,
    attemptCount: string,
    type: string,
    status: string,
    actualEndTime: string,
    scheduledStartTime: string,
    scheduledEndTime: string,
    input: string,
    version: string,
    actualStartTime: string,
    componentParent: string,
    resourceId: string,
}

export interface PipelineActualDefinition {
    id: string;
    // Add other relevant fields
}