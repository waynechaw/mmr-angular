let apiKey = process.env.key;
// let apiKey = 'RGAPI-5d58b8f9-028a-4058-9785-307ee97ffd94';
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

export async function getChallenges(req, res, next) {

  const puuid = req.body.puuid;
  const region = req.body.region;
  const response = await fetch(`https://${region}.api.riotgames.com/lol/challenges/v1/player-data/${puuid}?api_key=${apiKey}`);


  try {
    const data = await response.json();
    if (response.status == 200) {

      return res.json(data);
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


  const defaultMasterEnemyLegacy = {
    "challengeId": 401105,
    "level": "NONE",
    "value": 0,
  };

  const defaultMasterMarksman = {
    "challengeId": 401210,
    "level": "NONE",
    "value": 0,
  };

  const defaultMasterMarksmanLegacy = {
    "challengeId": 401204,
    "level": "NONE",
    "value": 0,
  };



  const defaultMasterSupport = {
    "challengeId": 401211,
    "level": "NONE",
    "value": 0,
  };


  const defaultMasterSupportLegacy = {
    "challengeId": 401205,
    "level": "NONE",
    "value": 0,
  };

  const defaultMasterFighter = {
    "challengeId": 401208,
    "level": "NONE",
    "value": 0,
  };

  const defaultMasterFighterLegacy = {
    "challengeId": 401202,
    "level": "NONE",
    "value": 0,
  };


  const defaultMasterMage = {
    "challengeId": 401209,
    "level": "NONE",
    "value": 0,
  };


  const defaultMasterMageLegacy = {
    "challengeId": 401203,
    "level": "NONE",
    "value": 0,
  };


  const defaultMasterAssassin = {
    "challengeId": 401207,
    "level": "NONE",
    "value": 0,
  };


  const defaultMasterAssassinLegacy = {
    "challengeId": 401201,
    "level": "NONE",
    "value": 0,
  };

  const defaultMasterTank = {
    "challengeId": 401212,
    "level": "NONE",
    "value": 0,
  };


  const defaultMasterTankLegacy = {
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





  try {
    const data = await response.json();
    if (response.status == 200) {
      let masterYourself = data.challenges.find(item => item.challengeId == 401104);
      let masterEnemy = data.challenges.find(item => item.challengeId == 401107);
      let masterEnemyLegacy = data.challenges.find(item => item.challengeId == 401105);
      let masterTank = data.challenges.find(item => item.challengeId == 401212);
      let masterTankLegacy = data.challenges.find(item => item.challengeId == 401206);
      let masterMarksman = data.challenges.find(item => item.challengeId == 401210);
      let masterMarksmanLegacy = data.challenges.find(item => item.challengeId == 401204);
      let masterSupport = data.challenges.find(item => item.challengeId == 401211);
      let masterSupportLegacy = data.challenges.find(item => item.challengeId == 401205);
      let masterFighter = data.challenges.find(item => item.challengeId == 401208);
      let masterFighterLegacy = data.challenges.find(item => item.challengeId == 401202);


      let masterMage = data.challenges.find(item => item.challengeId == 401209);
      let masterMageLegacy = data.challenges.find(item => item.challengeId == 401203);
      let masterAssassin = data.challenges.find(item => item.challengeId == 401207);
      let masterAssassinLegacy = data.challenges.find(item => item.challengeId == 401201);
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
          oneTrick: oneTrick,
          masterEnemyLegacy:masterEnemyLegacy || defaultMasterEnemyLegacy , 
          masterMarksmanLegacy : masterMarksmanLegacy || defaultMasterMarksmanLegacy,
          masterSupportLegacy: masterSupportLegacy || defaultMasterSupportLegacy,
          masterFighterLegacy: masterFighterLegacy || defaultMasterFighterLegacy,
          masterMageLegacy: masterMageLegacy || defaultMasterMageLegacy,
          masterAssassinLegacy: masterAssassinLegacy || defaultMasterAssassinLegacy,
          masterTankLegacy: masterTankLegacy || defaultMasterTankLegacy,



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