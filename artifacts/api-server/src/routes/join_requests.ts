import { Router, type IRouter } from "express";
import { db, joinRequestsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { authMiddleware, requireRole } from "../lib/auth";

const router: IRouter = Router();

router.get("/join-requests", authMiddleware, requireRole("secretary"), async (req, res): Promise<void> => {
  const { status } = req.query;
  let requests = await db.select().from(joinRequestsTable).orderBy(joinRequestsTable.createdAt);
  if (status) requests = requests.filter((r) => r.status === status);
  res.json(requests);
});

router.post("/join-requests", async (req, res): Promise<void> => {
  const { name, email, phone, message } = req.body;
  if (!name || !email) { res.status(400).json({ error: "Name and email required" }); return; }
  const [request] = await db.insert(joinRequestsTable).values({ name, email, phone, message }).returning();
  res.status(201).json(request);
});

router.get("/join-requests/:id", authMiddleware, requireRole("secretary"), async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const [request] = await db.select().from(joinRequestsTable).where(eq(joinRequestsTable.id, id));
  if (!request) { res.status(404).json({ error: "Not found" }); return; }
  res.json(request);
});

router.patch("/join-requests/:id", authMiddleware, requireRole("secretary"), async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const { status } = req.body;
  const [updated] = await db.update(joinRequestsTable).set({ status }).where(eq(joinRequestsTable.id, id)).returning();
  if (!updated) { res.status(404).json({ error: "Not found" }); return; }
  res.json(updated);
});

export default router;
