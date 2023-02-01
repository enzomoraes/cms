import express from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();

import swaggerUi from 'swagger-ui-express';
import { openapiSpecification } from './swagger';

app.use(cors());
app.use(express.json());
app.disable('x-powered-by');

app.use('/doc', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use(routes);

export default app;
