import express from 'express';
import cookieParser from 'cookie-parser';
import { DBConnect } from './Config/dbConfig';
import authRoutes from './Routes/authRoutes';
import { initializeSocket, io } from './Socket/socketManager';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Use static files from the public folder
app.use(express.static('public'));

app.use(cookieParser());

//connect to the db 
DBConnect();
initializeSocket();

//base route
app.use('/auth',authRoutes);

app.listen(port,()=>{
    console.log(`Server is listening on the port ${port}`);
});