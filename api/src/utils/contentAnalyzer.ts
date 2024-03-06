import ContentSafetyClient, { 
    AnalyzeText200Response, 
    AnalyzeTextDefaultResponse, 
    AnalyzeTextParameters, 
    isUnexpected  
} from "@azure-rest/ai-content-safety";
import { AzureKeyCredential } from "@azure/core-auth";

const endpoint = process.env["CONTENT_SAFETY_ENDPOINT"] || "<endpoint>";
const key = process.env["CONTENT_SAFETY_API_KEY"] || "<key>";

const Levels = {
    Safe: 0,
    Low: 2,
    Medium: 4,
    Hight: 6,
};

const acceptanceCategoriesLevel = {
    Hate: Levels.Low,
    SelfHarm: Levels.Low,
    Sexual: Levels.Low,
    Violence: Levels.Low,
};

export interface AnalyzerResult {
    isFiltered: boolean;
    filteredCategories: string[];
}

type AzureAnalyzerResult = AnalyzeText200Response | AnalyzeTextDefaultResponse;

export async function ContentAnalyze(content: string):Promise<AnalyzerResult> {
    const credential = new AzureKeyCredential(key);
    const client = ContentSafetyClient(endpoint, credential);

    //1. Create the request
    const request: AnalyzeTextParameters = {
        body: {
            text: content,
        },
    };

    const response = await client.path('/text:analyze').post(request);
    
    //2. Check the result if any error
    if (isUnexpected(response)) {
        throw response;
    }

    //3. Analyze the result
    let isFiltered = false;
    const filteredCategories:string[] = [];

    const categories = response.body?.categoriesAnalysis;

    if (categories) {
        for (const category of categories) {
            const categoryName = category.category;
            const severity = category.severity;
            const acceptanceLevel = acceptanceCategoriesLevel[categoryName as keyof typeof acceptanceCategoriesLevel] || Levels.Safe;

            if (severity !== undefined && severity >= acceptanceLevel) {
                isFiltered = true;
                filteredCategories.push(categoryName);
            }
        }
    }
    
    //4. Return the analyzed result
    return {
        isFiltered,
        filteredCategories,
    };
}