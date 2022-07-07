import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [name, setName] = useState('');
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const timeOutId = setTimeout(() => setQuery(name), 1000)
        const loadUsers = async () => {
            const config = {
                headers: {
                    "Authorization": `Token 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`
                }
            }
            if (query.length > 0) {
                const response = await axios.get(`https://api.github.com/search/users?q=${query}&per_page=5`, config);
                setUsers(response.data.items);
            }
            if (query.length === 0) {
                setUsers([]);
            }
        }

        loadUsers();

        return () => clearTimeout(timeOutId);

    }, [name, query]);



    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <div className='mb-60 relative'>
                <h1 className='text-center text-3xl mb-5 text-slate-700'>Github Search</h1>
                <input type="text" className='border w-96 border-slate-400 rounded-md px-5 py-2 focus:outline-slate-400' placeholder='Search username...' value={name} onChange={e => setName(e.target.value)} />
                {users.length > 0 ? (
                <div className='bg-slate-100 w-full border border-slate-400 rounded-md absolute'>
                    {users.map((el, i) => (
                        <h1 className='hover:bg-slate-300 px-5 cursor-pointer' key={i} onClick={() => navigate(`/user/${el.login}`)}>{el.login}</h1>
                    ))}
                </div>
                ) : ('')}
            </div>
        </div>
    )
}

export default Home