'use strict'

const mongoose = require('mongoose');
const fs = require('fs-extra')
const path = require('path');
const configAnuncios = require('../local_config').anuncios;
const cote = require('cote');

const thumbnailRequester = new cote.Requester({
    name: 'thumbnail'
  }, { log: false, statusLogsEnabled: false })
  

//schematic creation
//https://mongoosejs.com/docs/schematypes.html
const anuncioSchema = mongoose.Schema({
    id: { type: String, index: true },
    name: { type: String, index: true },
    price: { type: Number, index: true},
    type: { type: String, index: true },
    stock: {type: Number, index: true},
    image:  String,
    
});

//schema  method static
anuncioSchema.statics.list = async function (filter, limit, skip,includeTotal) {
const query = Anuncios.find(filter);
query.limit(limit);
query.skip(skip);

const result = {}

  if (includeTotal) {
    result.total = await Anuncios.count()
  }
  result.rows = await query.exec()


  const ruta = configAnuncios.imagesURLBasePath
  result.rows.forEach(r => (r.foto = r.foto ? path.join(ruta, r.foto) : null))
  return query.exec();
}

anuncioSchema.methods.setFoto = async function (imageObject) {
  if (!imageObject) return
  const dstPath = path.join(__dirname, '../public/images/anuncios', imageObject.originalname)
  await fs.copy(imageObject.path, dstPath)
  this.foto = imageObject.originalname
  thumbnailRequester.send({
    type: 'createThumbnail',
    image: dstPath
  })


};


//static list type
// anuncioSchema.statics.type = function () {
//     return [ 'motor', 'mobile', 'lifestyle', 'work',];
// };



//Models creation
const Anuncios = mongoose.model('Anuncio', anuncioSchema);



//Export
module.exports = Anuncios;
