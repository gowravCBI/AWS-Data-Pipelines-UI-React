// Define the types according to your API response structure
export interface PipelineField {
  lastActivationTime: string;
  nextRunTime: string;
  creationTime: string;
  sphere: string;
  healthStatusUpdatedTime: string;
  scheduledStartTime: string;
  scheduledEndTime: string;
  healthStatus: string;
  latestRunTime: string;
  pipelineCreator: string;
  version: number;
  name: string;
  id: string;
  pipelineState: string;
  accountId: number;
  uniqueId: string;
  userId: number;
  scheduledPeriod: string;
  firstActivationTime: string;
}

export interface PipelineTag {
  Environment?: string;
  Name?: string;
  Owner?: string;
}

export interface PipelineDescription {
  pipelineId: string;
  name: string;
  fields: PipelineField;
  description?: string;
  tags?: PipelineTag;
}
export interface PipelineDescriptionListResponse {
  pipelineDescriptionList: PipelineDescription[];
}
export interface PipelineDescriptionResponse {
  pipelineDescription: PipelineDescription;
}

export interface RunDetails {
  id: string;
  name: string;
  parent: string;
  triesLeft: number;
  headAttempt: string;
  resource: string;
  resourceId: string;
  resourceRegion: string;
  sphere: string;
  attemptCount: number;
  type: string;
  status: string;
  actualStartTime: string;
  actualEndTime: string;
  scheduledStartTime: string;
  scheduledEndTime: string;
  input: string;
  version: number;
  componentParent: string;
}

export type PipelineActualDefinition =
  | string
  | {
      [key: string]: string | number | boolean | PipelineActualDefinition; // Recursive for sub-objects
    };
