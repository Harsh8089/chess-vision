import { useGoogleLogin } from '@react-oauth/google'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LogIn } from 'lucide-react';

interface IFormInput {
    email: string,
    password: string
}

interface FormField {
    name: keyof IFormInput;
    placeholder: string;
    type?: string;
    validation: Record<string, any>;
}


const formFields: FormField[] = [
    {
        name: 'email',
        placeholder: 'email',
        validation: {
            required: "Email is required"
        }
    },
    {
        name: 'password',
        placeholder: 'password',
        type: 'password',
        validation: {
            required: "Password is required",
        }
    }
]

const FormInput = ({ 
    field, 
    register, 
    errors, 
    watch 
}: { 
    field: FormField;
    register: any;
    errors: any;
    watch?: any;
}) => {
    
    return (
        <div className='w-3/4'>
            <input 
                className='w-full flex flex-col gap-2 px-2 border-none outline-none h-10 rounded-md  bg-gray-600 text-white'
                type={field.type || 'text'}
                placeholder={field.placeholder}
                {...register(field.name, field.validation)} 
            />
            {errors[field.name] && (
                <p className='text-red-light'>{errors[field.name].message}</p>
            )}
        </div>
    );
};


function Login() {
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const login = useGoogleLogin({
        onSuccess: (response) => {
            const { access_token, token_type } = response;
            const userData = {access_token, token_type};
            setUser(userData);
            navigate('/home');
        },
        onError: (err) => {
            console.log(err)
        }
    });

    const { register, handleSubmit, formState: { errors }, watch } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

    return (
        <div className='w-1/2 flex flex-col justify-between items-center opacity-80'>
            <div className='flex gap-4 text-xl w-full justify-center'>
                <LogIn />
                <h2>Login</h2>
            </div>
            <form 
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col gap-4 items-center justify-center w-full mt-10'
            >
                {formFields.map((field) => (
                    <FormInput 
                        key={field.name}
                        field={field}
                        register={register}
                        errors={errors}
                        watch={watch}
                    />
                ))}

                <button 
                    type="submit" 
                    className='bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 w-3/4'
                >
                    Login
                </button>
            </form>
            <div className='m-6'>OR</div>
            <button 
                onClick={() => login()}
                className='border-white border-2 w-3/4 p-2 rounded-lg place-items-end'
            >
                Sign in with Google 🚀 
            </button>
        </div>
     )
}

export default Login


