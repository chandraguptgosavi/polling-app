const Buttton = ({ onClick, text }: { onClick: () => void; text: string }) => (
  <div className="mb-8 text-center">
    <button
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-200"
    >
      {text}
    </button>
  </div>
);

export default Buttton;
