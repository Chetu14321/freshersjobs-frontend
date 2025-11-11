import AdSlot from "./AdSlot";

export default function Sidebar() {
  return (
    <aside className="col-md-12">
      <div className="p-3 bg-light rounded shadow-sm mb-3 text-center">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <AdSlot height={250} width={250} /> {/* Medium Rectangle */}
        </div>
      </div>
    </aside>
  );
}
