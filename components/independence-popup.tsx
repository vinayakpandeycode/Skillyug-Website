"use client";

import React, { useEffect, useState } from "react";

export default function IndependencePopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const closed = sessionStorage.getItem("skillyug_independence_popup_closed_2026-08-15");
      if (closed) return;

      const now = new Date();
      if (now.getFullYear() === 2026 && now.getMonth() === 7 && now.getDate() === 15) {
        // slight delay to allow paint and animate
        const t = setTimeout(() => setVisible(true), 120);
        return () => clearTimeout(t);
      }
    } catch (e) {
      // ignore storage errors
    }
  }, []);

  const close = () => {
    try {
      sessionStorage.setItem("skillyug_independence_popup_closed_2026-08-15", "1");
    } catch (e) {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Independence Day 2026 celebration"
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.45)",
        zIndex: 999999,
        padding: 20,
      }}
    >
      <div
        className="independence-modal"
        style={{
          width: "min(720px, 96vw)",
          borderRadius: 12,
          overflow: "hidden",
          background: "linear-gradient(180deg,#ffffff,#fcfcfc)",
          boxShadow: "0 20px 50px rgba(2,6,23,0.6)",
          transform: "translateY(0)",
          animation: "popIn 360ms cubic-bezier(.2,.9,.2,1)",
        }}
      >
        <div style={{ display: "flex", gap: 12, alignItems: "center", padding: "20px 20px 12px" }}>
          <div style={{ width: 72, height: 48, flex: "0 0 72px" }}>
            {/* Simple tricolor flag SVG */}
            <svg viewBox="0 0 300 200" width="72" height="48" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Indian flag">
              <rect width="300" height="66.66" fill="#FF9933" />
              <rect y="66.66" width="300" height="66.66" fill="#FFFFFF" />
              <rect y="133.32" width="300" height="66.68" fill="#138808" />
              <circle cx="150" cy="100" r="14" fill="#054987" />
            </svg>
          </div>

          <div style={{ flex: 1 }}>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#0f172a" }}>🇮🇳 Happy Independence Day 2026 🇮🇳</h2>
            <div style={{ marginTop: 6, color: "#475569", fontWeight: 700 }}>15 August 2026</div>
            <div style={{ marginTop: 8, color: "#334155", fontSize: 14 }}>Celebrating the Spirit of Freedom, Innovation & Digital India</div>
            <div style={{ marginTop: 10, color: "#0b1220", fontWeight: 700 }}>SKILLYUG Technologies</div>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={close}
              style={{
                background: "transparent",
                border: "1px solid rgba(15,23,42,0.08)",
                padding: "8px 12px",
                borderRadius: 8,
                cursor: "pointer",
                color: "#0f172a",
                fontWeight: 700,
              }}
            >
              Close
            </button>
          </div>
        </div>

        <div style={{ padding: 18, borderTop: "1px solid rgba(2,6,23,0.04)", display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={close}
            autoFocus
            style={{
              background: "linear-gradient(90deg,#ff9933 0%,#138808 100%)",
              color: "#fff",
              border: "none",
              padding: "12px 18px",
              borderRadius: 10,
              fontWeight: 800,
              cursor: "pointer",
              boxShadow: "0 6px 20px rgba(3,7,18,0.3)",
            }}
          >
            Continue to Website
          </button>
        </div>

        <style>{`@keyframes popIn { from { transform: translateY(8px) scale(0.98); opacity: 0 } to { transform: translateY(0) scale(1); opacity: 1 } }`}</style>
      </div>
    </div>
  );
}
