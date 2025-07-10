"use client";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="bg-gradient-to-br from-[#0d0d0d] via-[#1a1a1a] to-[#262626] w-full h-screen overflow-hidden flex flex-col gap-5 items-center justify-start py-28">
      <h1 className="text-white text-5xl">Explore the Galaxy of Starships</h1>
      <h1 className="text-white">
        Compare, analyze, and explore the most iconic starships from the Stars
        Wars universe.
      </h1>
      <RainbowButton onClick={() => router.push("/dashboard")} className="mt-5">
        <h1 className="text-lg ">Discover Dashboard</h1>
      </RainbowButton>
    </div>
  );
}
