const express = require('express');
const router = express.Router( { mergeParams: true } );
const wrapAsync=require('../utils/wrapAsync.js')
const Listing=require('../models/listings.js');
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController=require('../controllers/listings.js');

router
    .route("/")
    .get(wrapAsync(listingController.index))   
    .post(
        isLoggedIn,
        validateListing,
        wrapAsync(listingController.createListing)
    );

//New Route
router.get(
    "/new", 
    listingController.renderNewForm
);

router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(
        isLoggedIn,
        isOwner,
        validateListing,
        wrapAsync(listingController.updateListing)
    )
    .delete(
        isLoggedIn,
        isOwner,
        wrapAsync(listingController.destroyListing)
    );

//Edit route
router.get(
    "/:id/edit",
    isLoggedIn, 
    isOwner,
    wrapAsync(listingController.renderEditForm)
);

module.exports = router;