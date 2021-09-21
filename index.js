const express = require('express');
const app = express();
const port = 3010;
const nodemailer = require("nodemailer");

const cors = require('cors');
const bodyParser = require('body-parser');


app.use(cors());

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "d.mehedov2@gmail.com", // generated ethereal user
		pass: "dZ4qV5tZ" // generated ethereal password
	},
});

app.get('/', (req, res) => { //post
	res.send('Hello World!')
})

app.post('/sendMessage', async (req, res) => {

	let {name, email, message} = req.body

	let info = await transporter.sendMail({
		from: 'HR', // sender address
		to: "mekhedov.d@mail.ru", // list of receivers
		subject: "Testing GMAIL", // Subject line
		// text: "Hello world?", // plain text body
		html: `<b>Сообщение с Вашего портфолио</b>
			<div><b>name:</b> ${name}</div>
    	<div><b>email:</b> ${email}</div>
      <div>${message}</div>`, // html body`
	});

	console.log("Message sent: %s", info.messageId);

	// res.send(res.body)
	res.send('send message mail')
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
