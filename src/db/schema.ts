import { int, sqliteTable, text, } from "drizzle-orm/sqlite-core";

export const events = sqliteTable("events", {
	id: int().primaryKey({ autoIncrement: true }),
	date: text().notNull(),
	status: text().notNull(),
	district: text().notNull(),
});