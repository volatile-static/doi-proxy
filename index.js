var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import got from 'got';
const app = express();
const port = 10000;
app.get('/*', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doi = req.params[0];
    const url = `https://doi.org/${doi}`;
    console.log(`Fetching ${url}`);
    try {
        // 从原始请求中获取User-Agent
        const userAgent = req.get('User-Agent'), headers = {
            Accept: 'application/vnd.citationstyles.csl+json'
        };
        if (userAgent)
            headers['User-Agent'] = 'mailto:volatile@static.edu; ' + userAgent;
        // 使用Got来转发请求，并设置自定义请求头
        const response = yield got(url, { headers });
        console.log(`Got response: ${response.statusCode}`);
        // 将JSON响应发送回客户端
        res.json(JSON.parse(response.body));
    }
    catch (error) {
        res.status(500).send(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
