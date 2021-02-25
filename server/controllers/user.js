import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModal from "../models/user.js";
import mailgun from "mailgun-js";
import alert from 'alert';


// const DOMAIN = "sandbox28f39f3841184fda979eda7a95525311.mailgun.org";
// const api_key = "ae4f18c905c967fccf881a3d136ecc1f-d32d817f-809b0f36";

const mg = mailgun({ apiKey: api_key, domain: DOMAIN });
//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



const secret = 'test';

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const oldUser = await UserModal.findOne({ email });

        if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

        res.status(200).json({ result: oldUser, token });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }
};


// export const signup = async (req, res) => {
//     const { email, password, firstName, lastName } = req.body;

//     try {
//         const oldUser = await UserModal.findOne({ email });

//         if (oldUser) return res.status(400).json({ message: "User already exists" });

//         const hashedPassword = await bcrypt.hash(password, 12);

//         const result = await UserModal.create({ email, password: hashedPassword, name: `${firstName}${lastName}` });

//         const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });

//         res.status(201).json({ result, token });
//     } catch (error) {
//         res.status(500).json({ message: "Something went wrong" });

//         console.log(error);
//     }
// };


export const signup = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    try {
        const oldUser = await UserModal.findOne({ email });

        if (oldUser) return res.status(400).json({ message: "User already exists" });

        const newName = `${firstName}${lastName}`;
        const hashedPassword = await bcrypt.hash(password, 12);

        // const result = await UserModal.create({ email, password: hashedPassword, name: `${firstName}${lastName}` });

        // const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });
        const token = jwt.sign({ email, hashedPassword, newName }, secret, { expiresIn: "1h" });

        const link = process.env.SERVER_URL;
        const data = {
            from: 'no-reply@gifigram.com',
            to: email,
            subject: 'Confirm your email',
            html: `
            <h2>Click on link to activate your account!</h2>
            <p>${link}/user/email-activate/${token}</p>
            `,
            method: 'POST',
        };
        mg.messages().send(data, function (error, body) {
            if (error) {
                return res.json({
                    message: error.message
                })
            }
            // return res.status(201).json({ message: 'Email has been sent, please activate your account' });
        });

        res.status(201).json({ token });
        // res.status(201).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });

        console.log(error);
    }
};

export const activateAccount = async (req, res) => {
    const { token } = req.params;
    try {
        if (token) {
            jwt.verify(token, secret, async function (error, decodedToken) {
                if (error) {
                    res.status(400).json({ error: 'Incorrect or Expiried link!' });
                    return;
                }

                const { email, hashedPassword, newName } = decodedToken;
                const oldUser = await UserModal.findOne({ email });
                if (oldUser) {
                    res.status(400).json({ message: "User already exists" });
                    return;
                }
                const result = await UserModal.create({ email: email, password: hashedPassword, name: newName });
                res.redirect(`${process.env.CLIENT_URL}/auth`);
                return alert('Account activated successfully! Please Log in now!')
            })
        }

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    // return res.status(400).json({ message: "Invalid link!" });

    // if (token) {
    //     jwt.verify(token, secret, function (error, decodedToken) {
    //         if (error) {
    //             return res.status(400).json({ error: 'Incorrect or Expiried link!' })
    //         } else {
    //             const { email, hashedPassword, newName } = decodedToken;

    //             const oldUser = await UserModal.findOne({email});

    //             if (oldUser) return res.status(400).json({ message: "User already exists" });

    //             // const result = await UserModal.create({ email: email, password: hashedPassword, name: newName });
    //         }
    //     });

    // } else {
    //     return res.json({
    //         error: "Something went wrong"
    //     })
    // }
}