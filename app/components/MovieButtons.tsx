"use client";
import { Button } from "@/components/ui/button";
import { InfoIcon, PlayCircle } from "lucide-react";
import { useState } from "react";
import PlayVideoModal from "./PlayVideoModal";

interface iAppProps {
  title: string;
  id: number;
  youtubeUrl: string;
  releaseDate: number;
  age: number;
  duration: number;
  overview: string;
}

export default function MovieButtons({
  title,
  id,
  youtubeUrl,
  overview,
  releaseDate,
  age,
  duration,
}: iAppProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)} className="text-lg font-medium">
        <PlayCircle className="mr-2 w-6 h-6" /> Play
      </Button>
      <Button
        onClick={() => setOpen(true)}
        className="text-lg font-medium bg-white/40 hover:bg-white/30 text-white"
      >
        <InfoIcon className="mr-2 w-6 h-6" /> Learn More
      </Button>
      <PlayVideoModal
        key={id}
        title={title}
        overview={overview}
        youtubeUrl={youtubeUrl}
        state={open}
        changeState={setOpen}
        release={releaseDate}
        age={age}
        duration={duration}
      />
    </>
  );
}
