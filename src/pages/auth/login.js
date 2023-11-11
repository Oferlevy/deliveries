import axios from 'axios';
import { withRouter } from 'next/router';
import { useState } from 'react';
import { sha256 } from 'js-sha256';

export default withRouter(LoginPage);

function LoginPage({ router }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .post('/api/auth/login', {
                username,
                password: sha256(password),
            })
            .then(() => {
                const redirect = router.query.redirect;
                window.location.replace(redirect ?? '/menu');
            })
            .catch((err) => {
                if (err.response?.status === 401) {
                    setPassword('');
                } else {
                    console.log(err);
                }
            });
    };

    return (
        <div className='h-full flex items-center justify-center bg-gray-50 text-right'>
            <div className='bg-white m-3 p-8 rounded shadow-md w-full sm:w-96'>
                <h1 className='text-2xl font-bold mb-6 text-[#8b5cf6]'>
                    כניסה
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label
                            htmlFor='username'
                            className='block text-gray-700 text-sm font-bold mb-2'
                        >
                            שם משתמש
                        </label>
                        <input
                            name='username'
                            dir='rtl'
                            required={true}
                            placeholder='שם משתמש'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className='border-b-2 w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:shadow-outline'
                        />
                    </div>
                    <div className='mb-4'>
                        <label
                            htmlFor='password'
                            className='block text-gray-700 text-sm font-bold mb-2'
                        >
                            סיסמה
                        </label>
                        <input
                            name='password'
                            type='password'
                            dir='rtl'
                            required={true}
                            minLength={8}
                            placeholder='סיסמה'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='border-b-2 w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:shadow-outline'
                        />
                    </div>

                    <button
                        type='submit'
                        className='w-full bg-[#8b5cf6] text-white text-sm font-medium p-2 rounded'
                    >
                        התחברות
                    </button>
                </form>
            </div>
        </div>
    );
}
