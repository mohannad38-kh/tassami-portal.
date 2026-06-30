import { Router, type IRouter } from "express";
import { db, joinRequestsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { authMiddleware, requireRole } from "../lib/auth";
const router: IRouter = Router();

async function sendApprovalEmail(name: string, email: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Tasami <onboarding@resend.dev>",
        to: [email],
        subject: "تم قبول طلب انضمامك إلى مبادرة تسامي",
        html: `
          <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #8B0000;">مرحباً ${name} 🎉</h2>
            <p style="font-size: 16px; line-height: 1.8;">
              يسعدنا إبلاغك بأنه تم قبول طلب انضمامك إلى <strong style="color: #D4AF37;">مبادرة تسامي التطوعية</strong>.
            </p>
            <p style="font-size: 16px; line-height: 1.8;">
              نتطلع للعمل معك وصناعة أثر إيجابي مستدام في مجتمعنا.
            </p>
            <p style="font-size: 14px; color: #888; margin-top: 30px;">
              فريق مبادرة تسامي
            </p>
          </div>
        `,
      }),
    });
  } catch (err) {
    console.error("Failed to send approval email:", err);
  }
}

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
  if (status === "approved") {
    sendApprovalEmail(updated.name, updated.email);
  }
  res.json(updated);
});
export default router;
EOFcat > artifacts/api-server/src/routes/join_requests.ts << 'EOF'
import { Router, type IRouter } from "express";
import { db, joinRequestsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { authMiddleware, requireRole } from "../lib/auth";
const router: IRouter = Router();

async function sendApprovalEmail(name: string, email: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Tasami <onboarding@resend.dev>",
        to: [email],
        subject: "تم قبول طلب انضمامك إلى مبادرة تسامي",
        html: `
          <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #8B0000;">مرحباً ${name} 🎉</h2>
            <p style="font-size: 16px; line-height: 1.8;">
              يسعدنا إبلاغك بأنه تم قبول طلب انضمامك إلى <strong style="color: #D4AF37;">مبادرة تسامي التطوعية</strong>.
            </p>
            <p style="font-size: 16px; line-height: 1.8;">
              نتطلع للعمل معك وصناعة أثر إيجابي مستدام في مجتمعنا.
            </p>
            <p style="font-size: 14px; color: #888; margin-top: 30px;">
              فريق مبادرة تسامي
            </p>
          </div>
        `,
      }),
    });
  } catch (err) {
    console.error("Failed to send approval email:", err);
  }
}

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
  if (status === "approved") {
    sendApprovalEmail(updated.name, updated.email);
  }
  res.json(updated);
});
export default router;
EOFcat > artifacts/api-server/src/routes/join_requests.ts << 'EOF'
import { Router, type IRouter } from "express";
import { db, joinRequestsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { authMiddleware, requireRole } from "../lib/auth";
const router: IRouter = Router();

async function sendApprovalEmail(name: string, email: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Tasami <onboarding@resend.dev>",
        to: [email],
        subject: "تم قبول طلب انضمامك إلى مبادرة تسامي",
        html: `
          <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #8B0000;">مرحباً ${name} 🎉</h2>
            <p style="font-size: 16px; line-height: 1.8;">
              يسعدنا إبلاغك بأنه تم قبول طلب انضمامك إلى <strong style="color: #D4AF37;">مبادرة تسامي التطوعية</strong>.
            </p>
            <p style="font-size: 16px; line-height: 1.8;">
              نتطلع للعمل معك وصناعة أثر إيجابي مستدام في مجتمعنا.
            </p>
            <p style="font-size: 14px; color: #888; margin-top: 30px;">
              فريق مبادرة تسامي
            </p>
          </div>
        `,
      }),
    });
  } catch (err) {
    console.error("Failed to send approval email:", err);
  }
}

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
  if (status === "approved") {
    sendApprovalEmail(updated.name, updated.email);
  }
  res.json(updated);
});
export default router;
