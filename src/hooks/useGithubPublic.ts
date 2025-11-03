import { useEffect, useMemo, useState } from "react";

export interface GhUser {
  login: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  name?: string;
  bio?: string;
}

export interface GhOrg {
  login: string;
  avatar_url: string;
  description?: string | null;
}

export interface OrgDetail extends GhOrg {
  public_repos?: number;
}

export interface DayActivity {
  date: string; // YYYY-MM-DD
  count: number; // approximate activity count
}

const GH_HEADERS: HeadersInit = {
  Accept: "application/vnd.github+json",
};

function daysAgoDate(n: number): string {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

export function useGithubPublic(initialUsername = "AnujNayak108") {
  const [username, setUsernameState] = useState(() => {
    return localStorage.getItem("gh_username") || initialUsername;
  });
  const [user, setUser] = useState<GhUser | null>(null);
  const [orgs, setOrgs] = useState<OrgDetail[]>([]);
  const [dailyActivity, setDailyActivity] = useState<DayActivity[]>([]);
  const [prCount, setPrCount] = useState<number | null>(null);
  const [issueCount, setIssueCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const setUsername = (u: string) => {
    const clean = u.trim();
    setUsernameState(clean);
    localStorage.setItem("gh_username", clean);
  };

  useEffect(() => {
    let cancelled = false;
    const fetchAll = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch user, orgs, events, and search counts concurrently
        const userUrl = `https://api.github.com/users/${username}`;
        const orgsUrl = `https://api.github.com/users/${username}/orgs`;
        const eventsUrl = `https://api.github.com/users/${username}/events/public?per_page=100`;
        const prsUrl = `https://api.github.com/search/issues?q=author:${encodeURIComponent(
          username
        )}+is:pr+is:public&per_page=1`;
        const issuesUrl = `https://api.github.com/search/issues?q=author:${encodeURIComponent(
          username
        )}+is:issue+-is:pr+is:public&per_page=1`;

        const [userRes, orgsRes, eventsRes, prsRes, issuesRes] = await Promise.all([
          fetch(userUrl, { headers: GH_HEADERS }),
          fetch(orgsUrl, { headers: GH_HEADERS }),
          fetch(eventsUrl, { headers: GH_HEADERS }),
          fetch(prsUrl, { headers: GH_HEADERS }),
          fetch(issuesUrl, { headers: GH_HEADERS }),
        ]);

        if (!userRes.ok) throw new Error(`User not found or rate-limited (${userRes.status})`);

        const userJson: GhUser = await userRes.json();
        const orgsJson = orgsRes.ok ? ((await orgsRes.json()) as GhOrg[] | any) : [];
        const eventsJson = eventsRes.ok ? ((await eventsRes.json()) as any[]) : [];
        const prsJson = prsRes.ok ? ((await prsRes.json()) as { total_count: number }) : { total_count: 0 };
        const issuesJson = issuesRes.ok ? ((await issuesRes.json()) as { total_count: number }) : { total_count: 0 };

        if (cancelled) return;
        setUser(userJson);
        setPrCount(prsJson.total_count ?? 0);
        setIssueCount(issuesJson.total_count ?? 0);

        // Prepare activity for last 30 days
        const last30 = Array.from({ length: 30 }, (_, i) => daysAgoDate(29 - i));
        const counts = new Map<string, number>(last30.map((d) => [d, 0]));

        // Count events; for PushEvent use payload.size (number of commits)
        for (const ev of Array.isArray(eventsJson) ? eventsJson : []) {
          const day = new Date(ev.created_at);
          day.setHours(0, 0, 0, 0);
          const key = day.toISOString().slice(0, 10);
          if (!counts.has(key)) continue;
          const inc = ev.type === "PushEvent" && ev.payload && typeof ev.payload.size === "number" ? ev.payload.size : 1;
          counts.set(key, (counts.get(key) || 0) + inc);
        }
        setDailyActivity(last30.map((d) => ({ date: d, count: counts.get(d) || 0 })));

        // Organizations + details (limit to 6)
        const baseOrgs: GhOrg[] = Array.isArray(orgsJson) ? (orgsJson as GhOrg[]) : [];
        const top6 = baseOrgs.slice(0, 6);
        if (top6.length) {
          const detailPromises = top6.map(async (o) => {
            try {
              const res = await fetch(`https://api.github.com/orgs/${o.login}`, { headers: GH_HEADERS });
              if (!res.ok) return { ...o } as OrgDetail;
              const d = await res.json();
              return { ...o, public_repos: d.public_repos, description: d.description } as OrgDetail;
            } catch {
              return { ...o } as OrgDetail;
            }
          });
          const detailed = await Promise.all(detailPromises);
          if (!cancelled) setOrgs(detailed);
        } else {
          setOrgs([]);
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Failed to load GitHub data");
        setUser(null);
        setOrgs([]);
        setDailyActivity([]);
        setPrCount(0);
        setIssueCount(0);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchAll();
    return () => {
      cancelled = true;
    };
  }, [username]);

  const maxActivity = useMemo(() => Math.max(1, ...dailyActivity.map((d) => d.count)), [dailyActivity]);

  return {
    username,
    setUsername,
    isLoading,
    error,
    user,
    orgs,
    dailyActivity,
    maxActivity,
    prCount,
    issueCount,
  } as const;
}
