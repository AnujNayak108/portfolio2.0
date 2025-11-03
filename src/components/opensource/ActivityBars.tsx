import React from "react";
import { DayActivity } from "@/hooks/useGithubPublic";

interface Props {
  data: DayActivity[];
  max: number;
  isLoading?: boolean;
}

const ActivityBars: React.FC<Props> = ({ data, max, isLoading }) => {
  const skeleton = Array.from({ length: 30 });
  const total = Math.max(30, data?.length || 0);

  return (
    <div className="equalizer-container relative max-w-6xl mx-auto mb-10 h-[180px] rounded-2xl overflow-hidden glass-card">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background pointer-events-none" />
      <div className="relative z-10 h-full w-full px-3 flex items-end gap-1.5">
        {Array.from({ length: total }).map((_, i) => {
          const bar = isLoading ? undefined : data[i];
          const height = isLoading || !bar || !max ? Math.random() * 40 + 10 : Math.max(6, Math.round((bar.count / max) * 140));
          const title = isLoading || !bar ? "Loading" : `${bar.date}: ${bar.count} activity`;
          return (
            <div key={i} title={title} className="group flex-1 min-w-[6px] h-full flex items-end">
              <div
                className="w-full rounded-md transition-all duration-300 hover:scale-105 ring-1 ring-border/50"
                style={{
                  height: `${height}px`,
                  background:
                    "linear-gradient(to top, hsl(var(--primary) / 0.85), hsl(var(--accent) / 0.85))",
                  boxShadow:
                    "0 10px 25px -10px hsl(var(--primary) / 0.35), 0 0 30px -10px hsl(var(--accent) / 0.35)",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Hint */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-background/80 backdrop-blur-sm rounded-full border border-border text-xs text-muted-foreground">
        Last 30 days • Hover bars
      </div>
    </div>
  );
};

export default ActivityBars;
