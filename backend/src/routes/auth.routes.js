import express from "express";
import { checkauth, login, logout, signup } from "../controller/auth.controller.js";
import { protectedroute } from "../middleware/protected.middleware.js";

const router=express.Router()

router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)
router.get('/checkauth',protectedroute,checkauth)

export default router