import { app, Exception, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { getCredentials } from "../utils/getCredentials";
import { IngestionBodyParams, IngestionHeaderParams } from "../utils/ingestionTypes.type";

const {
    endpoint,
    key,
    searchEndpoint,
    searchKey,
    storageConnectionString,
    storageContainer,
    embeddingDeploymentName
} = getCredentials();

export async function ingestion(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    //1. Compute the path for ingestion
    const path = `${endpoint}/openai/extensions/on-your-data/ingestion-jobs/${crypto.randomUUID()}?api-version=2023-10-01-preview`

    //2. Compute the headers and payload
    const headers:IngestionHeaderParams = {
        "api-key": key,
        searchServiceEndpoint: searchEndpoint,
        searchServiceAdminKey: searchKey,
        storageConnectionString: storageConnectionString,
        storageContainer: storageContainer,
        embeddingEndpoint: `${endpoint}/openai/deployments/${embeddingDeploymentName}/embeddings?api-version=2024-02-15-preview`,
        embeddingKey: key,
    }

    const payload:IngestionBodyParams = {
        dataRefreshIntervalInMinutes: 60,
    }

    //3. Ingest the data
    try {
        const response = await fetch(path, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            body: JSON.stringify(payload)
        }).then(res => res.json());

        console.log(response);
        return {
            status: 200,
            body: response
        };
    } catch (error) {
        console.error(error);
        return { status: 500, body: (error as Exception).message };
    
    };
}

app.http('ingestion', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: ingestion
});
