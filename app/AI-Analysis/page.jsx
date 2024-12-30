const AIAnalysis = () => {
    return (
      <div className="grid grid-cols-4 grid-rows-10 gap-0">
        {Array.from({ length: 40 }).map((_, index) => (
          <div
            key={index}
            className={`border-r border-b border-[#9e9e9e] ${index % 4 === 3 ? 'border-r-0' : ''} ${index >= 36 ? 'border-b-0' : ''} aspect-square`}
          />
        ))}
      </div>
    );
  };
  
  export default AIAnalysis;
  