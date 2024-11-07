import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js'
import cors from 'cors'
const app = express();
const PORT = 3000;
const db_uri = "mongodb+srv://krishnaPhuyal:knn229258@cluster0.ysr2c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/practice";


//configuring for json data
app.use(express.json());

//configuration with cors
app.use(cors())


//url config 

app.use(express.urlencoded({ extended: true }))

//home route
app.get('/', (req, res) => {
    res.send("Hello world");
});


//middleware 
app.use('/user', userRouter);


const dbConnect = async () => {
    try {
        await mongoose.connect(db_uri);
        console.log("Database connected");
    } catch (error) {
        console.log("Database connection error:", error);
        process.exit(1);
    }
};

dbConnect().then(() => {
    app.listen(PORT, () => {
        console.log("Server running on port", PORT);
    });
});
