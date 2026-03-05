export interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  language: string;
  updated_at: string;
  fork?: boolean;
  isFeatured?: boolean;
}

const GITHUB_USERNAME = "aminenb07";
const FEATURED_REPOS = ["mohimaty", "geed", "acode-copilot", "portfolio"];

export async function getRepositories(): Promise<Repository[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch repositories");
    }

    const repos: Repository[] = await response.json();

    return repos
      .filter((repo) => !repo.fork)
      .map((repo) => ({
        ...repo,
        isFeatured: FEATURED_REPOS.includes(repo.name),
      }))
      .sort((a, b) => {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      });
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return [];
  }
}
