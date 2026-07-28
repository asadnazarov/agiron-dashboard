export function ComingSoonPage({ title }: { title: string }) {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-[220px] pt-10">
      <h1 className="font-heading text-[30px] font-semibold" style={{ color: "var(--ink)" }}>
        {title}
      </h1>
      <p className="mt-1 text-[14px]" style={{ color: "var(--ink-soft)" }}>
        Bu bo'lim hozircha ishlab chiqilmoqda
      </p>

      <div
        className="mt-6 flex flex-col items-center justify-center gap-3 rounded-[20px] border py-20 text-center"
        style={{ borderColor: "var(--border)", background: "var(--surface)", boxShadow: "var(--shadow-card)" }}
      >
        <span
          className="flex h-12 w-12 items-center justify-center rounded-full text-[22px]"
          style={{ background: "var(--accent-soft)" }}
        >
          🛠️
        </span>
        <div className="font-heading text-[15px] font-semibold" style={{ color: "var(--ink)" }}>
          Tez orada ishga tushadi
        </div>
        <div className="max-w-sm text-[13px]" style={{ color: "var(--ink-soft)" }}>
          "{title}" bo'limi ustida ishlanmoqda — hozircha faqat Vazifalar va Bosh sahifa ishlaydi.
        </div>
      </div>
    </div>
  );
}
