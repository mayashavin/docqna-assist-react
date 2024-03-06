export interface IngestionHeaderParams {
    "api-key": string;
    searchServiceEndpoint: string;
    searchServiceAdminKey?: string;
    storageConnectionString: string;
    storageContainer: string;
    embeddingEndpoint?: string;
    embeddingKey?: string;
    embeddingDeploymentName?: string;
}

export interface IngestionBodyParams {
    dataRefreshIntervalInMinutes: number;
    chunkSize?: number;
    id?: string;
    completionAction?: IngestionJobCompletionAction;
    progress?: StageProgress[];
    warnings?: string[];
}

export type IngestionJobCompletionAction = "cleanUpAssets" | "keepAllAssets"

export interface StageProgress {
    name: string;
    processedItems: number;
    totalItems: number;
}