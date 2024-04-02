export default function Loading() {
  return (
    <div className="w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50">
      <div className="flex flex-col justify-center items-center mt-[40vh]">
        <div className="mb-6 font-semibold">Getting Forecasts...</div>
        <div className="border-t-transparent border-solid animate-spin rounded-full border-primary-600 border-8 h-32 w-32"></div>
      </div>
    </div>
  );
}
