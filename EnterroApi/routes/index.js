var express = require('express');
var router = express.Router();
var dataBase = require('../queries');
var REACT_APP_API_URL = "/api/enterro/";

//#region PRODUCT Table Queries
router.get(REACT_APP_API_URL + 'product', dataBase.getProducts);
//#endregion

//#region PRODUCT_ITEM Table Queries
router.get(REACT_APP_API_URL + 'productItem', dataBase.getProductItems);
router.post(REACT_APP_API_URL + 'productItem', dataBase.createProductItem);
router.put(REACT_APP_API_URL + 'productItem/:productId', dataBase.updateProductItem);
router.delete(REACT_APP_API_URL + 'productItem/:productId', dataBase.removeProductItem);
//#endregion

//#region PRODUCT_TYPE Table Queries
router.get(REACT_APP_API_URL + 'productType', dataBase.getProductTypes);
//#endregion

//#region CONTACT_US Table Queries
router.post(REACT_APP_API_URL + 'contactUs', dataBase.createContactUs);
//#endregion

//#region CAMERA_TYPE Table Queries
router.get(REACT_APP_API_URL + 'cameraType', dataBase.getCameraTypes);
//#endregion

module.exports = router;
