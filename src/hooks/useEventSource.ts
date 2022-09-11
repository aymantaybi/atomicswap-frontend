import { useState, useEffect, useRef, DependencyList } from "react";
import EventSource from "eventsource";

function useEventSource(
  params: { url: string; callback: (data: any) => any }[]
) {
  const reference = useRef([]);

  params.forEach(({ url, callback }, index) => {
    if (reference.current[index]?.url != url) {
      reference.current[index]?.close();
      reference.current[index] = new EventSource(url);
    }
    reference.current[index].onmessage = (e) => {
      let json = JSON.parse(e.data);
      console.log(json);
      callback(json);
    };
    reference.current[index].onopen = () => {
      console.log('Event source open !');
    };
    reference.current[index].onclose = () => {
      console.log('Event source close !');
    };
  });

  console.log(reference.current);

  useEffect(() => {
    return () => {
      reference.current.forEach((eventSource) => eventSource.close());
      console.log("Close Event Source Stream");
    };
  }, []);
}

export default useEventSource;
