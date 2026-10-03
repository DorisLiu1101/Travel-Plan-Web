/**
 * Cloudflare Pages Function: 安全儲存 JSON 行程資料回 GitHub
 * 路由路徑: POST /api/save
 */
export async function onRequestPost(context) {
    const { request, env } = context;

    try {
        const body = await request.json();
        const { filename, content, password, createHtml } = body;

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

        // 3. 檔名正規化：允許根目錄 catalog.json 或 WebPage/*.json，防止路徑穿越
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
        const filePath = cleanName.toLowerCase() === 'catalog.json' ? 'catalog.json' : `WebPage/${cleanName}`;


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

        // 7. 若勾選「同時建立同名 HTML 展示頁」且非 catalog.json
        let htmlMessage = '';
        if (createHtml && cleanName.toLowerCase() !== 'catalog.json') {
            const baseName = cleanName.replace(/\.json$/i, '');
            const htmlPath = `WebPage/${baseName}.html`;
            const htmlApiBase = `https://api.github.com/repos/${githubRepo}/contents/${htmlPath}`;

            // 先檢查目標 HTML 是否已經存在
            const checkHtmlRes = await fetch(htmlApiBase, {
                headers: {
                    'User-Agent': 'Cloudflare-Travel-Admin',
                    'Authorization': `Bearer ${githubToken}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });

            if (checkHtmlRes.ok) {
                htmlMessage = `（展示頁 ${baseName}.html 已存在，保留既有檔案不覆蓋）`;
            } else if (checkHtmlRes.status === 404) {
                // 從 GitHub 抓取 WebPage/Template.html 作為公版樣板
                const templateApi = `https://api.github.com/repos/${githubRepo}/contents/WebPage/Template.html`;
                const templateRes = await fetch(templateApi, {
                    headers: {
                        'User-Agent': 'Cloudflare-Travel-Admin',
                        'Authorization': `Bearer ${githubToken}`,
                        'Accept': 'application/vnd.github.v3+json'
                    }
                });

                if (templateRes.ok) {
                    const templateData = await templateRes.json();
                    if (templateData.content) {
                        const cleanBase64 = templateData.content.replace(/\s+/g, '');
                        const putHtmlRes = await fetch(htmlApiBase, {
                            method: 'PUT',
                            headers: {
                                'User-Agent': 'Cloudflare-Travel-Admin',
                                'Authorization': `Bearer ${githubToken}`,
                                'Accept': 'application/vnd.github.v3+json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                message: `feat(itinerary): create ${baseName}.html from template`,
                                content: cleanBase64
                            })
                        });

                        if (putHtmlRes.ok) {
                            htmlMessage = `，並已自動建立 ${baseName}.html 展示頁！`;
                        } else {
                            htmlMessage = `（提示：JSON 已儲存，但自動建立 ${baseName}.html 時遭遇錯誤）`;
                        }
                    }
                } else {
                    htmlMessage = `（提示：未在 GitHub 上找到 WebPage/Template.html 樣板檔）`;
                }
            }
        }

        return new Response(JSON.stringify({ 
            success: true, 
            message: `成功同步 ${cleanName} 至 GitHub${htmlMessage}` 
        }), {
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
