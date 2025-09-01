import { NavLink, useNavigate } from 'react-router';
import * as Yup from 'yup';
import Input from '../components/Input';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { login } from '../store/auth';
import type { LoginRequest, LoginResponse } from '../api/auth';
import { useAppSelector } from '../store/hooks';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Alert from '../components/Alert';
import type { AppDispatch } from '../store/store';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email().required('Required'),
    password: Yup.string().required('Required'),
});

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { loading, api } = useAppSelector((s) => s.users);
    const formik = useFormik<LoginRequest>({
        validationSchema: LoginSchema,
        initialValues: {
            password: '',
            email: '',
        },
        onSubmit: (values) => {
            dispatch(login(values)).then(res => {
                if ((res.payload as LoginResponse).status == "success") navigate('/');
            });
        },
    });

    return (
        <section className="h-screen">
            <div className="h-full flex flex-col items-center justify-center px-6 py-8 mx-auto">
                {api?.status == 'failed' && (
                    <div className="w-full sm:max-w-md mb-4">
                        <Alert variant="Danger" message={api?.message as string} />{' '}
                    </div>
                )}

                <div className="w-full bg-white rounded-lg shadow sm:max-w-md">
                    <div className="p-6 space-y-4">
                        <h1 className="text-xl font-bold leading-tight text-gray-900">Sign in to your account</h1>
                        <form className="space-y-4" onSubmit={formik.handleSubmit}>
                            <Input
                                label={'Email'}
                                type={'email'}
                                id={'email'}
                                name={'email'}
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.errors.email}
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
                                disabled={loading}
                            >
                                {!loading ? (
                                    <span>Login</span>
                                ) : (
                                    <span className="animate-spin flex justify-center">
                                        <AiOutlineLoading3Quarters size={20} />
                                    </span>
                                )}
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
