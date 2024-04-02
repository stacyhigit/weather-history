export default function Footer() {
  return (
    <footer className="px-3 sm:px-10 pb-3 sm:pb-6 pt-1">
      <div className="text-center text-sm sm:flex sm:justify-center">
        <p className="sm:mx-2">
          © 2024 Copyright:{" "}
          <a target="_blank" href="https://eatthetoad.com/">
            Eat the Toad
          </a>
        </p>
        <p className="sm:mx-2">
          Weather data by{" "}
          <a target="_blank" href="https://open-meteo.com/">
            {" "}
            Open-Meteo.com
          </a>
        </p>
      </div>
    </footer>
  );
}
