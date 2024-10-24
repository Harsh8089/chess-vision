function Row({ style }: { style: string }) {
  return (
    <div className={`${style}`}>
        {
            Array.from({ length: 8 }, (_, index) => (
                <div key={index} className="flex items-center justify-center">
                    {8 - index}
                </div>
            ))
        }
    </div>
  )
}

export default Row