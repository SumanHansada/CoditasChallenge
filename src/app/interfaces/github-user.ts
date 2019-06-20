import { GitHubRepo } from './github-repositories';

export interface GitHubUser {
    id: string;
    login: string;
    avatar_url: string;
    html_url: string;
    repos_url: string;
    score: string;
    fullName: string;
    repositories: GitHubRepo[];
}
