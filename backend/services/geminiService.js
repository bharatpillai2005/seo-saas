import axios from "axios";


/* ===============================
   KEYWORD ANALYSIS
================================ */

export const analyzeKeyword = async (keyword) => {

try {

const prompt = `
Analyze this SEO keyword: ${keyword}

Provide the following:

1. Keyword Difficulty (Easy / Medium / Hard)
2. Search Intent (Informational / Transactional / Commercial)
3. SEO Optimization Tips
4. Five related keyword suggestions

Return response in JSON format like this:

{
"analysis":"complete keyword analysis here",
"suggestions":["keyword1","keyword2","keyword3","keyword4","keyword5"]
}
`;

const response = await axios.post(
"https://api.groq.com/openai/v1/chat/completions",
{
model: "llama-3.1-8b-instant",
messages: [
{
role: "user",
content: prompt
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

const text = response.data.choices[0].message.content;

try {
return JSON.parse(text);
} catch {
return {
analysis: text,
suggestions: []
};
}

} catch (error) {

console.log("Keyword analysis error:", error);

return {
analysis: "AI analysis failed",
suggestions: []
};

}

};



/* ===============================
   BLOG GENERATOR
================================ */

export const generateBlog = async (keyword) => {

try {

const prompt = `
Write a complete SEO optimized blog about: ${keyword}

The blog must follow this structure:

# Title

Meta Description

## Introduction

## What is ${keyword}

## Key Features

## Benefits

## Applications

## Industries Using ${keyword}

## Comparison Table

| Feature | Details |
|--------|--------|

## Frequently Asked Questions

Q1:
Q2:
Q3:
Q4:
Q5:

## Conclusion

Rules:
- Minimum 1500 words
- SEO optimized
- Use H1 H2 H3 headings
- Use bullet points
- Add useful table
`;

const response = await axios.post(
"https://api.groq.com/openai/v1/chat/completions",
{
model: "llama-3.1-8b-instant",
messages: [
{
role: "user",
content: prompt
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

return response.data.choices[0].message.content;

} catch (error) {

console.log("Blog generation error:", error);

return "Blog generation failed";

}

};