import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

async function test() {

  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "llama3-8b-8192",
      messages: [
        {
          role: "user",
          content: "Say hello"
        }
      ]
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  console.log(response.data);

}

test();