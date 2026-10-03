/**
 * Cloudflare Pages Function: 列出 WebPage 資料夾下的行程 JSON 檔案
 * 路由路徑: GET /api/list
 */
export async function onRequestGet(context) {
    const { env } = context;

    try {
        const githubToken = env.GITHUB_TOKEN;
        const githubRepo = env.GITHUB_REPO; // 例如: "DorisLiu/Travel-Plan-Web"

        if (!githubToken || !githubRepo) {
            return new Response(JSON.stringify({ error: 'Cloudflare 尚未設定 GITHUB_TOKEN 或 GITHUB_REPO' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const githubApiUrl = `https://api.github.com/repos/${githubRepo}/contents/WebPage`;

        const res = await fetch(githubApiUrl, {
            headers: {
                'User-Agent': 'Cloudflare-Travel-Admin',
                'Authorization': `Bearer ${githubToken}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (res.status === 404) {
            return new Response(JSON.stringify({ files: [] }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (!res.ok) {
            const errText = await res.text();
            return new Response(JSON.stringify({ error: `GitHub API 錯誤 (${res.status}): ${errText}` }), {
                status: res.status,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const data = await res.json();
        if (!Array.isArray(data)) {
            return new Response(JSON.stringify({ files: [] }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // 過濾出 WebPage 目錄下的 .json 檔案（排除 template 等檔案）
        const files = data
            .filter(item => item.type === 'file' && item.name.toLowerCase().endsWith('.json') && !item.name.toLowerCase().includes('template'))
            .map(item => item.name);

        return new Response(JSON.stringify({ files }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (err) {
        return new Response(JSON.stringify({ error: err.message || '伺服器執行錯誤' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
