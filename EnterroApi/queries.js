var promise = require('bluebird');

var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);

//PostgreSQL database initialization
var dataBase = pgp({
  host: 'localhost',
  port: 5432,
  database: 'enterro',
  user: 'postgres',
  password: 'Sa@123456'
});

// Add Query Functions
module.exports = {
  getAllProducts: getAllProducts,
  getProductById: getProductById,
  getAllProductItems: getAllProductItems,
  getProductItemByPid: getProductItemByPid,
  getProductItemByType: getProductItemByType,
  getProductItemByCameraTypeId: getProductItemByCameraTypeId,
  createProductItem: createProductItem,
  updateProductItem: updateProductItem,
  removeProductItem: removeProductItem,
  getAllProductTypes: getAllProductTypes,
  insertContactUs: insertContactUs
};

function quoteStr(string) {
  return '\'' + string + '\'';
}

//#region PRODUCT Table Queries

function getAllProducts(req, res, next) {
  dataBase.any('SELECT * FROM "PRODUCT"')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved all products'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getProductById(req, res, next) {
  var productId = parseInt(req.params.productId);

  dataBase.one('SELECT * FROM "PRODUCT" WHERE "PRODUCT_ID" = $1', productId)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Product fetched successfully.'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

//#endregion

//#region PRODUCT_ITEM Table Queries

function getAllProductItems(req, res, next) {
  dataBase.any('SELECT * FROM "PRODUCT_ITEM"')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved all product items.'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getProductItemByPid(req, res, next) {
  var productId = parseInt(req.params.productId);
  dataBase.any('SELECT * FROM "PRODUCT_ITEM" WHERE "PRODUCT_ID" = $1', productId)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Product item fetched successfully.'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getProductItemByType(req, res, next) {
  var productTypeId = parseInt(req.params.productTypeId);
  var query = 'SELECT * FROM "PRODUCT_ITEM" WHERE "PRODUCT_TYPE_ID" = ' + productTypeId;
  dataBase.any(query)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Product items fetched successfully.'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getProductItemByCameraTypeId(req, res, next) {
  var cameraTypeId = parseInt(req.params.cameraTypeId);
  var query = 'SELECT * FROM "PRODUCT_ITEM" WHERE "CAMERA_TYPE_ID" = ' + cameraTypeId;
  dataBase.any(query)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Product items fetched successfully.'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createProductItem(req, res, next) {
  dataBase.none('INSERT INTO "PRODUCT_ITEM"("PRODUCT_ITEM_TITLE", "PRODUCT_TYPE_ID", "CAMERA_TYPE_ID", "QUANTITY_ON_HAND", "PRICE", "DISCOUNT", "ADDED_BY", "DATE_ADDED", "UPDATED_BY", "UPDATE_TIMESTAMP")' +
    'VALUES(${productItemTitle}, ${productTypeId}, ${cameraTypeId}, ${quantityOnHand}, ${price}, ${discount}, ${addedBy}, ${dateAdded}, ${updatedBy}, ${updateTimestamp})', req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Product item added successfully.'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateProductItem(req, res, next) {
  dataBase.none('UPDATE "PRODUCT_ITEM" SET "PRODUCT_ITEM_TITLE"=$1, "PRODUCT_TYPE_ID"=$2, "CAMERA_TYPE_ID"=$3, "QUANTITY_ON_HAND"=$4, "PRICE"=$5, "DISCOUNT"=$6, "ADDED_BY"=$7, "DATE_ADDED"=$8, "UPDATED_BY"=$9, "UPDATE_TIMESTAMP"=$10 WHERE "PRODUCT_ID"=$11',
    [req.body.productItemTitle, parseInt(req.body.productTypeId), parseInt(req.body.cameraTypeId),
    parseInt(req.body.quantityOnHand), parseFloat(req.body.price), parseFloat(req.body.discount), req.body.addedBy, req.body.dateAdded, req.body.updatedBy, req.body.updateTimestamp, parseInt(req.params.productId)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Product item updated successfully.'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeProductItem(req, res, next) {
  var productId = parseInt(req.params.productId);
  dataBase.result('DELETE FROM "PRODUCT_ITEM" WHERE "PRODUCT_ID" = $1', productId)
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: 'Product item ${result.rowCount} removed successfully.'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

//#endregion

//#region PRODUCT_TYPE Table queries

function getAllProductTypes(req, res, next) {
  dataBase.any('SELECT * FROM "PRODUCT_TYPE"')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Product Types fetched successfully.'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

//#endregion

//#region CONTACT_US Table Queries

function insertContactUs(req, res, next) {
  dataBase.none('INSERT INTO "CONTACT_US"("CONTACT_EMAIL", "TEXT", "PRODUCT_NAME")' +
    'VALUES(${contactEmail}, ${helpText}, ${productName})', req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Message recieved successfully. We will get back to you as early as possible.'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

//#endregion


