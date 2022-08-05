import { useState, useEffect, useRef, DependencyList } from "react";
import EventSource from "eventsource";

function useEventSource(
  params: { url: string; callback: (data: any) => any }[]
) {
  const reference = useRef([]);

  params.forEach(({ url, callback }, index) => {
    if (!reference.current[index]) {
      reference.current[index] = new EventSource(url);
    }
    reference.current[index].onmessage = (e) => {
      callback(JSON.parse(e.data));
    };
  });

  useEffect(() => {
    return () => {
      reference.current.forEach((eventSource) => eventSource.close());
      console.log("Close Event Source Stream");
    };
  }, []);
}

export default useEventSource;
