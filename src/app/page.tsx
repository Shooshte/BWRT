import Chart from "./components/chart";

export default function Home() {
  console.log(`key: ${process.env.COINGECKO_API_KEY}`);

  return (
    <main>
      <Chart />
    </main>
  );
}
