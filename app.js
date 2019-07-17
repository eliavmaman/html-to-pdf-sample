var express = require('express');
const bodyParser = require('body-parser');
var fs = require('fs');
var pdf = require('html-pdf');
var html = fs.readFileSync('./public/index.html', 'utf8');
var options = {format: 'Letter'};
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));
// var file = fs.writeFileSync('C:/Users/DADIA/Documents/pdfProj/client/pdfProj.pdf');

app.get('/', function (request, response) {
    res.sendFile(__dirname + '/index.html')
});
app.post('/', function (request, response) {

    let body = request.body;
    let htmlStr = `<!DOCTYPE html>
<html>
<head>
<title>Title of the document</title>
</head>

<body>
<table border="1">
    <tr>
<th>FirstName</th>
<th>LastName</th>
    </tr>
    <tr>
    <td>${body.firstName}</td>
    <td>${body.lastName}</td>
</tr>
</table>

</body>

</html>`;
    console.log(body);
    pdf.create(htmlStr, options).toFile('./pdfProj.pdf', function (err, res) {
        if (err) return console.log(err);
        console.log(res);
        var file = 'pdfProj.pdf';
        fs.readFile(file, function (err, data) {
            response.contentType("application/pdf");
            response.send(data);
        });
    });
});
app.listen(2001, function () {
    console.log("Server listening on port http://loalhost:3000");
});