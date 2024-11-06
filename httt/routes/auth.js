const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');
const Notification = require('../models/Notification');
const ConnectionRequest = require('../models/ConnectionRequest');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });


const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(403); // Forbidden if no token

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden if token is invalid
        req.user = user; // Attach user info to the request
        next();
    });
};

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ success: true, message: 'User created successfully', userId: user._id });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, token, user: { id: user._id, username: user.username, email: user.email } });
});

router.get('/profile/:id', authenticateJWT, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile' });
    }
});

router.put('/profile/:id', authenticateJWT, upload.single('profilePicture'), async (req, res) => {
    const { username, email } = req.body;
    const updates = { username, email };

    if (req.file) {
        updates.profilePicture = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile' });
    }
});

router.delete('/profile/:id', authenticateJWT, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'Account deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting account' });
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({}, '-password');
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users' });
    }
});
// routes/auth.js
router.post('/connect', authenticateJWT, async (req, res) => {
    const { connectId } = req.body;
    const senderId = req.user.id; // Get the sender's ID from the JWT

    try {
        const existingRequest = await ConnectionRequest.findOne({
            senderId,
            receiverId: connectId,
            status: 'pending'
        });

        if (existingRequest) {
            return res.status(400).json({ message: 'Connection request already sent.' });
        }

        const connectionRequest = new ConnectionRequest({ senderId, receiverId: connectId });
        await connectionRequest.save();

        // Create a notification with the connection request ID
        const notification = new Notification({
            userId: connectId,
            message: `${senderId} sent you a connection request`,
            connectionRequestId: connectionRequest._id // Link the notification to the connection request
        });
        await notification.save();

        res.status(200).json({ message: 'Connection request sent' });
    } catch (error) {
        console.error('Error sending connection request:', error);
        res.status(500).json({ message: 'Error sending connection request' });
    }
});

// Fetch notifications for a specific user
router.get('/notifications/:userId', authenticateJWT, async (req, res) => {
    const { userId } = req.params;

    try {
        const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json({ notifications });
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Error fetching notifications' });
    }
});
// routes/auth.js
router.post('/connection-request/:id', authenticateJWT, async (req, res) => {
    const { id } = req.params; // Connection request ID
    const { action } = req.body; // 'accept' or 'reject'
    const userId = req.user.id; // Get the user ID from the JWT

    try {
        const request = await ConnectionRequest.findById(id);
        if (!request) {
            return res.status(404).json({ message: 'Connection request not found' });
        }

        if (request.receiverId.toString() !== userId) {
            return res.status(403).json({ message: 'You are not authorized to perform this action' });
        }

        request.status = action === 'accept' ? 'accepted' : 'rejected';
        await request.save();

        // Optionally, you can also remove the notification if needed
        await Notification.findOneAndDelete({ connectionRequestId: id });

        res.status(200).json({ message: `Connection request ${action}ed` });
    } catch (error) {
        console.error('Error updating connection request:', error);
        res.status(500).json({ message: 'Error updating connection request' });
    }
});

module.exports = router;