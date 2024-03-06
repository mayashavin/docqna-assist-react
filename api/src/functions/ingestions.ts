import { app, Exception, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { getCredentials } from "../utils/getCredentials";

const {
    endpoint,
    key,
} = getCredentials();

export async function ingestions(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const path = `${endpoint}/openai/extensions/on-your-data/ingestion-jobs?api-version=2023-10-01-preview`
    const headers = {
        "api-key": key,
    }

    try {
        const response = await fetch(path, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
        }).then(res => res.json());

        console.log(response);
        if (response.error) return { status: 500, body: response.error.message };
        
        return {
            status: 200,
            jsonBody: response
        };
    } catch (error) {
        console.error(error);
        return { status: 500, body: (error as Exception).message };
    
    };
}

app.http('ingestions', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: ingestions
});
