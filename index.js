const http = require('http');
const qs = require('querystring');
const rental = require('./rentalPrice');

const server = http.createServer(function (request, response) {
  console.dir(request.param);

  if (request.method === 'POST') {
    console.log('POST');
    let body = '';
    request.on('data', function (data) {
      body += data;
    });

    request.on('end', function () {
      const post = qs.parse(body);
      console.log(post);

      const driverAge = Number(post.driverAge);
      const licenceHolding = Number(post.licenceHolding);
      const carClass = Number(post.carClass);
      const hasCausedAccidents = parseBool(post.violationAmount);
      const hasParticipatedInAccidents = parseBool(post.innocentviolationAmount);
      const isHighSeason = parseBool(post.season);

      const result = rental.calculatePrice(
        driverAge,
        licenceHolding,
        carClass,
        hasCausedAccidents,
        hasParticipatedInAccidents,
        isHighSeason
      );

      console.log(result);

      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end('Result: ' + result);
    });
  } else {
    const html = `
      <html>
        <body>
          <form id="calcForm" method="post" action="http://localhost:3000">
            <label for="driverAge">Driver driverAge:</label>
            <input type="number" id="driverAge" name="driverAge" required/><br>

            <label for="licenceHolding">Years with driving licenceHolding:</label>
            <input type="number" id="licenceHolding" name="licenceHolding" required/><br>

            <label for="carClass">Car class (1-5):</label>
            <input type="number" id="carClass" name="carClass" min="1" max="5" required/><br>

            <label for="violationAmount">Have you caused any violationAmountidents in the last year?</label>
            <input type="checkbox" id="violationAmount" name="violationAmount"/><br>

            <label for="innocentviolationAmount">Have you participated (but not caused) in any violationAmountidents in the last year?</label>
            <input type="checkbox" id="innocentviolationAmount" name="innocentviolationAmount"/><br>

            <label for="season">Is it high season?</label>
            <input type="checkbox" id="season" name="season"/><br>

            <input type="submit" value="Calculate"/>
          </form>
        </body>
      </html>`;

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(html);
  }
});

function parseBool(val) {
  return val === 'on';
}

const port = 3000;
const host = '127.0.0.1';
server.listen(port, host);
console.log(`Listening at http://${host}:${port}`);