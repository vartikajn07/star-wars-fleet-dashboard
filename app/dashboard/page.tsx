import { BackToTopButton } from "./components/BackToTop";
import { FilterBar } from "./components/FilterBar";
import { StarshipTable } from "./components/StarshipTable";

export default function DashboardPage() {
  return (
    <main className="bg-gradient-to-br from-[#0f0f0f] via-[#1a1a2e] to-[#2c2c54] h-full w-full overflow-hidden lg:py-28 py-16 lg:px-16 px-3 text-center ">
      <h1 className="lg:text-3xl text-lg font-bold lg:mb-16 mb-8 text-white">
        Star Wars Fleet Dashboard
      </h1>
      <div className="bg-white rounded-lg shadow-md lg:px-5 px-2 lg:py-6 py-3 min-h-[80vh]">
        <FilterBar />
        <StarshipTable />
      </div>
      <BackToTopButton />
    </main>
  );
}
