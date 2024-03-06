import { Link, Button, Spinner } from '@fluentui/react-components';
import {IngestionJobsList} from './IngestionJobsList';
import { useIngestion } from '../../hooks/useIngestion';
import { useState } from 'react';
import { ArrowRotateClockwise24Regular, ArrowSync24Regular, CheckmarkCircle16Filled, Circle20Filled, ErrorCircle16Filled } from '@fluentui/react-icons';

const Statuses = {
    failed: {
        label: "Failed",
        icon: <ErrorCircle16Filled style={{ color: 'red'}} />
    },
    succeeded: {
        label: "Succeeded",
        icon: <CheckmarkCircle16Filled style={{ color: 'green'}} />
    },
    running: {
        label: "Running",
        icon: <Spinner size='extra-tiny' />
    },
    notRunning: {
        label: "Not Running",
        icon: <Circle20Filled style={{ color: 'gray'}} />
    }
};

export const Ingestion = () => {
    const [newIngestion, setNewIngestion] = useState(null);
    const [showActiveIngestions, setShowActiveIngestions] = useState(false);
    const {
        createInjestion,
        getIngestion,
    } = useIngestion();

    const onCreate = async () => {
        await createInjestion.mutate(null, {
            onSuccess: (res) => {
                setNewIngestion(res);
            }
        });
    }

    const onRefresh = async () => {
        await getIngestion.mutate(newIngestion.id, {
            onSuccess: (res) => {
                setNewIngestion(res);
            }
        
        });
    }
    return (
        <div style={{ marginInline: '5rem'}}>
            <h1>Ingestion Phase Demo</h1>
            <p>
                <span>This is the Ingestion flow demo page.</span>
                <span>Ingestion flow is when you can pre-upload documents to the Doc Assistant service. 
                    The service then  will ingest, create embeddings and index them to AI Search instance, ready for Q&A flow.</span>
            </p>
            <p>
                <span>You can configure your serverless function api to ingest the documents to your Azure Search instance.
                The whole process is automated and executed on top of</span>
                <Link 
                    style={{ marginInlineStart: '2px' }}
                    href="https://learn.microsoft.com/en-us/rest/api/azureopenai/ingestion-jobs/create?view=rest-azureopenai-2023-10-01-preview&tabs=HTTP">
                    Azure OpenAI On Your Data's Ingestion API
                </Link>.
            </p>
            <p>
                To start the Ingestion flow, you can click the Ingest button below:
            </p>
            <div style={{ display: 'flex', gap: '1rem'}}>
                <Button icon={createInjestion.isPending ? <Spinner size='extra-tiny'/> : <ArrowSync24Regular/>} appearance='primary' onClick={onCreate} disabled={createInjestion.isPending}>Start new Ingestion Job</Button>
                <Button onClick={() => setShowActiveIngestions(!showActiveIngestions)}>{!showActiveIngestions ? "View" : "Hide"} active Ingestion Jobs</Button>
            </div>
            <div>
                {createInjestion.isPending && <p>Creating Ingestion Job...</p>}
                {createInjestion.isSuccess && newIngestion && <div>
                    <h2>New Ingestion Job</h2>
                    <p>Job ID: {newIngestion.id}</p>
                    <p style={{ display: 'flex', alignItems: 'center' }}>Status: {Statuses[newIngestion.status].icon} {Statuses[newIngestion.status].label}</p>
                    <Button icon={getIngestion.isPending ? <Spinner size='extra-tiny'/> : <ArrowRotateClockwise24Regular />} onClick={onRefresh} disabled={getIngestion.isPending}>Refresh</Button>
                </div>}
            </div>
            {showActiveIngestions && (<section>
                <h2>Ingestion Jobs</h2>
                <IngestionJobsList />
            </section>)}
        </div>
    );
}