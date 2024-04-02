import Units from "./Units";

export default function Nav() {
  return (
    <nav className="bg-gradient-dark w-full">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 sm:px-24">
        <h1 className="w-full text-white text-lg font-semibold leading-none">
          Weather History
        </h1>
        <Units />
      </div>
    </nav>
  );
}
