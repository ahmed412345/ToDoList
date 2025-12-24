import dotenv from "dotenv";
import Cerebras from "@cerebras/cerebras_cloud_sdk";

dotenv.config();

const cerebras = new Cerebras({
    apiKey: process.env.AI_API_KEY,
});

async function main(message) {
    let responseText = "";

    try {
        const stream = await cerebras.chat.completions.create({
            model: "qwen-3-235b-a22b-instruct-2507",
            stream: true,
            max_completion_tokens: 2000,
            temperature: 0.7,
            top_p: 0.8,
            messages: [
                {
                    role: "system",
                    content:
                        "You are an AI model on a user service website. The site is based on saving notes. Help the user in a specialized and clear way.",
                },
                {
                    role: "user",
                    content: message,
                },
            ],
        });

        for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || "";
            responseText += content;
        }

        return {
            msg: responseText.trim() || "please add a valid msg",
        };
    } catch (err) {
        console.error("AI Error:", err);
        return {
            msg: "AI service error",
        };
    }
}

const chatHandler = async (req, res) => {
    try {
        const { msg } = req.body;

        if (!msg) {
            return res.status(400).json({
                msg: "please add a valid msg",
            });
        }
        const answer = await main(msg);
        res.json(answer);
    } catch (err) {
        console.error("Handler Error:", err);
        res.status(500).json({
            msg: "server error",
        });
    }
};

export { chatHandler };
