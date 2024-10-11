
function FullScreenLoader() {
  return (
    <div className="absolute right-1/2 top-1/2 transform -translate-y-1/2 width-vw height-vh">
      <div className="loader border-t-2 border-gray-300 rounded-full w-12 h-12 animate-spin"></div>
    </div>
  );
}

export default FullScreenLoader;
