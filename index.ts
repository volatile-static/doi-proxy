import express, { Request, Response } from 'express';
import got from 'got';

const app = express();
const port = 10000;

app.get('/*', async (req: Request, res: Response) => {
    const doi = req.params[0];
    const url = `https://doi.org/${doi}`;

    console.log(`Fetching ${url}`);
    try {
        // 从原始请求中获取User-Agent
        const userAgent = req.get('User-Agent'),
            headers: { [key: string]: string } = {
                Accept: 'application/vnd.citationstyles.csl+json'
            };
        if (userAgent)
            headers['User-Agent'] = 'mailto:volatile@static.edu; ' + userAgent;

        // 使用Got来转发请求，并设置自定义请求头
        const response = await got(url, { headers });
        console.log(`Got response: ${response.statusCode}`);

        // 将JSON响应发送回客户端
        res.json(JSON.parse(response.body));
    } catch (error) {
        res.status(500).send(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
