const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
        })
    });
}

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ message: 'No authentication token, access denied' });
        }

        try {
            // First try to verify as a Firebase token
            const decodedToken = await admin.auth().verifyIdToken(token);
            req.user = {
                id: decodedToken.uid,
                email: decodedToken.email,
                name: decodedToken.name || decodedToken.email?.split('@')[0]
            };
            return next();
        } catch (firebaseError) {
            // If Firebase verification fails, try JWT verification
            try {
                const verified = jwt.verify(token, process.env.JWT_SECRET);
                req.user = verified;
                return next();
            } catch (jwtError) {
                throw new Error('Token verification failed');
            }
        }
    } catch (err) {
        console.error('Auth error:', err);
        res.status(401).json({ message: 'Token verification failed, authorization denied' });
    }
};

module.exports = auth;
