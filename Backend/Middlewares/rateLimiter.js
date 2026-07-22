import { RateLimiterRedis } from "rate-limiter-flexible";
import redisClient from "../config/redis.js";

const loginLimiter = new RateLimiterRedis({
    storeClient:redisClient,
    keyPrefix:"login",
    points:5,
    duration:15*60,
     useRedisPackage: true,
});

const forgotPasswordLimiter = new RateLimiterRedis({
    storeClient:redisClient,
    keyPrefix:"forgot_password",
    points:2,
    duration:10*60,
     useRedisPackage: true,
})
const sendOtpLimiter = new RateLimiterRedis({
    storeClient:redisClient,
    keyPrefix:"send_otp",
    points:2,
    duration:15*60,
     useRedisPackage: true,
});

const verifyOtpLimiter = new RateLimiterRedis({
    storeClient:redisClient,
    keyPrefix:"verify_otp",
    points:2,
    duration:15*60,
     useRedisPackage: true,
})
const getKey = (req)=>
{
    return `${req.ip}:${req.body.email?.toLowerCase() || "unknown"}`
};

export const loginRateLimiter = async(req,res,next)=>
{
   const key = `${req.ip}:${req.body.email?.toLowerCase() || "unknown"}`;

  console.log("1️⃣ LIMITER CALLED:", key);
  console.log("2️⃣ REDIS OPEN:", redisClient.isOpen);
  console.log("3️⃣ REDIS READY:", redisClient.isReady);

  try {
    const result = await loginLimiter.consume(key);

    console.log(
      "✅ Redis remaining points:",
      result.remainingPoints
    );

    next();

  } catch (err) {

    console.log("🚫 RATE LIMIT EXCEEDED");

    return res.status(429).json({
      success: false,
      message: "Too many login attempts. Try again after 15 minutes.",
    });
  }
};
export const forgotPasswordRateLimiter = async(req,res,next)=>
{
    try{
        await forgotPasswordLimiter.consume(getKey(req));
        next();
    }
    catch(error)
    {
        return res.status(429).json({success:false,message:"Too many password recovery attempts.Try again later"})
    }
}
export const sendOtpRateLimiter = async(req,res,next)=>
{
    try{
        await sendOtpLimiter.consume(getKey(req));
        next();
    }
    catch(error)
    {
        return res.status(429).json({
            success:false,
            message:"To many Otp requests, TRy again after 10 minutes"
        })
    }
}
export const verifyOtpRateLimiter = async(req,res,next)=>
{
    try{
        await verifyOtpLimiter.consume(getKey(req));
        next();

    }
    catch(error)
    {
        return res.status(429).json({success:false,message:"Too many verification attempts.Try again later"})
    }
}