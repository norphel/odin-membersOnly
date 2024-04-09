import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  const user = req.user;
  res.render("dashboard", { user });
});

export default router;
