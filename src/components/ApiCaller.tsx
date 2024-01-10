import React, { useState } from 'react';
import useApiRequest from '../hooks/CustomHook';


const ApiCaller = () => {
    const { data, loading, error, get, put, post } = useApiRequest();
    const [dropdownValue, setDropdownValue] = useState('');
    const [userAPIurl, setUserAPIurl] = useState('');
    const [apiMethod, setAPImethod] = useState<'GET' | 'PUT' | 'POST'>('GET');
    const [requestBody, setRequestBody] = useState('');

    const handleFetch = () => {
        switch (apiMethod) {
            case "GET":
                get(userAPIurl);
                break;
            case "PUT":
                put(userAPIurl, requestBody);
                break;
            case "POST":
                post(userAPIurl, requestBody);
                break;
        }
    }

    const handleInputChange = (event: any) => {
        setUserAPIurl(event.target.value);
    };
    const handleDropdownChange = (event: any) => {
        setUserAPIurl(event.target.value)
        setDropdownValue(event.target.value);
    };

    //     {
    //         id: 1,
    //             title: 'foo',
    //                 body: 'bar',
    //                     userId: 1,
    //   }
    return (
        <div>
            <div>
                <button className='httpMethodSelectorButton' onClick={() => setAPImethod('GET')}>GET</button>
                <button className='httpMethodSelectorButton' onClick={() => setAPImethod('PUT')}>PUT</button>
                <button className='httpMethodSelectorButton' onClick={() => setAPImethod('POST')}>POST</button>
            </div>
            <label htmlFor="">Type a url to see fetch an API. Method: {apiMethod}</label> <br />
            <input style={{ width: "300px", padding: "10px" }} type="text" value={userAPIurl}
                onChange={handleInputChange} placeholder='Write an API or select from the dropdown menu' />

            {(['PUT', 'POST'].includes(apiMethod)) && (
                <input style={{ width: "300px", padding: "10px" }} type="text" value={requestBody}
                    onChange={(e) => setRequestBody(e.target.value)} placeholder='Write an API or select from the dropdown menu' />
            )} <br />

            <span>
                <select value={dropdownValue} className="selectUser" onChange={handleDropdownChange}>
                    <option key={0} value="">Select </option>
                    <option key={1} value="https://jsonplaceholder.typicode.com/users">Users</option>
                    <option key={2} value="https://jsonplaceholder.typicode.com/albums">Albums</option>
                    <option key={3} value="https://jsonplaceholder.typicode.com/photos">Photos</option>
                    <option key={4} value="https://jsonplaceholder.typicode.com/wrongAPI">Wrong</option>
                </select>
            </span>
            <button style={{ padding: 10 }} onClick={handleFetch}>Make Request</button>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {data && (
                <div style={{ textAlign: 'left' }}>
                    <h2>API Response:</h2>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default ApiCaller;
