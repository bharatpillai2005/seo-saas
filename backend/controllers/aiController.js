import { analyzeKeyword, generateBlog } from "../services/geminiService.js";


/* KEYWORD ANALYSIS CONTROLLER */

export const analyzeKeywordController = async (req, res) => {

try {

const { keyword } = req.body;

if (!keyword) {
return res.status(400).json({
error: "Keyword is required"
});
}

const result = await analyzeKeyword(keyword);

res.json({
analysis: result.analysis || result,
suggestions: result.suggestions || []
});

} catch (error) {

console.log("Analyze Controller Error:", error);

res.status(500).json({
error: "Keyword analysis failed"
});

}

};



/* BLOG GENERATOR CONTROLLER */

export const generateBlogController = async (req, res) => {

try {

const { keyword } = req.body;

if (!keyword) {
return res.status(400).json({
error: "Keyword is required"
});
}

const result = await generateBlog(keyword);

res.json({
data: result
});

} catch (error) {

console.log("Generate Blog Controller Error:", error);

res.status(500).json({
error: "Blog generation failed"
});

}

};