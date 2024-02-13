const getSpot = require('./getSpot');
require('dotenv').config();

const sendAlert = async () => {
  const url = 'https://events.pagerduty.com/v2/enqueue';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'payload': {
        'summary': 'Test Incident',
        'severity': 'critical',
        'source': 'Node is down!'
      },
      'routing_key': process.env.PAGER_DUTY_KEY,
      'event_action': 'trigger'
    })
  });

  return response;
}

const pagerDuty = async (address, prevCheck, sentAlert) => {
  const timeout = 5000

  let node;

  const spotTuple = await getSpot(address).catch((err) => {
    console.error('Fetch failed');
  })
  node = spotTuple ? spotTuple[0] : {is_up: false};
  const isUp = node?.is_up;

  if(isUp) {
    console.log('Node is up.');

    setTimeout(() => {
      pagerDuty(address, isUp);
    }, timeout);

  } else if(prevCheck) {
    console.log('Node reported as down.. double checking.');

    setTimeout(() => {
      pagerDuty(address, false, sentAlert);
    }, timeout);

  } else if(!sentAlert) {

    console.log('ALERT! Node is down!!');

    sendAlert()
    .then(() => {
      console.error('Sent alert.')
      sentAlert = true;
    })
    .catch(() => {
      console.error('Failed to send alert.')
    })



    setTimeout(() => {
      pagerDuty(address, false, sentAlert);
    }, timeout);
  } else {
    setTimeout(() => {
      pagerDuty(address, false, sentAlert);
    }, timeout);
  }
}

pagerDuty('7NzjLAkRtGV1nibgTMtXzTK9pmZcreB5ghpovPeMYmpM', true);