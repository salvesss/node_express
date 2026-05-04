import app from './app.js';
import { PORT } from './common/config.js';
import { logger, registerProcessErrorHandlers } from './common/logger.js';

registerProcessErrorHandlers();

// Тест п.4 (uncaughtException): после регистрации обработчика — раскомментируйте ИЛИ
// `cross-env TEST_UNCAUGHT=1 npm run dev`
if (process.env.TEST_UNCAUGHT === '1') {
  throw new Error('Oops!');
}

// Тест п.5 (unhandledRejection): раскомментируйте ИЛИ `cross-env TEST_UNHANDLED_REJECTION=1 npm run dev`
if (process.env.TEST_UNHANDLED_REJECTION === '1') {
  Promise.reject(new Error('Oops!'));
}

app.listen(PORT, () => {
  logger.info(`App is running on http://localhost:${PORT}`);
});
