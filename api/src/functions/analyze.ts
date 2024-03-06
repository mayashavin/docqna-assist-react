import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { ContentAnalyze } from "../utils/contentAnalyzer";

interface BodyPayload {
    query: string;
}

export async function upload(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const bodyPayload = await request.json() as BodyPayload;

    const query = bodyPayload.query || '';

    if (!query?.trim()) {
        return { status: 400, body: 'Query is required' };
    }

    const result = await ContentAnalyze(query);

    return {
        jsonBody: result,
        status: 200
    };
};

app.http('analyze', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: upload
});
