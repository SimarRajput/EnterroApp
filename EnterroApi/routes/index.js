var express = require('express');
var router = express.Router();
var dataBase = require('../queries');
var REACT_APP_API_URL = "/api/enterro/";

//#region PRODUCT Table Queries
router.get(REACT_APP_API_URL + 'product', dataBase.getAllProducts);
router.get(REACT_APP_API_URL + 'product/:productId', dataBase.getProductById);
//#endregion

//#region PRODUCT_ITEM Table Queries
router.get(REACT_APP_API_URL + 'productitem', dataBase.getAllProductItems);
router.get(REACT_APP_API_URL + 'productitem/:productId', dataBase.getProductItemByPid);
router.post(REACT_APP_API_URL + 'productitem', dataBase.createProductItem);
router.put(REACT_APP_API_URL + 'productitem/:productId', dataBase.updateProductItem);
router.delete(REACT_APP_API_URL + 'productitem/:productId', dataBase.removeProductItem);
router.get(REACT_APP_API_URL + 'productitem/productByType/:productTypeId', dataBase.getProductItemByType);
router.get(REACT_APP_API_URL + 'productitem/getProductItemByCameraTypeId/:cameraTypeId', dataBase.getProductItemByCameraTypeId);
//#endregion

//#region PRODUCT_TYPE Table Queries
router.get(REACT_APP_API_URL + 'producttype', dataBase.getAllProductTypes);
//#endregion

//#region CONTACT_US Table Queries
router.post(REACT_APP_API_URL + 'contactus', dataBase.insertContactUs);
//#endregion

module.exports = router;
