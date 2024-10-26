import { 
    UserRoundPlus,  
    Mail, 
    Lock, 
    User 
} from 'lucide-react'; 
import { useForm, type SubmitHandler } from 'react-hook-form';
import Button from './auth/Button.tsx'; 
import FormInput from './auth/FormInput.tsx';

export interface IFormInput {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface FormField {
    name: keyof IFormInput;
    placeholder: string;
    type?: string;
    icon: React.ReactNode;
    validation: Record<string, any>;
}

const formFields: FormField[] = [
    {
        name: 'username',
        placeholder: 'Username',
        icon: <User className="h-5 w-5" />,
        validation: {
            required: "Username is required",
            minLength: {
                value: 3,
                message: "Username must be at least 3 characters"
            }
        }
    },
    {
        name: 'email',
        placeholder: 'Email',
        icon: <Mail className="h-5 w-5" />,
        validation: {
            required: "Email is required",
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
            }
        }
    },
    {
        name: 'password',
        placeholder: 'Password',
        type: 'password',
        icon: <Lock className="h-5 w-5" />,
        validation: {
            required: "Password is required",
            minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
            }
        }
    },
    {
        name: 'confirmPassword',
        placeholder: 'Confirm Password',
        type: 'password',
        icon: <Lock className="h-5 w-5" />,
        validation: {
            required: "Please confirm your password"
        }
    }
];

function Register() {
    const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm<IFormInput>();
    
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        console.log(data);
    };

    return (
        <div className="w-full max-w-md mx-auto p-6 space-y-8">
            <div className="flex flex-col items-center gap-2">
                <div className="p-3 bg-blue-500 bg-opacity-10 rounded-full">
                    <UserRoundPlus className="h-6 w-6 text-blue-500" />
                </div>
                <h2 className="text-2xl font-semibold">Create Account</h2>
                <p className="text-gray-400 text-center">
                    Join our community and start your journey
                </p>
            </div>
            
            <form 
                onSubmit={handleSubmit(onSubmit)} 
                className="space-y-6"
            >
                <div className="space-y-4">
                    {formFields.map((field) => (
                        <FormInput 
                            key={field.name}
                            field={field}
                            register={register}
                            errors={errors}
                            watch={watch}
                        />
                    ))}
                </div>

                <Button isSubmitting={isSubmitting} title='Create Account' />
            </form>
        </div>
    );
}

export default Register;
