export const getCredentials = () => {    
    const endpoint = process.env["OPEN_AI_ENDPOINT"] || "<endpoint>";
    const key = process.env["OPEN_AI_KEY"] || "<key>";
    const deploymentId = process.env["OPEN_AI_GPT_DEPLOYMENT"] || "<deploymentId>";
    const searchEndpoint = process.env["SEARCH_ENDPOINT"] || "<searchEndpoint>";
    const searchKey = process.env["SEARCH_KEY"] || "<searchKey>";
    const searchIndex = process.env["SEARCH_INDEX"] || "<storageConnectionString>";
    const embeddingDeploymentName = process.env["OPEN_AI_EMBEDDINGS_DEPLOYMENT"] || "<embeddingDeploymentName>";
    const storageConnectionString = process.env["STORAGE_CONNECTION_STRING"] || "<storageConnectionString>";
    const storageContainer = process.env["STORAGE_CONTAINER"] || "<storageContainer>";

    return {
        endpoint,
        key,
        deploymentId,
        searchEndpoint,
        searchKey,
        searchIndex,
        embeddingDeploymentName,
        storageConnectionString,
        storageContainer
    }
}