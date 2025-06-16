import bcrypt from 'bcryptjs'; // Import bcrypt for password hashing
import jwt from 'jsonwebtoken'; // Import jsonwebtoken for token generation
import User from '../models/userModel.js'; // Import the User model


const register = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

        const newUser = new User({
            username,
            password: hashedPassword,
            role // Include the role in the user object
        });

        await newUser.save();
        res.status(201)
            .json({ message: `user registered with username ${username} and role ${role}` });
    } catch (err) {
        res.status(500)
            .json({ message: "something went wrong " });
    }
    
    // Respond with a success message
    // You might also want to return the user object or a token here
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

const isMatch = await bcrypt.compare(password, user.password); // Compare the provided password with the hashed password
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Respond with the token and user details
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                role: user.role
            }
        });

} catch (err) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};

// ...existing code...

export { register, login };