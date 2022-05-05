const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const router = express.Router();
const News = require('../models/newsmodel')

router.all('*', (req, res, next)=> {
  if(!req.session.admin) {
    res.redirect('login');
    return;
  }
  next();
});

/* GET home page. */
router.get('/', (req, res) => {
  const data = News.find({}, (err, data) => {
  res.render('admin/index', { title: 'Admin', data });
  console.log(data);
  });
});

router.get('/news/add', (req, res) => {
  res.render('admin/newsForm', { title: 'Dodaj news' });
});

router.post('/news/add', (req, res) => {
  const body = req.body;

const newsData = new News(body);

  newsData.save((err) => {
    if(err) {
      res.render('admin/newsForm', { title: 'Dodaj news' });
      return;
    }
    res.redirect('/admin');
  });
});

router.get('/news/delete/:id', (req, res) => {
    News.findByIdAndDelete(req.params.id, (err) => {
      res.redirect('/admin');
    });
});

module.exports = router;