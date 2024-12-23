import * as PlayHT from 'playht';

const apiKey = process.env.PLAYHT_API_KEY as string;
const userId = process.env.PLAYHT_USER_ID as string;

PlayHT.init({
    apiKey,
    userId
});

export default PlayHT;
