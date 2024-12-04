import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
// import { connectToDatabase } from './utils/Db';
import { LOG } from './utils/Log';
import config from 'config';

// connectToDatabase();
const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(routes);

app.listen(port, () => LOG.success(`SERVER READY ON PORT ${port}`));