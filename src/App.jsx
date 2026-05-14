import { useState } from "react";

export default function App() {
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

  const submit = () => {
    if (!form.name || !form.seat || !form.type) return;

    setRecords([form, ...records]);

    setForm({
      seat: "",
      name: "",
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
    background: "white",
    padding: "15px",
    borderRadius: "16px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    marginBottom: "15px"
  };

  return (
    <div style={{ background: "#f5f6f8", minHeight: "100vh", padding: 20, fontFamily: "sans-serif" }}>
      
      <h2 style={{ textAlign: "center" }}>📋 班級請假系統</h2>

      {/* 表單 */}
      <div style={cardStyle}>
        <h3>新增請假</h3>

        {/* 座號 */}
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

        {/* 姓名 */}
        <label>姓名</label>
        <input
          style={inputStyle}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        {/* 假別 */}
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

        {/* 日期 */}
        <label>日期</label>
        <input
          type="date"
          style={inputStyle}
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        {/* 代理人 */}
        <label>職務代理人</label>
        <select
          style={inputStyle}
          value={form.proxy}
          onChange={(e) => setForm({ ...form, proxy: e.target.value })}
        >
          <option value="">請選擇</option>
          {seats.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        {/* 學校系統 */}
        <label>學校系統</label>
        <select
          style={inputStyle}
          value={form.school}
          onChange={(e) => setForm({ ...form, school: e.target.value })}
        >
          <option value="">是否已完成</option>
          <option value="yes">已完成</option>
          <option value="no">尚未完成</option>
        </select>

        <button
          onClick={submit}
          style={{
            marginTop: 15,
            width: "100%",
            padding: "12px",
            borderRadius: "12px",
            border: "none",
            background: "#4f46e5",
            color: "white",
            fontSize: "16px"
          }}
        >
          送出請假
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
            <div>代理人：{r.proxy}</div>
            <div>學校系統：{r.school}</div>
          </div>
        ))
      )}
    </div>
  );
}
