const express = require('express');
const httpProxy = require('http-proxy');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const proxy = httpProxy.createProxyServer();
const JWT_SECRET = process.env.JWT_SECRETE;

// Middleware: Authenticate Token
function authToken(req, res, next) {
    const header = req.headers.authorization;
    const token = header && header.split(' ')[1];

    if (!token) return res.status(401).json("Token required");

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json("Invalid token");
        req.user = user;
        next();
    });
}

// Middleware: Authorize Roles
function authRole(...allowedRoles) {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json("Access denied");
        }
        next();
    };
}

// ---- ROUTE FOR EACH MICROSERVICE ---- //

app.use('/student', authToken, authRole('teacher'), (req, res) => {
    proxy.web(req, res, { target: 'http://localhost:3001' });
});

app.use('/attendance', authToken, authRole('teacher'), (req, res) => {
    proxy.web(req, res, { target: 'http://localhost:3005' });
});

app.use('/fee', authToken, authRole('admin'), (req, res) => {
    proxy.web(req, res, { target: 'http://localhost:3006' });
});

app.use('/auth', (req, res) => {
    proxy.web(req, res, { target: 'http://localhost:3000' });
});

app.use('/course', authToken, authRole('teacher'), (req, res) => {
    proxy.web(req, res, { target: 'http://localhost:3002' });
});

app.use('/result', authToken, authRole('teacher'), (req, res) => {
    proxy.web(req, res, { target: 'http://localhost:3004' });
});

// ---- START GATEWAY ---- //
app.listen(4000, () => {
    console.log('API Gateway running on port 4000');
});
