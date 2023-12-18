import { useEffect, useRef, useState } from 'react';

import tripObject from '../database/trips.json';
import stationsObject from '../database/stations.json';

import { DEFAULT_FETCH_TIMEOUT } from '../env/constants';

export const useFetch = (url, headers={}, _body={}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    // Use an object as Reference,
    // otherwise the page will keep reloading for ever
    const body = useRef(_body);

    useEffect(() => {
        // const controller = new AbortController()

        const fetchData = async () => {
            setLoading(true);
            // console.log("FETCHING DATA")
            // console.log(url)
            try {

                // This should be the actual fetch request
                // const response = await fetch(url,
                //     {
                //         signal: controller.signal
                //     }
                // );

                // Mock fetch request and response object
                const response = {};
                await new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve();
                    }, DEFAULT_FETCH_TIMEOUT);
                });
                if (url.includes("/fetch/stations")) {
                    // console.log("FetchStations");
                    response.ok = true;
                    response.json = () => {
                        return new Promise((resolve, reject) => {
                            resolve(stationsObject);
                        })
                    }
                }
                else if (url.includes("/fetch/trips/")) {
                    response.ok = true;
                    response.json = () => {
                        return new Promise((resolve, reject) => {
                            const trips = tripObject[url.split("/fetch/trips/")[1]];
                            // console.log(trips);
                            if (trips === undefined) {
                                resolve([]);
                            }
                            resolve(trips);
                        })
                    }
                }
                else {
                    console.log("URL did not match!");
                    throw new Error("URL did not match!");
                }

                if (!response.ok) {
                    throw new Error("Request failed with status " + response.status);
                }

                const data = await response.json();
                setLoading(false);
                setError("");
                setData(data);

                // console.log(data)

            }
            catch (error) {
                setLoading(false);
                setError(error.message);
            }

        // console.log("FETCH FINISHED")

        }
        fetchData();
        // console.log("FETCH FINISHED2")

        // return () => controller.abort();
    }, [url, body]);

    return { data, loading, error };

}