export default function Loading() {
  return (
    <main
      aria-label="Loading SkillYug Technologies"
      style={{
        minHeight: "60vh",
        display: "grid",
        placeItems: "center",
        color: "var(--muted)",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          aria-hidden="true"
          style={{
            width: 28,
            height: 28,
            margin: "0 auto 12px",
            border: "2px solid rgba(96, 165, 250, 0.25)",
            borderTopColor: "var(--electric)",
            borderRadius: "50%",
            animation: "skillyug-spin 0.8s linear infinite",
          }}
        />
        <span style={{ fontSize: 12, letterSpacing: "0.14em" }}>LOADING</span>
      </div>
      <style>{`@keyframes skillyug-spin { to { transform: rotate(360deg); } }`}</style>
    </main>
  );
}
