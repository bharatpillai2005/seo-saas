import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { saveAs } from "file-saver";

export default function AITool() {

    const [keyword, setKeyword] = useState("");
    const [lastKeyword, setLastKeyword] = useState("");
    const [result, setResult] = useState("");
    const [displayText, setDisplayText] = useState("");
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [serpResults, setSerpResults] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    const typingRef = useRef(null);
    const chatEndRef = useRef(null);


    /* typing animation */

    useEffect(() => {

        if (!result) return;

        let i = 0;
        setDisplayText("");
        setIsTyping(true);

        typingRef.current = setInterval(() => {

            setDisplayText(prev => prev + result.charAt(i));
            i++;

            if (i >= result.length) {
                clearInterval(typingRef.current);
                setIsTyping(false);
            }

        }, 5);

        return () => clearInterval(typingRef.current);

    }, [result]);


    /* auto scroll */

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [displayText]);


    /* stop typing */

    const stopTyping = () => {

        if (typingRef.current) {
            clearInterval(typingRef.current);
            typingRef.current = null;
        }

        setIsTyping(false);
        setLoading(false);

    };


    /* SERP */

    const getSERP = async (keyword) => {

        try {

            const res = await fetch("http://localhost:5000/api/seo/serp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ keyword })
            });

            const data = await res.json();

            setSerpResults(data.organic_results || []);

        } catch (err) {
            console.log(err);
        }

    };


    /* analyze */

    const analyzeKeyword = async () => {

        if (!keyword) return;

        setLoading(true);
        setResult("");
        setDisplayText("");
        setSuggestions([]);

        await getSERP(keyword);

        const res = await fetch("http://localhost:5000/api/ai/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ keyword })
        });

        const data = await res.json();

        let text = data.analysis || "";
        text = text.replace(/```json/g, "").replace(/```/g, "");

        setResult(text);
        setSuggestions(data.suggestions || []);

        setLoading(false);

    };


    /* generate blog */

    const generateBlog = async () => {

        if (!keyword) return;

        setLastKeyword(keyword);

        setLoading(true);
        setResult("");
        setDisplayText("");

        await getSERP(keyword);

        const res = await fetch("http://localhost:5000/api/ai/generate-blog", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ keyword })
        });

        const data = await res.json();

        let text = data.data || "";
        text = text.replace(/```json/g, "").replace(/```/g, "");

        setResult(text);

        setHistory(prev => [
            ...prev,
            {
                id: Date.now(),
                text: keyword
            }
        ]);

        setLoading(false);

    };


    /* regenerate */

    const regenerateBlog = async () => {

        const kw = keyword || lastKeyword;

        if (!kw) return;

        setKeyword(kw);
        setLastKeyword(kw);

        setLoading(true);
        setResult("");
        setDisplayText("");

        await getSERP(kw);

        const res = await fetch("http://localhost:5000/api/ai/generate-blog", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ keyword: kw })
        });

        const data = await res.json();

        let text = data.data || "";
        text = text.replace(/```json/g, "").replace(/```/g, "");

        setResult(text);

        setLoading(false);

    };


    /* export blog */

    const exportBlog = () => {

        const blob = new Blob([displayText], {
            type: "text/plain;charset=utf-8"
        });

        saveAs(blob, "blog.txt");

    };


    /* enter key */

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            generateBlog();
        }
    };


    /* copy */

    const copyText = () => {

        navigator.clipboard.writeText(displayText);

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);

    };


    /* new chat */

    const newChat = () => {
        setResult("");
        setDisplayText("");
        setSerpResults([]);
        setSuggestions([]);
    };


    /* delete chat */

    const deleteChat = (id) => {
        setHistory(history.filter(chat => chat.id !== id));
    };


    return (

        <div style={styles.wrapper}>

            <div style={styles.sidebar}>

                <h3>AI Chats</h3>

                <button style={styles.newChat} onClick={newChat}>
                    + New Chat
                </button>

                {history.map(chat => (

                    <div key={chat.id} style={styles.chatItem}>

                        <span>{chat.text}</span>

                        <button
                            style={styles.deleteBtn}
                            onClick={() => deleteChat(chat.id)}
                        >
                            ✕
                        </button>

                    </div>

                ))}

            </div>


            <div style={styles.main}>

                <div style={styles.chatArea}>

                    {displayText && (

                        <div style={styles.aiMessage}>

                            <div style={styles.topActions}>
                                <button style={styles.copyBtn} onClick={copyText}>📋 Copy</button>
                                <button style={styles.download} onClick={exportBlog}>⬇ Download</button>
                            </div>

                            <div style={{ overflowWrap: "anywhere" }}>
                                <div style={{ wordBreak: "break-word" }}>

                                    <ReactMarkdown>
                                        {displayText}
                                    </ReactMarkdown>

                                </div>
                            </div>

                        </div>

                    )}

                    {loading && (

                        <div style={styles.loader}>
                            <div style={styles.spinner}></div>
                            <span>AI is typing...</span>
                        </div>

                    )}

                    <div ref={chatEndRef}></div>

                </div>


                <div style={styles.inputArea}>

                    <div style={styles.inputWrapper}>

                        <input
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Enter SEO keyword..."
                            style={styles.input}
                        />

                        <button
                            style={styles.regenerateSmall}
                            onClick={regenerateBlog}
                            title="Regenerate"
                        >
                            🔄
                        </button>

                        <button
                            style={{
                                ...styles.stopIcon,
                                background: isTyping ? "#ef4444" : "#9ca3af",
                                cursor: isTyping ? "pointer" : "not-allowed"
                            }}
                            onClick={stopTyping}
                            disabled={!isTyping}
                            title="Stop AI"
                        >

                            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                                <rect x="6" y="6" width="12" height="12" />
                            </svg>

                        </button>

                    </div>

                    <div style={styles.buttonRow}>

                        <button onClick={analyzeKeyword} style={styles.analyze}>
                            Analyze
                        </button>

                        <button onClick={generateBlog} style={styles.generate}>
                            Generate Blog
                        </button>

                    </div>

                </div>


                {copied && (

                    <div style={styles.toast}>
                        Copied ✅
                    </div>

                )}

            </div>

        </div>

    );

}


/* styles */

const styles = {

    wrapper: { display: "flex", height: "calc(100vh - 70px)", background: "#f3f4f6" },

    sidebar: { width: "240px", background: "#111827", color: "white", padding: "20px" },

    newChat: { width: "100%", padding: "10px", margin: "10px 0", border: "none", background: "#2563eb", color: "white", borderRadius: "6px", cursor: "pointer" },

    chatItem: { background: "#1f2937", padding: "10px", borderRadius: "6px", marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px" },

    deleteBtn: { background: "transparent", border: "none", color: "#ef4444", cursor: "pointer" },

    main: { flex: 1, display: "flex", flexDirection: "column" },

    chatArea: { flex: 1, padding: "30px", paddingBottom: "140px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "20px", maxWidth: "900px", margin: "0 auto" },
    aiMessage: {
        background: "white",
        padding: "20px 30px 30px 30px",
        borderRadius: "12px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
        lineHeight: "1.8"
    },
 topActions:{
display:"flex",
justifyContent:"flex-end",
alignItems:"center",
gap:"8px",
marginBottom:"10px",
width:"100%"
},
   copyBtn:{
background:"#2563eb",
border:"none",
color:"white",
padding:"4px 10px",
borderRadius:"6px",
cursor:"pointer",
fontSize:"12px",
width:"auto"
},
download:{
background:"#16a34a",
color:"white",
border:"none",
padding:"4px 10px",
borderRadius:"6px",
cursor:"pointer",
fontSize:"12px",
width:"auto"
},

    loader: { display: "flex", alignItems: "center", gap: "10px" },

    spinner: { width: "16px", height: "16px", border: "3px solid #ddd", borderTop: "3px solid #2563eb", borderRadius: "50%", animation: "spin 1s linear infinite" },

    inputArea: { position: "fixed", bottom: "0", left: "240px", right: "0", padding: "20px", borderTop: "1px solid #ddd", background: "white", display: "flex", flexDirection: "column", alignItems: "center" },

    inputWrapper: { display: "flex", alignItems: "center", gap: "8px", width: "800px", maxWidth: "90%" },

    input: { flex: 1, padding: "14px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "14px" },

    regenerateSmall: { background: "#f59e0b", border: "none", width: "36px", height: "36px", borderRadius: "6px", cursor: "pointer", color: "white" },

    stopIcon: { border: "none", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "6px" },

    buttonRow: { marginTop: "10px", display: "flex", gap: "10px", justifyContent: "center" },

    analyze: { background: "#2563eb", color: "white", border: "none", padding: "8px 20px", borderRadius: "6px", cursor: "pointer" },

    generate: { background: "#16a34a", color: "white", border: "none", padding: "8px 20px", borderRadius: "6px", cursor: "pointer" },

    toast: { position: "fixed", bottom: "30px", right: "30px", background: "#111827", color: "white", padding: "10px 16px", borderRadius: "6px" }

};  