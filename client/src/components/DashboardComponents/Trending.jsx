const Trending = () => {
  const trendings = [
    "English - Tamil",
    "English - Telugu",
    "English - Hindi",
    "English - Punjabi",
    "English - Gujarati",
    "English - Marati",
  ];
  return (
    <>
      <div className="flex items-center my-[20px] lg:justify-center">
        <h3 className="font-bold mr-[10px]">Trending:</h3>
        <div className="flex items-center overflow-x-auto">
          {trendings.map((trending, index) => (
            <p key={index} className="hover:bg-secondary hover:text-white border border-gray rounded-full py-2 px-4 text-sm cursor-pointer mr-2 whitespace-nowrap">
              {trending}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default Trending;
