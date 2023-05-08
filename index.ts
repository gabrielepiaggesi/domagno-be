import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();
const port = process.env.PORT || 4200;

app.use(cors());
app.use(bodyParser.json());
app.use(routes);

app.listen(port, () => console.log(`SERVER READY ON PORT ${port}`));