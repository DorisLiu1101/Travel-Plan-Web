/**
 * Cloudflare Pages Function: 安全儲存 JSON 行程資料回 GitHub
 * 路由路徑: POST /api/save
 */
export async function onRequestPost(context) {
    const { request, env } = context;

    try {
        const body = await request.json();
        const { filename, content, password } = body;

        // 1. 驗證管理密碼 (防護第一道防線)
        const adminSecret = env.ADMIN_SECRET;
        if (!adminSecret || password !== adminSecret) {
            return new Response(JSON.stringify({ error: '密碼錯誤或伺服器尚未設置 ADMIN_SECRET' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // 2. 驗證 Cloudflare 環境變數
        const githubToken = env.GITHUB_TOKEN;
        const githubRepo = env.GITHUB_REPO; // 例如: "DorisLiu/Travel-Plan-Web"
        if (!githubToken || !githubRepo) {
            return new Response(JSON.stringify({ error: 'Cloudflare 尚未設定 GITHUB_TOKEN 或 GITHUB_REPO' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (!filename || !content) {
            return new Response(JSON.stringify({ error: '缺少檔名或行程內容' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // 3. 檔名正規化：限制僅能寫入 WebPage/*.json，防止路徑穿越
        let cleanName = String(filename).trim().replace(/^WebPage\//, '').replace(/^(\.\.[\/\\])+/, '');
        if (!cleanName.endsWith('.json')) {
            cleanName += '.json';
        }
        // 僅允許英數字、底線、破折號與小數點
        if (!/^[a-zA-Z0-9_\-\.]+\.json$/.test(cleanName)) {
            return new Response(JSON.stringify({ error: '檔名格式不符規定' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        const filePath = `WebPage/${cleanName}`;

        // 4. 查詢現有檔案取得 SHA (若已存在，GitHub PUT 需要提供 sha)
        const githubApiBase = `https://api.github.com/repos/${githubRepo}/contents/${filePath}`;
        let fileSha = undefined;

        const getRes = await fetch(githubApiBase, {
            headers: {
                'User-Agent': 'Cloudflare-Travel-Admin',
                'Authorization': `Bearer ${githubToken}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (getRes.ok) {
            const fileData = await getRes.json();
            fileSha = fileData.sha;
        }

        // 5. UTF-8 內容轉 Base64 (支援中文內容)
        const jsonString = JSON.stringify(content, null, 2);
        const utf8Bytes = new TextEncoder().encode(jsonString);
        let binary = '';
        for (let i = 0; i < utf8Bytes.length; i++) {
            binary += String.fromCharCode(utf8Bytes[i]);
        }
        const base64Content = btoa(binary);

        // 6. 提交更新至 GitHub (Commit)
        const putPayload = {
            message: `chore(itinerary): update ${cleanName} via admin panel`,
            content: base64Content
        };
        if (fileSha) {
            putPayload.sha = fileSha;
        }

        const putRes = await fetch(githubApiBase, {
            method: 'PUT',
            headers: {
                'User-Agent': 'Cloudflare-Travel-Admin',
                'Authorization': `Bearer ${githubToken}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(putPayload)
        });

        if (!putRes.ok) {
            const errText = await putRes.text();
            return new Response(JSON.stringify({ error: `GitHub API 錯誤 (${putRes.status}): ${errText}` }), {
                status: putRes.status,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify({ success: true, message: `成功同步 ${cleanName} 至 GitHub` }), {
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
