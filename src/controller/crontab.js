const Base = require('./base.js');
const fs = require('fs');
const moment = require('moment');
const readdir = think.promisify(fs.readdir, fs);
const readFile = think.promisify(fs.readFile, fs);

const validDir = [
  'article'
];

module.exports = class extends Base {
  async generateAction() {
    if(!this.isCli) return this.fail(1000, 'deny');

    const rootPath = this.get('root');
    const article = this.model('article');
    const category = this.model('category');
    // remove documents first
    await article.deleteAll();
    await category.deleteAll();

    console.log('sync articles begin');
    for(let dir of validDir) {
      let categoryId = await category.add({name: dir, date: moment().format('YYYY-MM-DD')});
      let files = await readdir(`${rootPath}${dir}`);
      for(let file of files) {
        let title = file.split('-')[0];
        let date = file.split('-')[1].split('.')[0];
        let text = await readFile(`${rootPath}${dir}/${file}`, 'utf8');

        let item = {
          title: title,
          date: date,
          text: text,
          author: 'oonexdl',
          category: categoryId
        };
        await article.add(item);
      }
    }

    console.log('sync articles finished');
  }
};
