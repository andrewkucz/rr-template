import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { user } from "./auth.schema";

export const itemsTable = pgTable("items", {
	id: serial().primaryKey(),
	url: text().notNull().unique(),
	title: text().notNull(),
	description: text(),
	createdBy: text()
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
});
