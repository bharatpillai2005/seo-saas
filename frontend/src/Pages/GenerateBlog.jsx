function GenerateBlog() {
  return <h2>Generate Blog Page</h2>;
}
const generateBlog = async () => {

if (!keyword) return;

try {

setLastKeyword(keyword);
setLoading(true);
setResult("");
setDisplayText("");

await getSERP(keyword);

const res = await fetch("http://localhost:5000/api/ai/generate-blog",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({keyword})
});

const data = await res.json();

let text = data.data || "";
text = text.replace(/```json/g,"").replace(/```/g,"");

setResult(text);

setHistory(prev => [
...prev,
{
id:Date.now(),
text:keyword
}
]);

} catch(error) {

console.log("Blog error",error);

setResult("❌ AI blog generation failed");

}

setLoading(false);

};
export default GenerateBlog;