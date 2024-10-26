import { Github, Heart, Mail, Twitter } from "lucide-react";

function Footer() {
  return (
    <div className='min-w-[80vw] mx-auto py-6 flex justify-between items-center'>
        <div className="flex space-x-6">
            <a 
                href="" 
                className="text-gray-600 hover:text-gray-400 transition-colors duration-200"
            >
                <Github className="w-6 h-6" />
            </a>
            <a 
                href="" 
                className="text-gray-600 hover:text-gray-400 transition-colors duration-200"
            >
                <Twitter className="w-6 h-6" />
            </a>
            <a 
                href=''
                className="text-gray-600 hover:text-gray-400 transition-colors duration-200"
            >
                <Mail className='w-6 h-6' />
            </a>
        </div>
        <div className="flex items-center group">
            <p className="text-gray-600 font-medium mr-2">
              Thank You for checkout. Really Appreciated
            </p>
            <Heart className="w-4 h-4 text-red-500 group-hover:animate-pulse" />
        </div>
    </div>
  );
}

export default Footer;