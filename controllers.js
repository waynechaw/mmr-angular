let apiKey = process.env.key;


export async function getAccountInfo(req, res, next) {
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

  const defaultMasterYourself = {
    "challengeId": 401104,
    "level": "NONE",
    "value": 0,
  };
  const defaultMasterEnemy = {
    "challengeId": 401105,
    "level": "NONE",
    "value": 0,
  };
  const defaultMasterMarksman = {
    "challengeId": 401204,
    "level": "NONE",
    "value": 0,
  };
  const defaultMasterSupport = {
    "challengeId": 401205,
    "level": "NONE",
    "value": 0,
  };
  const defaultMasterFighter = {
    "challengeId": 401202,
    "level": "NONE",
    "value": 0,
  };
  const defaultMasterMage = {
    "challengeId": 401203,
    "level": "NONE",
    "value": 0,
  };
  const defaultMasterAssassin = {
    "challengeId": 401201,
    "level": "NONE",
    "value": 0,
  };
  const defaultMasterTank = {
    "challengeId": 401206,
    "level": "NONE",
    "value": 0,
  };

  const defaultCatchemAll = {
    "challengeId": 401101,
    "level": "NONE",
    "value": 0,
  };



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
  let catchemAll = data.challenges.find(item => item.challengeId == 401101);
  let oneTrick = data.challenges.find(item => item.challengeId == 401103); 
  return res.json({
    data: {
      masterYourself: masterYourself || defaultMasterYourself,
      masterEnemy:masterEnemy || defaultMasterEnemy , 
      masterMarksman : masterMarksman || defaultMasterMarksman,
      masterSupport: masterSupport || defaultMasterSupport,
      masterFighter: masterFighter || defaultMasterFighter,
      masterMage: masterMage || defaultMasterMage,
      masterAssassin: masterAssassin || defaultMasterAssassin,
      masterTank: masterTank || defaultMasterTank,
      catchemAll: catchemAll || defaultCatchemAll,
      oneTrick: oneTrick
    },
  });
}

export async function getProfilePic(req, res, next) {
  const puuid = req.body.puuid;
  const region = req.body.region;
  const response = await fetch(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${apiKey}`)
  const data = await response.json();
  res.json({
    data: data
  });
}