import { useState } from 'react';
import { UserRoundPlus, Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { useForm, type SubmitHandler } from 'react-hook-form';

interface IFormInput {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface FormField {
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
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordField = field.type === 'password';

    const validation = field.name === 'confirmPassword' 
        ? { 
            ...field.validation,
            validate: (value: string) => value === watch("password") || "Passwords do not match"
        }
        : field.validation;

    return (
        <div className="w-full space-y-1">
            <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200">
                    {field.icon}
                </div>
                
                <input 
                    type={isPasswordField ? (showPassword ? 'text' : 'password') : field.type || 'text'}
                    placeholder={field.placeholder}
                    {...register(field.name, validation)}
                    className="
                        w-full h-12 pl-12 pr-4 rounded-lg
                        bg-gray-800 border-2 border-gray-700
                        text-white placeholder-gray-400
                        focus:border-blue-500 focus:outline-none
                        transition-all duration-200
                        group-hover:border-gray-600
                    "
                />
                
                {isPasswordField && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors duration-200"
                    >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                )}
            </div>
            
            {errors[field.name] && (
                <p className="text-red-400 text-sm pl-3 animate-slideIn">
                    {errors[field.name].message}
                </p>
            )}
        </div>
    );
};

function Register() {
    const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm<IFormInput>();
    
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        // await new Promise(resolve => setTimeout(resolve, 1000));
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

                <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="
                        w-full h-12 rounded-lg
                        bg-blue-500 text-white font-medium
                        hover:bg-blue-600 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800
                        disabled:opacity-50 disabled:cursor-not-allowed
                        transition-all duration-200
                        relative overflow-hidden
                    "
                >
                    {isSubmitting ? (
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Creating account...</span>
                        </div>
                    ) : (
                        'Create Account'
                    )}
                </button>

                
            </form>
        </div>
    );
}

export default Register;