import { useEffect, useState } from "react";
import liff from "@line/liff";

import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";

export default function App() {
  const [userName, setUserName] = useState("");
  const [records, setRecords] = useState([]);

  const [form, setForm] = useState({
    seat: "",
    name: "",
    type: "",
    date: "",
    proxy: "",
    school: ""
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");

  const seats = Array.from({ length: 38 }, (_, i) => i + 1);

  // 🔥 LIFF
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

        setForm((prev) => ({
          ...prev,
          name: profile.displayName
        }));
      } catch (err) {
        console.error(err);
      }
    };

    initLiff();
    loadData();
  }, []);

  // 📥 讀 Firebase
  const loadData = async () => {
    const snapshot = await getDocs(collection(db, "records"));

    const data = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data()
    }));

    setRecords(data);
  };

  // 📤 新增資料
  const submit = async () => {
    try {
      if (!form.name || !form.seat || !form.type) {
        alert("請填完整");
        return;
      }
  
      await addDoc(collection(db, "records"), {
        seat: form.seat,
        name: form.name,
        type: form.type,
        date: form.date,
        proxy: form.proxy,
        school: form.school,
        createdAt: new Date()
      });
  
      alert("成功送出🔥");
  
      loadData();
  
      setForm({
        seat: "",
        name: userName,
        type: "",
        date: "",
        proxy: "",
        school: ""
      });
  
    } catch (err) {
      console.error(err);
      alert("Firebase 錯誤");
    }
  };
  

  // 🗑️ 刪除
  const deleteRecord = async (id) => {
    await deleteDoc(doc(db, "records", id));
    loadData();
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    borderRadius: "10px",
    border: "none",
    background: "#f3f4f6"
  };

  const cardStyle = {
    background: "rgba(255,255,255,0.9)",
    padding: "16px",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    marginBottom: "16px"
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 16,
        fontFamily: "system-ui",
        background: "linear-gradient(180deg, #6366f1, #a855f7)"
      }}
    >
      <h2 style={{ textAlign: "center", color: "white" }}>
        📋 班級請假系統
      </h2>

      <h3 style={{ textAlign: "center", color: "white" }}>
        👋 {userName}
      </h3>

      {/* 🔐 班長登入 */}
      {!isAdmin && (
        <div style={cardStyle}>
          <h3>班長登入</h3>

          <input
            type="password"
            placeholder="輸入密碼"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          <button
            onClick={() => {
              if (password === "1234") setIsAdmin(true);
              else alert("密碼錯誤");
            }}
            style={{
              marginTop: 10,
              width: "100%",
              padding: "10px",
              background: "black",
              color: "white",
              border: "none",
              borderRadius: "10px"
            }}
          >
            進入班長模式
          </button>
        </div>
      )}

      {isAdmin && (
        <div style={{ textAlign: "center", color: "white" }}>
          📊 總請假人數：{records.length}
        </div>
      )}

      {/* 表單 */}
      <div style={cardStyle}>
        <h3>新增請假</h3>

        <select
          style={inputStyle}
          value={form.seat}
          onChange={(e) => setForm({ ...form, seat: e.target.value })}
        >
          <option value="">座號</option>
          {seats.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <input style={inputStyle} value={form.name} readOnly />

        <select
          style={inputStyle}
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="">假別</option>
          <option>病假</option>
          <option>事假</option>
          <option>公假</option>
          <option>遲到</option>
        </select>

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
            borderRadius: "15px",
            border: "none",
            background: "linear-gradient(90deg,#6366f1,#a855f7)",
            color: "white",
            fontWeight: "bold"
          }}
        >
          ✈️ 送出請假
        </button>
      </div>

      {/* 紀錄 */}
      <h3 style={{ color: "white" }}>請假紀錄</h3>

      {records.map((r) => (
        <div key={r.id} style={cardStyle}>
          <div>座號：{r.seat}</div>
          <div>姓名：{r.name}</div>
          <div>假別：{r.type}</div>
          <div>日期：{r.date}</div>

          {isAdmin && (
            <button
              onClick={() => deleteRecord(r.id)}
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
    </div>
  );
}