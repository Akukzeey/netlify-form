exports.handler = async (event) => {
    const siteId = process.env.NETLIFY_SITE_ID;
    const accessToken = process.env.NETLIFY_ACCESS_TOKEN;

    const url = `https://api.netlify.com/api/v1/sites/${siteId}/submissions`;
    const headers = {
        Authorization: `Bearer ${accessToken}`,
    };

    try {
        const response = await fetch(url, { headers });
        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch form submissions' }),
        };
    }
};