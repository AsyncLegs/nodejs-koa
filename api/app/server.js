import App from './app';
import { PORT } from './config';

const server = App.listen(PORT, (err) => {
    if (err) console.error(err);
    console.log(`Server running on port ${PORT}`);
});

export default server;
