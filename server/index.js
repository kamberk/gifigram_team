import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import FileUpload from 'express-fileupload';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

dotenv.config();
const app = express();

app.use(bodyParser.json({ limit: "100mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(express.json())
app.use(cors());

const port = process.env.PORT || 5000;
const CONN = process.env.CONNECTION_URL;
mongoose.connect(CONN, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(port, () => console.log(`Server running on port: ${port}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);

app.use(FileUpload());

app.get('/', (req, res) => {
    res.send('Hello to memories API');
});


app.use('/posts', postRoutes);
app.use('/user', userRoutes);