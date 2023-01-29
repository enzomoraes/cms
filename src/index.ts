import app from '../src/server';
import * as dotenv from 'dotenv'
dotenv.config();

app.listen(process.env.PORT || 3000, () => console.log('server is running'));
