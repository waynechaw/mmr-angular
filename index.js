import express  from 'express';
import path from 'path';
import { getAccountInfo, getMasteryFull, getMasteryChallenges, getProfilePic }   from './controllers.js';
const app = express();
const port = process.env.PORT || 4000;
import { getGlobals } from 'common-es'
const { __dirname, __filename } = getGlobals(import.meta.url)

app.use(express.static('dist/my-app/browser'));



app.get('*', (req, res) => {
  console.log(path.join(__dirname, 'dist', 'my-app', 'browser'));
  // res.json({});
  res.sendFile('/', {root: path.join(__dirname, 'dist', 'my-app', 'browser')})
});


app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});




app.post('/account', getAccountInfo)

app.post('/mastery', getMasteryFull)

app.post('/mastery-challenges', getMasteryChallenges)

app.post('/getProfilePic', getProfilePic)