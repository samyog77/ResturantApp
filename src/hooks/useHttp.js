import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config){
    const response =await fetch (url, config);

    const resData = await response.json();

    if (! response.ok){
        throw new Error(
            resData.message || 'Something went wrong, failed to send request.'
        );
    }

    return resData;
}
export default function useHttp(url, config, initialData){
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError]=useState();

    function clearData(){
        setData(initialData);
    }
  
    const sendRequest = useCallback(
        async function sendRequest(data){
        setIsLoading(true);
        console.log('Data Sent to sendHttpRequest:', data); // Log data being sent to HTTP request
        try{
            const resData = await sendHttpRequest(url, {...config, body: data});
            console.log('Response Data:', resData); // Log the response data
            setData(resData);
        }catch (error){
            console.error('Request Error:', error.message || 'Unknown error'); // Log any error
            setError(error.message || 'Something went wrong')
        }
        setIsLoading(false);
    }, 
    [url, config]
    ); 
    
    useEffect(() => {
        if (config && config.method === 'GET' || !config.method || !config){
            sendRequest();
        }
        
    }, [sendRequest, config]);

    return{
        data,
        isLoading,
        error,
        sendRequest,
        clearData
    };
}
