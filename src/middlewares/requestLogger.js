const requestLogger = (req, res, next) => {
    const currentTime = new Date().toISOString();  // Get the current timestamp
    const method = req.method;                    // Get the HTTP method (GET, POST, etc.)
    const endpoint = req.originalUrl;             // Get the requested endpoint
  
    // Log the method, endpoint, and timestamp
    console.log(`[${currentTime}] ${method} request to ${endpoint}`);
  
    // Call next() to pass control to the next middleware or route handler
    next();
  };

module.exports = requestLogger;