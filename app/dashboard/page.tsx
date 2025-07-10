import { BackToTopButton } from "./components/BackToTop";
import { StarshipTable } from "./components/StarshipTable";

export default function DashboardPage() {
  return (
    <main className="h-full w-full overflow-hidden py-10 px-16 text-center ">
      <h1 className="text-2xl font-bold mb-20">Star Wars Fleet Dashboard</h1>
      <StarshipTable />
      <BackToTopButton />
    </main>
  );
}
