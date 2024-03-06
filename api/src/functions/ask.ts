import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { getCredentials } from "../utils/getCredentials";
import { ROLES } from "../utils/messageParams.type";
import { AISearchDataSource, AISearchDataSourceParams, QueryTypes } from "../utils/datasourceParams.type";
import { Citation, OYDResponseParams } from "../utils/OYDResponseParams.type";

interface BodyPayload {
    query: string;
}

const { 
    searchEndpoint, 
    searchIndex, 
    searchKey, 
    endpoint, 
    key, 
    embeddingDeploymentName, 
    deploymentId 
} = getCredentials();

export async function ask(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const bodyPayload = await request.json() as BodyPayload;

    const query = bodyPayload.query || '';

    if (!query?.trim()) {
        return { status: 400, body: 'Query is required' };
    }

    //Get the answer
    const answer = await getAnswer(query);

    return { jsonBody: answer, status: 200 };
};

async function getAnswer(query: string, additionalPrompt?: string): Promise<{ answer: string, citations: Citation[]}> {
    //1. Compute the path for the chat
    const path = `${endpoint}/openai/deployments/${deploymentId}/chat/completions?api-version=2024-02-15-preview`;

    //2. Compute the headers' credentials
    const headers = {
        'api-key': key,
        'chatgpt_url': path,
        'chatgpt_key': key,
    };

    //3. Compute the data sources
    const dataSources:AISearchDataSource[] = [{
        type: "azure_search",
        parameters: {
            endpoint: searchEndpoint,
            key: searchKey,
            index_name: searchIndex,
            queryType: QueryTypes.VectorSemanticHybrid,
            roleInformation: additionalPrompt,
            embeddingKey: key,
            embeddingEndpoint: `${endpoint}/openai/deployments/${embeddingDeploymentName}/embeddings?api-version=2024-02-15-preview`,
            semanticConfiguration: 'default',
            inScope: true,
        }
    }]

    //4. Compute the messages
    const messages = [{
        role: ROLES.USER,
        content: query,
    }]

    //5. Get the answer
    try {
        const response:OYDResponseParams = await fetch(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            body: JSON.stringify({
                messages,
                data_sources: dataSources,
                temperature: 0,
                top_p: 1,
            })
        }).then(res => res.json());

        console.log(response);

        //6. Return the answer
        return {
            answer: response.choices[0].message.content,
            citations: response.choices[0].message.context.citations,
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

app.http('ask', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: ask
});
