const express = require("express");
const { protect } = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const {
  roleValidator,
  locationValidator,
  skillsValidator,
} = require("../validators/onboarding.validator");
const {
  setRole,
  setLocation,
  setSkills,
  completeOnboarding,
} = require("../controllers/onboarding.controller");

const router = express.Router();

// All onboarding routes require a logged-in user
router.use(protect);

router.patch("/role", roleValidator, validate, setRole);
router.patch("/location", locationValidator, validate, setLocation);
router.patch("/skills", skillsValidator, validate, setSkills);
router.patch("/complete", completeOnboarding);

module.exports = router;
