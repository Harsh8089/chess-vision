import React from 'react'

function Column({ style }: { style: string[] }) {
  return (
    <div className={`${style[0]}`}>
        <div className={`${style[1]}`}></div>
        <div className={`${style[2]}`}>
            {
                Array.from({ length: 8 }, (_, index) => (
                    <div key={index} className="flex items-center justify-center">
                        {String.fromCharCode(97 + index)}
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Column