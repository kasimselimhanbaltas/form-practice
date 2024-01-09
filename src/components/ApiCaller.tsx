import React, { useState } from 'react';
import useApiRequest from '../hooks/CustomHook';

const ApiCaller = () => {
    const { data, loading, error, fetchData } = useApiRequest();
    const [dropdownValue, setDropdownValue] = useState('');
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event: any) => {
        setInputValue(event.target.value);
    };
    const handleDropdownChange = (event: any) => {
        setInputValue(event.target.value)
        setDropdownValue(event.target.value);
    };

    return (
        <div>
            <label htmlFor="">Type a url to see fetch an API:</label> <br />
            <input style={{ width: "300px", padding: "10px" }} type="text" value={inputValue}
                onChange={handleInputChange} placeholder='Write an API or select from the dropdown menu' />
            <br />
            <div style={{ display: "inline" }}>
                <select value={dropdownValue} className="selectUser" onChange={handleDropdownChange}>
                    <option key={0} value="">Select </option>
                    <option key={1} value="https://jsonplaceholder.typicode.com/users">Users</option>
                    <option key={2} value="https://jsonplaceholder.typicode.com/albums">Albums</option>
                    <option key={3} value="https://jsonplaceholder.typicode.com/photos">Photos</option>
                    <option key={4} value="https://jsonplaceholder.typicode.com/wrongAPI">Wrong</option>

                </select>
            </div>
            <button style={{ padding: 10 }} onClick={() => { fetchData(inputValue); }}>Make Request</button>

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
