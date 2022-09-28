import React, { useCallback } from 'react';
import {useState} from 'react';

const useHttp =() => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const sendRequest = useCallback(async(responseConfig, applyData) => {
        setIsLoading(true);
        try {
            const response = await fetch(responseConfig.url, {
                method: responseConfig.method ? responseConfig.method : 'GET',
                body: responseConfig.body ? JSON.stringify(responseConfig.body) : null,
                headers: responseConfig.headers ? responseConfig.headers : {}
            })

            if (response.status === 400 || response.status === 404){
                throw new Error('something went wrong')
            }

            const data = await response.json();
            applyData(data);
        } catch (err) {
            setError(err.message)
        }
        setIsLoading(false);
    }, [])

  return {
    error,
    isLoading,
    sendRequest
  }
}

export default useHttp;