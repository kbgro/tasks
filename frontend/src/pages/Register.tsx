import { useFormik } from 'formik';
import { NavLink, useNavigate } from 'react-router';
import * as Yup from 'yup';
import Input from '../components/Input';
import { register } from '../store/auth';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store/store';
import Alert from '../components/Alert';
import { useState } from 'react';

const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Required'),
    email: Yup.string().email().required('Required'),
    password: Yup.string()
        .required('Required')
        .min(8, 'Must be at least 8 characters')
        .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Must contain at least one lowercase letter')
        .matches(/\d/, 'Must contain at least one number')
        .matches(/[@$!%*?&]/, 'One special character'),
    confirmpassword: Yup.string()
        .required('Please confirm your password')
        .oneOf([Yup.ref('password')], 'Password must match'),
});

function Register() {
    const [error, setError] = useState<string>();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const formik = useFormik({
        validationSchema: LoginSchema,
        initialValues: {
            password: '',
            username: '',
            email: '',
            confirmpassword: '',
        },
        onSubmit: async (values) => {
            setError("");
            console.log({ values });
            const res = await dispatch(register(values)).unwrap();
            console.log({ res });
            if (res.status == 'success') navigate('/login');
            else {
                setError(res.message);
            }
        },
    });

    return (
        <section className="h-screen">
            <div className="h-full flex flex-col items-center justify-center px-6 py-8 mx-auto">
                {error && (
                    <div className="w-full sm:max-w-md mb-4">
                        <Alert variant="Danger" message={error} />
                    </div>
                )}

                <div className="w-full bg-white rounded-lg shadow sm:max-w-md">
                    <div className="p-6 space-y-4">
                        <h1 className="text-xl font-bold leading-tight text-gray-900">Create an a account</h1>
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
                                label={'Email'}
                                type={'email'}
                                id={'email'}
                                name={'email'}
                                value={formik.values.email}
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
                            <Input
                                label={'ConfirmPassword'}
                                type={'password'}
                                id={'confirmpassword'}
                                name={'confirmpassword'}
                                value={formik.values.confirmpassword}
                                onChange={formik.handleChange}
                                error={formik.errors.confirmpassword}
                            />

                            <button
                                type="submit"
                                className="w-full text-white bg-orange-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
                            >
                                Register
                            </button>

                            <p className="text-sm font-light text-gray-500">
                                Already have an account?
                                <NavLink to="/login" className="font-medium text-orange-600 ms-2 hover:underline">
                                    Login
                                </NavLink>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Register;
