let apiKey = process.env.key;

export async function getAccountInfo(req, res, next) {
  console.log(432243);
  const name = req.body.name;
  const tag = req.body.tag;
  const response =  await fetch(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tag}?api_key=${apiKey}`);
  const data = await response.json();
  if (response.status == 200) {
    res.json(data);
  } else {
    res.status(response.status);
    res.send({
      error: data.status
    });

  }
}

export async function getMasteryFull(req, res, next) {
  const puuid = req.body.puuid;
  const region = req.body.region;
  const response = await fetch(`https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}?api_key=${apiKey}`)
  const data = await response.json();
  res.json({
    id: puuid,
    data: data
  });

}

export async function getMasteryChallenges(req, res, next) {
  const puuid = req.body.puuid;
  const region = req.body.region;
  const response = await fetch(`https://${region}.api.riotgames.com/lol/challenges/v1/player-data/${puuid}?api_key=${apiKey}`);
  const data = await response.json();
  let masterYourself = data.challenges.find(item => item.challengeId == 401104);
  let masterEnemy = data.challenges.find(item => item.challengeId == 401105);
  let masterTank = data.challenges.find(item => item.challengeId == 401206);
  let masterMarksman = data.challenges.find(item => item.challengeId == 401204);
  let masterSupport = data.challenges.find(item => item.challengeId == 401205);
  let masterFighter = data.challenges.find(item => item.challengeId == 401202);
  let masterMage = data.challenges.find(item => item.challengeId == 401203);
  let masterAssassin = data.challenges.find(item => item.challengeId == 401201);
  return res.json({
    data: {
      masterYourself: masterYourself,
      masterEnemy:masterEnemy, 
      masterMarksman : masterMarksman,
      masterSupport: masterSupport,
      masterFighter: masterFighter,
      masterMage: masterMage,
      masterAssassin: masterAssassin,
      masterTank: masterTank
    },
  });

}