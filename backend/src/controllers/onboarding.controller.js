const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const User = require("../models/User.model");
const WorkerProfile = require("../models/WorkerProfile.model");
const HirerProfile = require("../models/HirerProfile.model");

// PATCH /api/v1/onboarding/role
// Body: { role: "worker" | "hirer" }
const setRole = asyncHandler(async (req, res) => {
  const { role } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { role, onboardingStep: "location" },
    { new: true, runValidators: true }
  );

  // Create the matching empty profile document up front so later
  // onboarding steps can simply update it rather than upsert.
  if (role === "worker") {
    await WorkerProfile.findOneAndUpdate(
      { user: user._id },
      {},
      { upsert: true, setDefaultsOnInsert: true }
    );
  } else {
    await HirerProfile.findOneAndUpdate(
      { user: user._id },
      {},
      { upsert: true, setDefaultsOnInsert: true }
    );
  }

  res.status(200).json(new ApiResponse(200, { user: user.toSafeJSON() }, "Role saved"));
});

// PATCH /api/v1/onboarding/location
// Body: { country, state, city }
const setLocation = asyncHandler(async (req, res) => {
  const { country, state, city } = req.body;

  if (!req.user.role) {
    throw new ApiError(400, "Select a role before setting location");
  }

  // Hirers have no skills step — go straight to profile.
  const nextStep = req.user.role === "hirer" ? "profile" : "skills";

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { location: { country, state, city }, onboardingStep: nextStep },
    { new: true, runValidators: true }
  );

  res.status(200).json(new ApiResponse(200, { user: user.toSafeJSON() }, "Location saved"));
});

// PATCH /api/v1/onboarding/skills  (worker only)
// Body: { skills: ["Web Development", "Graphic Design"] }
const setSkills = asyncHandler(async (req, res) => {
  if (req.user.role !== "worker") {
    throw new ApiError(403, "Only worker accounts have a skills step");
  }

  const { skills } = req.body;

  await WorkerProfile.findOneAndUpdate(
    { user: req.user._id },
    { skills },
    { upsert: true, new: true }
  );

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { onboardingStep: "profile" },
    { new: true }
  );

  res.status(200).json(new ApiResponse(200, { user: user.toSafeJSON() }, "Skills saved"));
});

// PATCH /api/v1/onboarding/complete
// Marks onboarding finished. Call after the profile-creation step.
const completeOnboarding = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { onboardingStep: "completed" },
    { new: true }
  );

  res.status(200).json(new ApiResponse(200, { user: user.toSafeJSON() }, "Onboarding complete"));
});

// PATCH /api/v1/onboarding/reset-role
// Deliberate, user-initiated action from Settings — NOT triggered by
// login/logout. Resets role + onboarding progress so the user goes
// through role selection again. Existing WorkerProfile/HirerProfile
// documents are left untouched (so switching back later restores their
// old skills/bio/etc. rather than starting from zero).
const resetRole = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { role: null, onboardingStep: "role" },
    { new: true }
  );

  res
    .status(200)
    .json(new ApiResponse(200, { user: user.toSafeJSON() }, "Role reset — redo onboarding"));
});

module.exports = { setRole, setLocation, setSkills, completeOnboarding, resetRole };
