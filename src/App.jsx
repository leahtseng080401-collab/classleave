import { useEffect, useState } from "react";
import liff from "@line/liff";

export default function App() {
  const [userName, setUserName] = useState("");

  const [form, setForm] = useState({
    seat: "",
    name: "",
    type: "",
    date: "",
    proxy: "",
    school: ""
  });

  const [records, setRecords] = useState([]);

  const seats = Array.from({ length: 38 }, (_, i) => i + 1);

  // ✅ LIFF 初始化
  useEffect(() => {
    const initLiff = async () => {
      try {
        await liff.init({
          liffId: "2010089457-Dd4wenNC"
        });

        if (!liff.isLoggedIn()) {
          liff.login();
          return;
        }

        const profile = await liff.getProfile();
        setUserName(profile.displayName);

        // 👉 自動填姓名（重要升級）
        setForm(prev => ({
          ...prev,
          name: profile.displayName
        }));

      } catch (err) {
        console.error("LIFF error:", err);
      }
    };

    initLiff();
  }, []);

  const submit = () => {
    if (!form.name || !form.seat || !form.type) return;

    setRecords([form, ...records]);

    setForm({
      seat: "",
      name: userName,
      type: "",
      date: "",
      proxy: "",
      school: ""
    });
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    borderRadius: "10px",
    border: "1px solid #ddd"
  };

  const cardStyle = {
    background: "rgba(255,255,255,0.9)",
    padding: "16px",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    marginBottom: "16px",
    backdropFilter: "blur(10px)"
  };

  return (
    <div style={{
      minHeight: "100vh",
      padding: 16,
      fontFamily: "system-ui",
      background: "linear-gradient(180deg, #6366f1, #a855f7)",
    }}>
      
      <h2 style={{
  textAlign: "center",
  color: "white",
  fontSize: "22px",
  marginBottom: "10px"
}}>
📋 班級請假系統
</h2>

      {/* 👋 LIFF 使用者 */}
      <h3 style={{ textAlign: "center" }}>
        👋 歡迎 {userName}
      </h3>

      {/* 表單 */}
      <div style={cardStyle}>
        <h3>新增請假</h3>

        <label>座號</label>
        <select
          style={inputStyle}
          value={form.seat}
          onChange={(e) => setForm({ ...form, seat: e.target.value })}
        >
          <option value="">請選擇</option>
          {seats.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <label>姓名</label>
        <input
          style={inputStyle}
          value={form.name}
          readOnly
        />

        <label>假別</label>
        <select
          style={inputStyle}
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="">請選擇</option>
          <option>病假</option>
          <option>事假</option>
          <option>公假</option>
          <option>遲到</option>
        </select>

        <label>日期</label>
        <input
          type="date"
          style={inputStyle}
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

<button
  onClick={submit}
  style={{
    marginTop: 15,
    width: "100%",
    padding: "14px",
    borderRadius: "16px",
    border: "none",
    background: "linear-gradient(90deg, #6366f1, #a855f7)",
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
    cursor: "pointer"
  }}
>
  ✈️ 送出請假
</button>
      </div>

      {/* 紀錄 */}
      <h3>今日請假紀錄</h3>

      {records.length === 0 ? (
        <p style={{ color: "#666" }}>目前沒有資料</p>
      ) : (
        records.map((r, i) => (
          <div key={i} style={cardStyle}>
            <div>座號：{r.seat}</div>
            <div>姓名：{r.name}</div>
            <div>假別：{r.type}</div>
            <div>日期：{r.date}</div>
          </div>
        ))
      )}
    </div>
  );
}
const [isAdmin, setIsAdmin] = useState(true);
<button
  onClick={() => setIsAdmin(!isAdmin)}
  style={{
    marginBottom: 10,
    padding: "8px 12px",
    borderRadius: "10px",
    border: "none",
    background: "black",
    color: "white"
  }}
>
  {isAdmin ? "班長模式 ON" : "班長模式 OFF"}
</button>
{isAdmin && (
  <div style={{ marginBottom: 20 }}>
    <h3>📊 班長後台</h3>
    <p>總請假人數：{records.length}</p>
  </div>
)}
{records.map((r, i) => (
  <div key={i} style={cardStyle}>
    <div>座號：{r.seat}</div>
    <div>姓名：{r.name}</div>
    <div>假別：{r.type}</div>
    <div>日期：{r.date}</div>

    {isAdmin && (
      <button
        onClick={() => {
          const newRecords = records.filter((_, index) => index !== i);
          setRecords(newRecords);
        }}
        style={{
          marginTop: 10,
          background: "red",
          color: "white",
          border: "none",
          padding: "6px 10px",
          borderRadius: "8px"
        }}
      >
        刪除
      </button>
    )}
  </div>
))}