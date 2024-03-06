import { Link, Button } from "@fluentui/react-components";
import { ChatBubblesQuestion24Filled, DocumentTableCube24Filled } from '@fluentui/react-icons';

export const Home = () => {
    return (
      <div>
        <h1>Welcome to Doc Assistant Demo</h1>
        <p>
          This is a demo UI application demo for Doc Assistant as a service, where you can try out the Q&A and Ingestion flow. 
        </p>
        <p>
          Doc Assistant consists of two main flows: Ingestion and Querying.
          <ul>
            <li>Ingestion is the process of pre-processing a set of documents into chunks and saving them to the search database, ready for searching for the right match.</li>
            <li>Querying is the process of asking questions to the Doc Assistant service. The service will then search the indexed documents and return the best matching answer.</li>
          </ul>
        </p>
        <p>
          This demo leverages the following technologies:
          <ul>
            <li>
              <Link href="https://learn.microsoft.com/en-us/azure/ai-services/openai/references/on-your-data">Azure OpenAI On Your Data</Link> for both querying and ingestion
            </li>
            <li>
              <Link href="https://learn.microsoft.com/en-us/azure/azure-functions/functions-overview">Azure Serverless Functions</Link> for the backend APIs that wrap the Azure OpenAI On Your Data's API
            </li>
            <li>
              <Link href="https://learn.microsoft.com/en-us/azure/search/search-what-is-azure-search">Azure AI Search</Link> for the smart search index database
            </li>
            <li>
              <Link href="https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-introduction">Azure Blob Storage</Link> for storing the documents needed for the ingestion flow.
            </li>
            <li>
              <Link href="https://learn.microsoft.com/en-us/azure/static-web-apps/overview">Azure Static Web Apps</Link> for hosting the UI application
            </li>
            <li>
              <Link href="https://reactjs.org/">React</Link> for building the web app.
            </li>
          </ul>
        </p>
        <div style={{ display: 'flex', gap: '1rem', margin: 'auto'}}>
          <Button icon={<ChatBubblesQuestion24Filled />} as="a" appearance='primary' href="/qna">Try Q&A</Button>
          <Button icon={<DocumentTableCube24Filled />} as="a" href="/ingest-data">Try Ingestion</Button>
        </div>
      </div>
    );
}
