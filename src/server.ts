import express from 'express';
import routes from './routes';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

import swaggerUi from 'swagger-ui-express';
import { openapiSpecification } from './swagger';

app.use(cors({ origin: 'http://localhost:3001', credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.disable('x-powered-by');

app.use('/doc', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use(routes);

export default app;
