import { useState, useEffect } from 'react';
import EventSource from 'eventsource';

function useEventSource(url: string, callback: (data: any) => any) {

    const eventSource = new EventSource(url);

    useEffect(() => {

        eventSource.onmessage = (e) => {
            callback(JSON.parse(e.data));
        };

        return () => {
            eventSource.close();
        };
    });
};

export default useEventSource;