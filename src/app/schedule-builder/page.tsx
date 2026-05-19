import type { Metadata } from "next";
import ScheduleBuilder from "./ScheduleBuilder";

export const metadata: Metadata = {
  title: "Free Fantasy Football Schedule Builder — GridironHQ",
  description:
    "Build a custom fantasy football schedule with pinned matchups, back-to-back prevention, and playoff brackets. Free tool from GridironHQ.",
};

export default function ScheduleBuilderPage() {
  return <ScheduleBuilder />;
}
