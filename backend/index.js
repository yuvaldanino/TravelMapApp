const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = express();
const pinRoute = require("./routes/pins")
const userRoute = require("./routes/users")
const cors = require("cors");  // Require CORS


dotenv.config();

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000' // Allow only requests from this origin
  }));


mongoose.connect(process.env.MONGO_URL , {
    useNewUrlParser : true ,
    useUnifiedTopology:true,
}).then(()=> {
    console.log("MongoDB connected!")
}).catch(err=> console.log(err));

app.use("/api/pins", pinRoute)
app.use("/api/users", userRoute)


app.listen(8800, ()=> {
    console.log("Backend server is running!")
} )