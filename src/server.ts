import express from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();

import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger_output.json';

app.use(cors());
app.use(express.json());

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(routes);

export default app;
