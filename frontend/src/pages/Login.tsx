import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import * as Yup from 'yup';
import Input from '../components/Input';
import { useFormik } from 'formik';

const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
});

function Login() {
    const navigator = useNavigate();
    const [count, setCount] = useState(0);
    const formik = useFormik({
        validationSchema: LoginSchema,
        initialValues: {
            password: '',
            username: '',
        },
        onSubmit: (values) => {
            console.log({ values });
            navigator('/');
        },
    });

    return (
        <section className="h-screen">
            <div className="h-full flex flex-col items-center justify-center px-6 py-8 mx-auto">
                <div className="w-full bg-white rounded-lg shadow sm:max-w-md">
                    <div className="p-6 space-y-4">
                        <h1 className="text-xl font-bold leading-tight text-gray-900">Sign in to your account</h1>
                        <form className="space-y-4" onSubmit={formik.handleSubmit}>
                            <Input
                                label={'Username'}
                                type={'text'}
                                id={'username'}
                                name={'username'}
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                error={formik.errors.username}
                            />
                            <Input
                                label={'Password'}
                                type={'password'}
                                id={'password'}
                                name={'password'}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.errors.password}
                            />

                            <button
                                type="submit"
                                className="w-full text-white bg-orange-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
                            >
                                Login
                            </button>

                            <p className="text-sm font-light text-gray-500">
                                Don’t have an account yet?
                                <NavLink to="/register" className="font-medium text-orange-600 ms-2 hover:underline">
                                    Register
                                </NavLink>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
