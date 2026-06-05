const GITHUB_API_URL = "https://api.github.com";

export async function getGitHubStats(username: string) {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };

  if (process.env.GITHUB_PAT) {
    headers["Authorization"] = `token ${process.env.GITHUB_PAT}`;
  }

  try {
    const reposResponse = await fetch(`${GITHUB_API_URL}/users/${username}/repos?per_page=100`, {
      headers,
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!reposResponse.ok) {
      throw new Error("Failed to fetch repositories");
    }

    const repos = await reposResponse.json();

    let totalStars = 0;
    let totalSize = 0;

    for (const repo of repos) {
      totalStars += repo.stargazers_count;
      totalSize += repo.size;
    }

    return {
      reposCount: repos.length,
      stars: totalStars,
      linesOfCode: totalSize * 50, // Very rough multiplier to simulate LOC from KB
      uptime: "99.8%", // Static placeholder as requested
    };
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    return {
      reposCount: 0,
      stars: 0,
      linesOfCode: 0,
      uptime: "99.8%",
    };
  }
}

export async function getRepoStats(repoUrl: string) {
  const parts = repoUrl.replace("https://github.com/", "").split("/");
  if (parts.length < 2) return null;
  const [owner, repo] = parts;

  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };

  if (process.env.GITHUB_PAT) {
    headers["Authorization"] = `token ${process.env.GITHUB_PAT}`;
  }

  try {
    const response = await fetch(`${GITHUB_API_URL}/repos/${owner}/${repo}`, {
      headers,
      next: { revalidate: 3600 },
    });

    if (!response.ok) return null;

    const data = await response.json();
    return {
      stars: data.stargazers_count,
      forks: data.forks_count,
      issues: data.open_issues_count,
    };
  } catch (error) {
    console.error(`Error fetching stats for ${repoUrl}:`, error);
    return null;
  }
}

export async function getRecentActivity(username: string) {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };

  if (process.env.GITHUB_PAT) {
    headers["Authorization"] = `token ${process.env.GITHUB_PAT}`;
  }

  try {
    const response = await fetch(`${GITHUB_API_URL}/users/${username}/events/public?per_page=10`, {
      headers,
      next: { revalidate: 1800 }, // 30 minutes
    });

    if (!response.ok) return [];

    return await response.json();
  } catch (error) {
    console.error("Error fetching GitHub activity:", error);
    return [];
  }
}
