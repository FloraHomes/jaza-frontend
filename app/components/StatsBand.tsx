const stats = [
  { value: "5 min", label: "Average time to own" },
  { value: "100%", label: "Verified & titled land" },
  { value: "4+", label: "Continents served" },
  { value: "0", label: "Hidden charges" },
];

export default function StatsBand() {
  return (
    <section className="bg-white py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 gap-6 rounded-3xl border border-brdr bg-surface/60 px-6 py-8 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="font-display text-3xl font-extrabold text-primary sm:text-4xl">
                {stat.value}
              </dt>
              <dd className="mt-1 text-sm font-medium text-muted">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
