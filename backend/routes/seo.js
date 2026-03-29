import express from "express";
import SerpApi from "google-search-results-nodejs";

const router = express.Router();

const search = new SerpApi.GoogleSearch(process.env.SERP_API_KEY);

router.post("/serp", (req, res) => {

const { keyword } = req.body;

const params = {
engine: "google",
q: keyword,
location: "India",
hl: "en",
gl: "in",
api_key: process.env.SERP_API_KEY
};

search.json(params, (data) => {
res.json(data);
});

});

export default router;