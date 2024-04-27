const apiKey = 'RGAPI-36231895-8e16-4eb8-9a6a-364f508f2c71';

export async function getAccountInfo(req, res, next) {
  console.log(34242323);
  const name = req.body.name;
  const tag = req.body.tag;
  const response =  await fetch(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tag}?api_key=${apiKey}`);
  console.log(response.status);
  const data = await response.json();
  if (response.status == 200) {
    res.locals.userInfo = data;
    next();
  } else {
    res.status(response.status);
    res.send({
      error: data.status
    });

  }
}

export async function getMasteryFull(req, res, next) {

  const puuid = res.locals.userInfo.puuid;
  const response = await fetch(`https://${req.body.region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}?api_key=${apiKey}`)
  const data = await response.json();
  // console.log(data);
  res.json({
    id: puuid,
    data: data
  });

}