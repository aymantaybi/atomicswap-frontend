import { useState, useEffect } from 'react';

function useFetch<T>(url: string, formatter: (data: any) => any) {

    const [data, setData] = useState<T>(null);
    const [error, setError] = useState(null);

    useEffect(() => {

        (async () => {

            var response = await fetch(url);

            setData(formatter(await response.json()));

        })()

    }, [url]);

    return [data, setData];
}

export default useFetch;