import dotenv from 'dotenv';
import type { Request, Response } from 'express';
import express from 'express';
import OpenAI from 'openai';

dotenv.config();

const client = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
// middleware para parsear JSON.
app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
	res.send('Hello, World!');
});

app.get('/api/hello', (req: Request, res: Response) => {
	res.json({ message: 'Hello from the API!' });
});

app.post('/api/chat', async (req: Request, res: Response) => {
	const { prompt } = req.body;
	const response = await client.responses.create({
		model: 'gpt-4o-mini',
		input: prompt,
		temperature: 0.2,
		max_output_tokens: 100,
	});

	return res.json({
		message: response.output_text,
	});
});

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
