import User from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
    try {
        const {fullName, username, gender, email, password} = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({error: "Invalid email format"});
        }
        const existingUser = await User.findOne({ username });
        if(existingUser){
            return res.status(400).json({error:"Username is already taken"});
        }
        const existingEmail = await User.findOne({ email });
        if(existingEmail){
            return res.status(400).json({error:"Email is already taken"});
        }
        if(password.length < 8) {
            return res.status(400).json({error: "Password must be atleast 8 characters long"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            gender,
            email,
            password: hashPassword,
            profileImg: gender==="male" ? boyProfilePic : girlProfilePic,
        });

        if(newUser){
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                gender: newUser.gender,
                email: newUser.email,
                profileImg: newUser.profileImg,
            });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }
    } catch (error) {
        console.log("Error in Signup Controller", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
};

export const login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")
        if(!user || !isPasswordCorrect){
            return res.status(400).json({error: "Invalid Username or Password"});
        }
        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            gender: user.gender,
            email: user.email,
            profileImg: user.profileImg,
        });
    } catch {
        console.log("Error in Login Controller", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
};

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0})
        res.status(200).json({message: "Logged Out Successfully"});
    }
    catch (error) {
        console.log("Error in Logout Controller", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.status(200).json(user);
    } catch (error){
        console.log("Error in getMe Controller", error.message);
        res.status(500).json({error: "Internal Server Error"});
    
    }
};