const express = require('express');
const app = express();
const port = 3010;
const nodemailer = require("nodemailer");

const cors = require('cors');
const bodyParser = require('body-parser');


app.use(cors());

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

let smpt_login = process.env.SMPT_LOGIN || "---";
let smpt_password = process.env.SMPT_PASWORD || "---";

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: smpt_login, // generated ethereal user
		pass: smpt_password // generated ethereal password
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

let port = process.env.PORT || 3010;

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
