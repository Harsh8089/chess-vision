import { useEffect } from "react"

function Button({ isSubmitting, title }: { isSubmitting: boolean, title: string }) {
    useEffect(() => {
        console.log(isSubmitting);
    }, [isSubmitting])
  return (
    <button 
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 relative overflow-hidden"
    >
        {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>
                    {title === 'Login' ? 'Logging In...' : 'Creating account...'}
                </span>
            </div>
        ) : (
            <>
                {title}   
            </>
        )}
    </button>
  )
}

export default Button