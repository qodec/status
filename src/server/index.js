const http = require("http");
const https = require("https"); // Use https for secure URLs
const url = require("url"); // To parse query strings
const port = 5000;

const server = http.createServer((req, res) => {
  // Allow CORS for all domains
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Parse the incoming request URL to get the query string
  const queryObject = url.parse(req.url, true).query;

  // Get the 'url' query parameter
  const urlToFetch = queryObject.url;

  if (!urlToFetch) {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("Error: Please provide a URL parameter. Example: ?url=https://xyz.om");
    return;
  }

  // Check if server is active
  if (urlToFetch == "up") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Server is UP!");
    return;
  }

  // Validate that the URL starts with 'http' or 'https'
  if (!/^https?:\/\//.test(urlToFetch)) {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("Error: Invalid URL. It should start with http:// or https://");
    return;
  }

  // Determine the protocol (http or https)
  const protocol = urlToFetch.startsWith("https") ? https : require("http");

  // Fetch the URL
  protocol
    .get(urlToFetch, (response) => {
      let data = "";

      // Collect data from the response
      response.on("data", (chunk) => {
        data += chunk;
      });

      // Send the fetched data back to the client when the response is complete
      response.on("end", () => {
        res.writeHead(response.statusCode, { "Content-Type": "text/plain" }); // Set Content-Type to text/plain
        res.end(response.statusCode == 200 ? data : response.statusMessage); // Return the data or statusMessgae as plain text
      });
    })
    .on("error", (err) => {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error fetching URL: " + err.message);
    });
});

// Start Server
server.listen(port, () => {
  console.log(`Server running at ${port}`);
});
