import { app, Exception, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { getCredentials } from "../utils/getCredentials";
const {
    endpoint,
    key
} = getCredentials();

interface BodyPayload {
    jobId: string;
}

export async function ingestionStatus(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const bodyPayload = await request.json() as BodyPayload;

    const jobId = bodyPayload.jobId || '';

    if (!jobId?.trim()) {
        return { status: 400, body: 'jobId is required' };
    }

    const path = `${endpoint}/openai/extensions/on-your-data/ingestion-jobs/${jobId}?api-version=2023-10-01-preview`
    const headers = {
        "api-key": key,
    }

    try {
        const response = await fetch(path, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...headers
            }
        }).then(res => res.json());

        console.log(response);
        return {
            status: 200,
            jsonBody: response
        };
    } catch (error) {
        console.error(error);
        return { status: 500, body: (error as Exception).message };
    
    };
};

app.http('ingestionStatus', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: ingestionStatus
});
