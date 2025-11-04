const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const Article = require('./db').Article;

app.use(cors());
app.use(express.json());

app.get('/users', (req, res) => {
  Article.all((err, articles) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(articles);
    }
  });
});

app.post('/create-new-user', (req, res) => {
      Article.create({
        first_name: req.body.person.first_name,
        last_name: req.body.person.last_name,
        patronymic: req.body.person.patronymic,
        tel_number: req.body.person.tel_number,
        email: req.body.person.email,
        company: req.body.person.company,
        company_city: req.body.person.company_city,
        company_activity: req.body.person.company_activity,
        position: req.body.person.position,
        web_site: req.body.person.web_site,
        interest: req.body.person.interest,
        additional_information: req.body.person.additional_information
      }, (err, articles) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send('ok');
        }
      })
});

app.get('/clear-data-base', (req, res) => {
  Article.clear((err, articles) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send('ok');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});