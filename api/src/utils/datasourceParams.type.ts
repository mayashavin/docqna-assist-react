export const QueryTypes = {
    Semantic: "semantic",
    Vector: "vector",
    VectorSemanticHybrid: "vectorSemanticHybrid",
    VectorHybrid: "vectorSimpleHybrid"
} as const;

export type QueryTypesKeys = keyof typeof QueryTypes;
export type QueryTypesValues = typeof QueryTypes[QueryTypesKeys];

export interface DataSourceParams {
    index_name: string;
    inScope?: boolean;
    roleInformation?: string;
    topNDocuments?: number;
    semanticConfiguration?: string;
    filter?: string;
    embeddingEndpoint?: string;
    embeddingKey?: string;
    embeddingDeploymentName?: string;
    strictness?: number;
}

export interface AISearchDataSourceParams extends DataSourceParams {
    endpoint: string;
    queryType?: QueryTypesValues;
    key: string;
    fieldsMapping?: FieldMappings;
}

export interface AISearchDataSource {
    type: "azure_search";
    parameters: AISearchDataSourceParams;
}

export interface FieldMappings {
    titleField?: string;
    contentFields?: string;
    urlField?: string;
    filepathField?: string;
    contentFieldsSeparator?: string;
    vectorFields?: string[];
}