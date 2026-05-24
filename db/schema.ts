import { integer,boolean } from "drizzle-orm/pg-core";
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const repositories = pgTable("repositories",{
  id : serial("id").primaryKey(),
  userId : integer("user_id").references(()=>users.id).notNull(),
  repoId : integer("repo_id").notNull(),
  name : text("name").notNull(),
  fullName : text("full_name").notNull(),
  private: boolean("private").notNull(),
  htmlUrl : text("html_url").notNull(),
  description : text("description"),
  owner : text("owner").notNull()
})


export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
