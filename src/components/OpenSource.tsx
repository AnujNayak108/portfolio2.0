import { useEffect, useState } from "react";
import { Github, GitPullRequest, Code, Users } from "lucide-react";
import ActivityBars from "./opensource/ActivityBars";
import OrgGrid from "./opensource/OrgGrid";
import { useGithubPublic } from "@/hooks/useGithubPublic";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const OpenSource = () => {
  const [tempUsername, setTempUsername] = useState("");
  const { username, setUsername, isLoading, error, user, orgs, dailyActivity, maxActivity, prCount, issueCount } =
    useGithubPublic("AnujNayak108");

  // Prefill input once username loads
  useEffect(() => {
    setTempUsername(username);
  }, [username]);

  const onApply = () => {
    if (tempUsername && tempUsername !== username) setUsername(tempUsername);
  };

  return (
    <section id="opensource" className="min-h-screen flex items-center justify-center py-16 px-6 relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <header className="text-center mb-6">
          <h2 className="opensource-title text-4xl md:text-6xl font-bold mb-2">Open Source <span className="gradient-text">Contributions</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Fast, reliable public GitHub activity pulled via REST API.</p>
        </header>

        {error && (
          <div className="max-w-xl mx-auto mb-6 p-3 rounded-md border border-destructive/40 bg-destructive/10 text-sm">
            Failed to load: {error}
          </div>
        )}

        {/* Activity Bars (last 30 days) */}
        <ActivityBars data={dailyActivity} max={maxActivity} isLoading={isLoading} />

        {/* Stats Grid */}
        <div className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {[{
            Icon: GitPullRequest,
            label: "Pull Requests",
            value: prCount ?? 0,
            color: "text-primary",
          },
          {
            Icon: Code,
            label: "Issues Opened",
            value: issueCount ?? 0,
            color: "text-accent",
          },
          {
            Icon: Github,
            label: "Public Repos",
            value: user?.public_repos ?? 0,
            color: "text-primary",
          },
          {
            Icon: Users,
            label: "Followers",
            value: user?.followers ?? 0,
            color: "text-accent",
          }].map(({ Icon, label, value, color }, idx) => (
            <div key={idx} className="stats-card glass-card p-5 rounded-xl text-center animate-fade-in">
              <div className="flex justify-center mb-2">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Icon className={`w-6 h-6 ${color}`} />
                </div>
              </div>
              <div className="text-2xl font-bold gradient-text mb-1">
                {isLoading ? <Skeleton className="h-7 w-16 mx-auto" /> : value.toLocaleString?.() ?? value}
              </div>
              <div className="text-xs text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>

        {/* Organizations */}
        <div>
          {isLoading ? (
            <div className="max-w-4xl mx-auto grid grid-cols-3 md:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, idx) => (
                <Skeleton key={idx} className="h-16 w-16 rounded-lg" />
              ))}
            </div>
          ) : (
            <OrgGrid orgs={orgs} />
          )}
          
        </div>

        {/* Activity Summary */}
        <div className="mt-10 text-center space-y-1">
          <p className="text-muted-foreground text-sm">
            Activity is derived from public events (Push, PR, Issues) in the last 30 days.
          </p>
          {user?.html_url && (
            <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="story-link text-sm">
              View profile on GitHub
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default OpenSource;
