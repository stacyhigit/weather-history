import Search from "./components/header/Search";
import Weather from "./components/weather/Weather";

export default function Home() {
	return (
		<section className="app w-full flex flex-col grow">
			<Search />
			<Weather />
		</section>
	);
}
