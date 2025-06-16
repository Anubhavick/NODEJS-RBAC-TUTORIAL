import jwt from 'jsonwebtoken';

 export const verifyToken = (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        // Extract the token from the Authorization header
        token = authHeader.split(' ')[1];
    }
    else {
        return res.status(401).json({ message: 'Unauthorized, no token provided' });
    } 

try{
        // Verify the token
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode ; // Attach the user information to the request object
        console.log("User information:", req.user);
        next(); // Call the next middleware or route handler
    }
    catch (err) {
        return res.status(400).json({ message: 'Unauthorized, invalid token' });
    }
}
    // Check if the token is present in the Authorization header

