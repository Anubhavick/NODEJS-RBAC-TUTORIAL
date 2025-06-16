import express from 'express'
import { verifyToken }  from '../middlewares/authMiddleware.js'
const router = express.Router();

//only admin can access this route
router.get('/admin', verifyToken, (req, res) => {
    res.status(200).json({ message: "Welcome to the admin route" });
});
//only user can access this route
router.get('/user', verifyToken, (req, res) => {
    res.status(200).json({ message: "Welcome to the user route" });
});
//only manager can access this route
router.get('/manager', verifyToken, (req, res) => {
    res.status(200).json({ message: "Welcome to the manager route" });
});

export  default router;