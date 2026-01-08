import userModal from "../modals/userModal.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";

//create token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

//login function
export const loginUser = async (req, res) => {
    const { email, password } = req.body;  
    try {
        const user = await userModal.findOne({ email });
        if (!user) {
            return res.json({ status: "error", message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ status: "error", message: "Invalid credentials" });
        }
        const token = createToken(user._id);
        res.json({ status: true, token }); 
    } catch (error) {
        console.log(error);
        res.json({ status: "error", message: "Something went wrong" });
    }
}

//register function
export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await userModal.findOne({ email });
        if (existingUser) {
            return res.json({ status: "error", message: "User already exists" });
        }
        //validation
        if (!validator.isEmail(email)) {
            return res.json({ status: "error", message: "Invalid email" });
        }
        if (password.length < 8) {
            return res.json({ status: "error", message: "Password must be at least 8 characters" });
        }

        // if everything is fine
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // new user
        const newUser = new userModal({
            username: username,
            email: email,
            password: hashedPassword,
        });
        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ status: true, token });
    } catch (error) {
        console.log(error);
        res.json({ status: "error", message: "Something went wrong" });
    }
}