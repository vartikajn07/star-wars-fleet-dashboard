"use client";
import { useAtom, useSetAtom } from "jotai";
import {
  selectedStarshipsAtom,
  compareSelectionAtom,
  toggleCompareSelectionAtom,
  clearCompareSelectionAtom,
} from "../../lib/state/atoms";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Star } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";

export default function ComparePage() {
  const router = useRouter();
  const [selectedStarships] = useAtom(selectedStarshipsAtom);
  const [compareSelection] = useAtom(compareSelectionAtom);
  const toggleCompare = useSetAtom(toggleCompareSelectionAtom);
  const clearCompare = useSetAtom(clearCompareSelectionAtom);
  const [isOpen, setIsOpen] = useState(false);

  // console.log(selectedStarships);

  //ratingss
  const getStarsFromRating = (rating: string) => {
    const value = parseFloat(rating);
    const stars = Math.round(5 - value);
    return (
      <div className="flex gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            strokeWidth={1}
            className={
              i < stars ? "stroke-yellow-300 fill-yellow-300" : "stroke-none"
            }
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full h-screen lg:px-16 px-5 py-10 lg:py-20">
      <div className="relative flex flex-col items-center lg:gap-16 gap-8">
        <Button
          onClick={() => router.push("/dashboard")}
          className="absolute left-2 l"
          variant="outline"
        >
          <ArrowLeft />{" "}
          <span className="lg:text-base lg:block hidden">
            Back to Dashboard
          </span>
        </Button>
        <h1 className="lg:text-2xl text-lg font-semibold">Compare Starships</h1>
        {selectedStarships.length === 0 ? (
          <h1 className="text-center">
            No starships selected yet. Go back to dashboard
          </h1>
        ) : (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-16 gap-6">
            {selectedStarships.map((ship) => {
              const isSelected = compareSelection.some(
                (s) => s.url === ship.url
              );
              return (
                <div
                  key={ship.url}
                  className={`border border-[#eaeaea] relative px-4 py-3 flex flex-col rounded-md  cursor-pointer `}
                  onClick={() => toggleCompare(ship)}
                >
                  <Checkbox
                    className="absolute top-3 right-3"
                    checked={isSelected}
                    onCheckedChange={() => toggleCompare(ship)}
                    disabled={!isSelected && compareSelection.length >= 3}
                  />
                  <h1 className="text-lg font-semibold">{ship.name}</h1>
                  <h1 className="text-sm mt-5">{ship.model}</h1>
                  <h1 className="text-xs mt-2">
                    Hyperdrive: {ship.hyperdrive_rating}
                  </h1>
                </div>
              );
            })}
          </div>
        )}
        {/* buttons */}
        <div className="flex gap-5 mb-10 lg:mb-0">
          {compareSelection.length >= 2 && (
            <Button className="cursor-pointer" onClick={() => setIsOpen(true)}>
              Compare ({compareSelection.length})
            </Button>
          )}
          {selectedStarships.length > 0 && (
            <Button
              className={`cursor-pointer ${
                selectedStarships.length === 0 ? "opacity-0" : "opacity-100"
              }`}
              variant="destructive"
              onClick={clearCompare}
            >
              Clear All
            </Button>
          )}
        </div>
        {/* comparison dialog */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="lg:w-[800px] w-[95%] max-w-none h-fit overflow-auto lg:py-6 py-4 lg:px-0 ">
            <DialogHeader>
              <DialogTitle className="lg:mb-6 mb-3 text-center">
                Comparison Overview
              </DialogTitle>
            </DialogHeader>
            <Table>
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Crew</TableHead>
                  <TableHead>Hyperdrive</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {compareSelection.map((ship) => (
                  <TableRow key={ship.url}>
                    <TableCell>{ship.name}</TableCell>
                    <TableCell>{ship.model}</TableCell>
                    <TableCell>{ship.crew}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStarsFromRating(ship.hyperdrive_rating)}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
