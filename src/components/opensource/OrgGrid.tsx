import React from "react";
import { OrgDetail } from "@/hooks/useGithubPublic";
import { Users } from "lucide-react";

interface Props {
  orgs: OrgDetail[];
}

// 🎯 MANUAL ORGANIZATIONS: Add your organizations here if GitHub API doesn't fetch them
const MANUAL_ORGS: OrgDetail[] = [
  // Example format - uncomment and edit:
  {
  login: "OpenClimateFix",
  avatar_url: "https://avatars.githubusercontent.com/u/48357542?s=200&v=4",
  Skill : "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  },
  {
  login: "MixxxDJ",
  avatar_url: "https://avatars.githubusercontent.com/u/1743769?s=200&v=4",
  Skill : "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
  },
  {
  login: "FreeCodeCamp",
  avatar_url: "https://avatars.githubusercontent.com/u/9892522?s=200&v=4",
  Skill : "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  },
];

const OrgGrid: React.FC<Props> = ({ orgs }) => {
  // Merge fetched orgs with manual orgs (manual takes priority)
  const displayOrgs = MANUAL_ORGS.length > 0 ? MANUAL_ORGS : orgs;
  
  if (!displayOrgs?.length) {
    return (
      <section aria-label="Organizations" className="mt-10">
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-2">
          Contributing to <span className="gradient-text">Organizations</span>
        </h3>
        <p className="text-center text-muted-foreground text-sm">No public organizations found</p>
      </section>
    );
  }
  return (
    <section aria-label="Organizations contributed to" className="mt-10">
      <h3 className="text-2xl md:text-3xl font-bold text-center mb-2">
        Contributing to <span className="gradient-text">Organizations</span>
      </h3>
      <p className="text-center text-muted-foreground mb-6">A snapshot of public orgs I contribute to</p>
      <div className="orgs-grid grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {displayOrgs.map((org) => (
          <a
            key={org.login}
            href={`https://github.com/${org.login}`}
            target="_blank"
            rel="noopener noreferrer"
            className="org-card glass-card p-4 rounded-xl text-center hover-scale"
            aria-label={`Open ${org.login} on GitHub`}
          >
            <div className="flex justify-center mb-3">
              <img
                src={org.avatar_url}
                alt={`${org.login} avatar`}
                className="h-20 w-20 rounded-sm p-2 border border-border"
                loading="lazy"
              />
              
            </div>
            <div className="text-sm font-semibold truncate">{org.login}</div>
            {org.public_repos != null && (
              <div className="text-xs text-muted-foreground mt-1">{org.public_repos} repos</div>
            )}
            <div className="flex justify-center mt-2">
              <Users className="w-4 h-4 text-muted-foreground" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default OrgGrid;
