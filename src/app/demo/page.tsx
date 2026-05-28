import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "GridironHQ Demo" },
  description:
    "Try the fully interactive GridironHQ demo — ARGUS, championship EV framework, League Intel behavioral profiles, and mock draft simulator. No account required.",
  robots: { index: false, follow: true },
};

export default function DemoPage() {
  return (
    <iframe
      src="/demo.html"
      title="GridironHQ Demo"
      className="fixed inset-0 w-screen h-screen border-0 z-50 bg-navy"
    />
  );
}
