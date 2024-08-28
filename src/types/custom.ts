import { Database } from "./schema";

export type URL = Database["public"]["Tables"]["urls"]["Row"];

export type URLWithClickCount = URL & { clicks: [{ count: number }] };

export type Click = Database["public"]["Tables"]["clicks"]["Row"];
