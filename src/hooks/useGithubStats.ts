import { useState, useEffect } from 'react';

interface GithubStats {
  repos: number;
  followers: number;
  stars: number;
}

export function useGithubStats(username: string) {
  const [stats, setStats] = useState<GithubStats>({ repos: 0, followers: 0, stars: 0 });

  useEffect(() => {
    let cancelled = false;

    async function fetchStats() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100`),
        ]);
        const userData = await userRes.json();
        const reposData = await reposRes.json();

        if (!cancelled && Array.isArray(reposData)) {
          const totalStars = reposData.reduce((sum: number, r: { stargazer_count?: number }) => sum + (r.stargazer_count ?? 0), 0);
          setStats({
            repos: userData.public_repos ?? 0,
            followers: userData.followers ?? 0,
            stars: totalStars,
          });
        }
      } catch {
        /* silent */
      }
    }

    fetchStats();
    return () => { cancelled = true; };
  }, [username]);

  return stats;
}
