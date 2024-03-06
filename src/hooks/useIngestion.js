import {
    useQuery,
    useMutation,
  } from '@tanstack/react-query'

export const useIngestion = () => {
    const createInjestion = useMutation({
        mutationFn: () => {
        return fetch('/api/ingestion', {
            method: 'POST',
            body: JSON.stringify({}),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => res.json())
    }
});

    const activeIngestions = useQuery({ queryKey: ['ingestions'], queryFn: () => {
        return fetch('/api/ingestions').then((res) => res.json());
    }});

    const getIngestion = useMutation({
        mutationFn: (jobId) => {
            return fetch('/api/ingestionStatus', {
                method: 'POST',
                body: JSON.stringify({ jobId }),
            }).then((res) => res.json());
        }
    })

    return {
        createInjestion,
        activeIngestions,
        getIngestion,
    }
}