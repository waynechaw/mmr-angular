let apiKey = process.env.key;

export async function getAccountInfo(req, res, next) {
  const name = req.body.name;
  const tag = req.body.tag;
  const region = req.body.region;
  console.log(`${name}#${tag}`, region);
  const response =  await fetch(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tag}?api_key=${apiKey}`);

  try {
    const data = await response.json();
    if (response.status == 200) {
      res.json(data);
    } else {
      res.status(response.status);
      res.send({
        error: data.status,
      });
    }
  } catch (error) {
      res.status(500);
      res.send({
        error: {
          message: error.message
        }
      });
  }
}

export async function getMasteryFull(req, res, next) {
  const puuid = req.body.puuid;
  const region = req.body.region;
  const response = await fetch(`https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}?api_key=${apiKey}`)


  try {
    const data = await response.json();
    if (response.status == 200) {
      res.json({
        id: puuid,
        data: data
      });
    } else {
      res.status(response.status);
      res.send({
        error: data.status,
      });
    }
  } catch (error) {
      res.status(500);
      res.send({
        error: {
          message: error.message
        }
      });
  }
}

export async function getMasteryChallenges(req, res, next) {

  const defaultMasterYourself = {
    "challengeId": 401104,
    "level": "NONE",
    "value": 0,
  };
  const defaultMasterEnemy = {
    "challengeId": 401107,
    "level": "NONE",
    "value": 0,
  };
  const defaultMasterMarksman = {
    "challengeId": 401210,
    "level": "NONE",
    "value": 0,
  };
  const defaultMasterSupport = {
    "challengeId": 401211,
    "level": "NONE",
    "value": 0,
  };
  const defaultMasterFighter = {
    "challengeId": 401208,
    "level": "NONE",
    "value": 0,
  };
  const defaultMasterMage = {
    "challengeId": 401209,
    "level": "NONE",
    "value": 0,
  };
  const defaultMasterAssassin = {
    "challengeId": 401207,
    "level": "NONE",
    "value": 0,
  };
  const defaultMasterTank = {
    "challengeId": 401212,
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





  try {
    const data = await response.json();
    if (response.status == 200) {
      let masterYourself = data.challenges.find(item => item.challengeId == 401104);
      let masterEnemy = data.challenges.find(item => item.challengeId == 401107);
      let masterTank = data.challenges.find(item => item.challengeId == 401212);
      let masterMarksman = data.challenges.find(item => item.challengeId == 401210);
      let masterSupport = data.challenges.find(item => item.challengeId == 401211);
      let masterFighter = data.challenges.find(item => item.challengeId == 401208);
      let masterMage = data.challenges.find(item => item.challengeId == 401209);
      let masterAssassin = data.challenges.find(item => item.challengeId == 401207);
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
    } else {
      res.status(response.status);
      res.send({
        error: data.status,
      });
    }
  } catch (error) {
      res.status(500);
      res.send({
        error: {
          message: error.message
        }
      });
  }
}

export async function getProfilePic(req, res, next) {
  const puuid = req.body.puuid;
  const region = req.body.region;
  const response = await fetch(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${apiKey}`)



  try {
    const data = await response.json();
    if (response.status == 200) {
      res.json({
        data: data
      });
    } else {
      res.status(response.status);
      res.send({
        error: data.status,
      });
    }
  } catch (error) {
      res.status(500);
      res.send({
        error: {
          message: error.message
        }
      });
  }
}