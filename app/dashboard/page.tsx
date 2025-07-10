import { BackToTopButton } from "./components/BackToTop";
import { FilterBar } from "./components/FilterBar";
import { StarshipTable } from "./components/StarshipTable";

export default function DashboardPage() {
  return (
    <main className="h-full w-full overflow-hidden py-28 px-16 text-center ">
      <h1 className="text-2xl font-bold mb-16">Star Wars Fleet Dashboard</h1>
      <div className="bg-white rounded-lg shadow-md px-5 py-6 border border-[#eaeaea]">
        <FilterBar />
        <StarshipTable />
      </div>

      <BackToTopButton />
    </main>
  );
}
