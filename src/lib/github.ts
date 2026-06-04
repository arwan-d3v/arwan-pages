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
    let totalCommits = 0;
    // Lines of code is tricky via REST API, but we can aggregate language bytes as a proxy
    // or fetch from another source if needed. For now, let's use a placeholder for LOC
    // or calculate based on repo sizes as a rough estimate.
    let totalSize = 0;

    for (const repo of repos) {
      totalStars += repo.stargazers_count;
      totalSize += repo.size;

      // In a real scenario, we might need to fetch commits per repo which is expensive.
      // For MVP, we'll keep it simple or use a mock for commits if too many requests.
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
