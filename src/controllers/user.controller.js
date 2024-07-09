import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {User} from '../models/user.model.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import jwt from 'jsonwebtoken'


const generateAccessAndRefereshTokens = async (userId) => {
    try {

        const user = await User.findById(userId)
        const accessToken = user.GenerateAccessToken()
        const refreshToken = user.GenerateRefreshToken()
        user.refreshToken = refreshToken;
        await user.save(
            { validateBeforeSave: false }
        )
        // console.log("functoin",acessToken)
        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh token")
    }
}


const registerUser = asyncHandler(async(req,res)=>{
    console.log(req.body)
    const {firstName, lastName , email,password,Number} = req.body;
    if(!firstName ||!lastName ||!email ||!password ||!Number){
        throw new ApiError(404, "Please provide all required fields")
    }
    const existedUser = await User.findOne({email:email})
    if(existedUser){
        throw new ApiError(400, "User with this email already exists")
    }

    const user = await User.create({
        firstName,
        lastName,
        email:email,
        password,
        Number
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering user")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered successfully")
    )

})


const loginUser = asyncHandler(async (req,res)=>{
    const {email,password} = req.body;

    if(!email){
        throw new ApiError(400, "Please provide an email")
    }

    const user = await User.findOne(
        {
            email,
        }
    )

    if(!user){
        throw new ApiError(404, "User do not exist")
    }
    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new ApiError(400, "Invalid credentials");
    }
    const {accessToken,refreshToken} = await generateAccessAndRefereshTokens(user._id)

    const loggedIn = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly:true,
        secure:true,
    }
    return res
    .cookie("access_token", accessToken,options)
    .cookie("refresh_token", refreshToken,options)
    .json(
        new ApiResponse(200,
            {
                user:loggedIn,
                accessToken,
                refreshToken,
            },"User logged in successfully")
    )
})


const logoutUser = asyncHandler(async (req,res)=>{
    await User.findByIdAndUpdate(req.user._id,
        {
            $unset:{
                refreshToken:1,
            }
        },
        {
            new:true,
        }
    )

    const options ={
        httpOnly:true,
        secure:true,
    }

    return res
    .clearCookie("access_token")
    .clearCookie("refresh_token")
    .json(
        new ApiResponse(200,"User logged out successfully")
    )

})

const getCurrentUSer = asyncHandler(async (req,res)=>{
    const user = await User.findById(req.user._id).select("-password -refreshToken")
    if(!user){
        throw new ApiError(500, "Something went wrong while getting user")
    }
    return res.json(
        new ApiResponse(200,user,"User data")
    )
})

const refreshAccessToken = asyncHandler(async (req, res) => {

    // cookie was giving error put cookies
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedToken?._id)

        if (!user) {
            throw new ApiError(401, "Invalid Refresh Token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh Token is expired or used")
        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, newrefreshToken } = await generateAccessAndRefereshTokens(user._id)

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newrefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        accessToken,
                        refreshToken: newrefreshToken
                    },
                    "Access token refreshed successfully"
                )
            )
    } catch (error) {
        throw new ApiError(400, error?.message || "Invalid refresh token")
    }

})





export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getCurrentUSer,
}
