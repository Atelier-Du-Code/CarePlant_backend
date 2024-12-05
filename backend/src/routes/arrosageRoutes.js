"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const arrosageController_1 = require("../controllers/arrosageController");
const router = (0, express_1.Router)();
router.get('/', arrosageController_1.getAllArrosages);
exports.default = router;
