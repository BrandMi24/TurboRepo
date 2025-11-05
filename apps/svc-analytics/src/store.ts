import { randomUUID } from "crypto";

export type StoredEvent = {
  id: string;
  type: string;
  app: "ventas" | "inventario" | "citas";
  userId?: string;
  payload: Record<string, any>;
  ts: number; // epoch ms
};

// In-memory (cámbialo por DB cuando quieras)
const events: StoredEvent[] = [];

export const store = {
  add(e: Omit<StoredEvent, "id">): StoredEvent {
    const row = { id: randomUUID(), ...e };
    events.push(row);
    return row;
  },
  all() {
    return events;
  },
  byApp(app: StoredEvent["app"]) {
    return events.filter(e => e.app === app);
  },
  metrics() {
    const total = events.length;
    const byType: Record<string, number> = {};
    for (const e of events) byType[e.type] = (byType[e.type] || 0) + 1;
    return { total, byType };
  }
};
