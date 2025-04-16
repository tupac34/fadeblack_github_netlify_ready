const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const { recipient, items } = body;

  const response = await fetch('https://api.printful.com/orders', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ recipient, items })
  });

  const result = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify(result)
  };
};
