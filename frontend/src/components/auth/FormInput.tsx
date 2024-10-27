import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

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
                    className="w-full h-12 pl-12 pr-4 rounded-lg bg-gray-800 border-2 border-gray-700 text-white gray-400 focus:border-blue-500 focus:outline-none transition-all duration-200"
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

export default FormInput