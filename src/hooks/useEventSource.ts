import { useState, useEffect, useRef } from 'react';
import EventSource from 'eventsource';

function useEventSource(url: string, callback: (data: any) => any) {

    const eventSource = useRef(null);

    if (!eventSource.current) {
        eventSource.current = new EventSource(url);
    }
    
    eventSource.current.onmessage = (e) => {
        callback(JSON.parse(e.data));
    };

    useEffect(() => {

        return () => {
            console.log("Close Event Source Stream")
            eventSource.current.close();
        };

    }, []);
};

export default useEventSource;