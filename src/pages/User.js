import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

function User() {
    const [user, setUser] = useState([]);
    const [repo, setRepo] = useState([]);
    const [oneRepo, setOneRepo] = useState(null);
    const [perPage, setPerPage] = useState(5);
    const [page, setPage] = useState(1);
    const [pageDisable, setPageDisable] = useState([]);

    const [show, setShow] = useState(false);

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        const loadUser = async () => {
            const config = {
                headers: {
                    "Authorization": `Token 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`
                }
            }
            const response = await axios.get(`https://api.github.com/users/${id}`, config);
            const res = await axios.get(`https://api.github.com/users/${id}/repos?per_page=${perPage}&page=${page}`, config);
            const resd = await axios.get(`https://api.github.com/users/${id}/repos?per_page=${perPage}&page=${page + 1}`, config);
            setUser(response.data);
            setRepo(res.data);
            setPageDisable(resd.data);
        }

        loadUser();
    }, [id, perPage, page])
    return (
        <div className='relative'>
            <div className='w-screen border-b-2 border-slate-300 flex flex-wrap justify-center py-5 gap-5 text-center'>
                <div className='rounded-full overflow-hidden h-60 w-60 border-slate-400 border'>
                    <img src={user.avatar_url} alt="" className='w-full' />
                </div>
                <div className='my-auto'>
                    <h1 className='font-semibold text-3xl'>{user.name}</h1>
                    <h1 className='text-xl'>{user.login}</h1>
                </div>
            </div>

            {/* BUTTON */}
            <div className='flex justify-between items-center mt-10 px-10 2xl:px-24'>
                <h1 className='cursor-pointer text-blue-700' onClick={() => navigate('/')}>‹ Back</h1>
                <div className='relative'>
                    <button className='bg-blue-600 px-5 py-3 text-white font-bold rounded-lg flex items-center hover:bg-blue-700' onClick={() => {
                        if (show) {
                            setShow(false)
                        } else {
                            setShow(true)
                        }
                    }}>Per Page <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></button>
                    <div className={show ? '' : 'hidden'}>
                        <div className='absolute z-50 bg-blue-400 text-white text-center w-full -mt-1 rounded-b-lg py-1'>
                            <h1 className='hover:bg-blue-600 cursor-pointer' onClick={() => {
                                setPerPage(5);
                                setPage(1);
                                setShow(false);
                            }}>5</h1>
                            <h1 className='hover:bg-blue-600 cursor-pointer' onClick={() => {
                                setPerPage(10);
                                setPage(1);
                                setShow(false);
                            }}>10</h1>
                            <h1 className='hover:bg-blue-600 cursor-pointer' onClick={() => {
                                setPerPage(20);
                                setPage(1);
                                setShow(false);
                            }}>20</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex justify-end mt-5 px-10 2xl:px-24 gap-5'>
                <button className='bg-blue-600 px-5 py-2 text-white font-bold rounded-lg flex items-center hover:bg-blue-700 disabled:opacity-60 disabled:hover:bg-blue-600' disabled={page === 1 ? true : false} onClick={() => setPage(page - 1)}>Previous</button>
                <button className='bg-blue-600 px-5 py-2 text-white font-bold rounded-lg flex items-center hover:bg-blue-700 disabled:opacity-60 disabled:hover:bg-blue-600' disabled={pageDisable.length > 0 ? false : true} onClick={() => setPage(page + 1)}>Next</button>
            </div>


            <div className='py-8 flex gap-5 flex-wrap justify-center 2xl:px-60'>
                {repo.map((el, i) => (
                    <div className='border border-slate-700 w-96 p-4 cursor-pointer' key={i} onClick={() => {
                        setOneRepo(el);
                    }}>
                        <h3 className='text-end opacity-80'>ID: {el.id}</h3>
                        <h1 className='text-2xl font-semibold text-slate-800'>{el.name}</h1>
                        <h2 className='text-slate-600'>{el.language}</h2>
                    </div>
                ))}

            </div>

            {/* MODALS */}
            {oneRepo ? (
                <div className="absolute h-screen w-screen top-0 bg-black-rgba">
                    <div className='flex justify-center items-center h-full w-full'>
                        <div className='w-96 p-5 bg-slate-100 rounded-lg'>
                            <h1 className='text-2xl font-semibold text-slate-800 text-center mb-4'>{oneRepo.name}</h1>
                            <h1 className='mb-3'>ID: {oneRepo.id}</h1>
                            <h1 className='mb-3'>Description: {oneRepo.description ? oneRepo.description : '-'}</h1>
                            <h1 className='mb-3'>Language: {oneRepo.language}</h1>
                            <h1 className='mb-3'>Create at: {moment(oneRepo.created_at).format('LLL')}</h1>
                            <h1 className='mb-3'>Update at: {moment(oneRepo.update).format('LLL')}</h1>

                            <button className='bg-red-500 text-white rounded-lg w-full py-2' onClick={() => setOneRepo(null)}>Close</button>
                        </div>
                    </div>
                </div>
            ) : (
                ''
            )}
        </div>
    )
}

export default User