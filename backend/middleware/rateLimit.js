const requests = new Map()

export const rateLimiter = (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();

  const date = new Date().toLocaleString("en-PH", {
    timeZone: "Asia/Manila",
  });

  console.log(`[${date}] Request from: ${ip}`);

  if (!requests.has(ip)) {
    requests.set(ip, [])
  }

  const timestamps = requests.get(ip).filter(
     (timestamp) => now - timestamp <= 60_000
   );

  requests.set(ip,timestamps)

  if (timestamps.length >= 5) {
    return res.status(429).json({
      message: "Too many requests",
    });
  }

  timestamps.push(now);


  next()
};
