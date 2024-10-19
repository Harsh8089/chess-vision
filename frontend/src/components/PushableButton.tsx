import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircleXmark, faCircleCheck} from '@fortawesome/free-solid-svg-icons'

function PushableButton({style, cellColor, cellContent, onClick}: {key: Number, cellColor: string, style: string, cellContent: string, onClick: () => void}) {
  return (
    <button 
        onClick={onClick}
        className="pilcrow relative text-white border-none bg-transparent p-0 cursor-pointer outline-offset-4 transition-[filter] duration-[250ms] hover:brightness-110 focus:outline-none"
    >
      
       {
            cellContent === '' ? (
                <>
                    <span className="absolute inset-0 w-full h-full translate-y-[2px] transition-transform duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] hover:translate-y-[4px] active:translate-y-[1px]" />
                    <span
                      className={`${style} ${cellColor} flex justify-center items-center rounded-md relative  translate-y-[-4px] transition-transform duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] hover:translate-y-[-6px] active:translate-y-[-2px]`}
                    >

                        {
                            cellColor === 'bg-red-300' ? 
                            (
                              <FontAwesomeIcon icon={faCircleXmark} className='text-red-700 text-3xl' />
                            )
                            :
                            cellColor === 'bg-green-300' ?
                            (
                                <FontAwesomeIcon icon={faCircleCheck} className='text-green-700 text-3xl'/>
                            )
                            :
                            (
                                <></>
                            )
                        }
                      
                    </span>
                </>
            ):
            (
                <>{cellContent}</>
            )
       }
       
    </button>
  );
}

export default PushableButton;
