class GitHubAPI{

    public baseURL: string = 'https://api.github.com'
    private repositoryUrl: string
    private endpoint: string
    private token: string
    constructor(repositoryUrl: string, token: string){
        this.repositoryUrl = repositoryUrl
        this.endpoint = this.baseURL + this.convertUrlToApiEndpoint(repositoryUrl, '')
        this.token = token
    }

    public convertUrlToApiEndpoint(url: string, path: string): string {
        const match = url.match(/https:\/\/github\.com\/([^\/]+)\/([^\/]+)\.git/);
        if (!match) {
            throw new Error('Invalid GitHub URL');
        }
        const owner = match[1];
        const repo = match[2];
        return `/repos/${owner}/${repo}/contents/${path}`;
    }

    public async createRepository(name: string, description: string, isPrivate: boolean, token: string){
        const response = await fetch(this.baseURL + 'user/repos', {
            method: 'POST',
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            },
            body: JSON.stringify({
                private: isPrivate,
                name: name,
                description: description
            })
        })
        return response.json()
    }

    public async deleteRepository(owner: string, repo: string, token: string) {
        const response = await fetch(this.baseURL+`repos/${owner}/${repo}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        })
        if (response.status === 204) {
            return { message: 'Repository deleted successfully' }
        } else {
            const error = await response.json()
            throw new Error(`Failed to delete repository: ${error.message}`)
        }
    }

    public async pushFile(path: string, content: string, message: string) {
        // Get the SHA of the file if it exists
        const getFileResponse = await fetch(`${this.endpoint} ${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `token ${this.token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        let sha = '';
        if (getFileResponse.status === 200) {
            const fileData = await getFileResponse.json();
            sha = fileData.sha;
        }

        // Create or update the file
        const response = await fetch(`${this.endpoint} ${path}`, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${this.token}`,
                'Accept': 'application/vnd.github.v3+json'
            },
            body: JSON.stringify({
                message: message,
                content: btoa(content), // Base64 encode the content
                sha: sha
            })
        });

        if (response.status === 201 || response.status === 200) {
            return { message: 'File pushed successfully' };
        } else {
            const error = await response.json();
            throw new Error(`Failed to push file: ${error.message}`);
        }
    }
}
export { GitHubAPI}
