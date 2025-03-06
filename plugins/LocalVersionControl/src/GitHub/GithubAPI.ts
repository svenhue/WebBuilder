class GitHubAPI{

    public baseURL: string = 'https://api.github.com/'

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
}

const t = new GitHubAPI()

t.createRepository('testlele', 'test', true, '')

export { GitHubAPI}
