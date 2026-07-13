import { useState, useEffect } from 'react';

interface GithubStats {
  repos: number;
  followers: number;
}

export function useGithubStats(username: string) {
  const [stats, setStats] = useState<GithubStats>({ repos: 0, followers: 0 });

  useEffect(() => {
    let cancelled = false;
    fetch(`https://api.github.com/users/${username}`)
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) {
          setStats({ repos: data.public_repos ?? 0, followers: data.followers ?? 0 });
        }
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [username]);

  return stats;
}
