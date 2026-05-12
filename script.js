const stepStart = document.getElementById("step-start");
const stepPatient = document.getElementById("step-patient");
const stepNutrition = document.getElementById("step-nutrition");
const stepGi = document.getElementById("step-gi");
const stepBranches = document.getElementById("step-branches");
const stepResult = document.getElementById("step-result");

const patientDataForm = document.getElementById("patient-data-form");
const patientDataResults = document.getElementById("patient-data-results");
const clearPatientData = document.getElementById("clear-patient-data");

const nutritionForm = document.getElementById("nutrition-form");
const nutritionResults = document.getElementById("nutrition-results");
const completeAssessment = document.getElementById("complete-assessment");
const resetNutrition = document.getElementById("reset-nutrition");

const giForm = document.getElementById("gi-form");
const giResults = document.getElementById("gi-results");
const enteralChoice = document.getElementById("enteral-choice");
const parenteralChoice = document.getElementById("parenteral-choice");
const restart = document.getElementById("restart");

const resultTitle = document.getElementById("result-title");
const resultText = document.getElementById("result-text");
const resultContext = document.getElementById("result-context");
const enteralPlanner = document.getElementById("enteral-planner");
const enteralDayForm = document.getElementById("enteral-day-form");
const enteralTargetControls = document.getElementById("enteral-target-controls");
const enteralTargetResults = document.getElementById("enteral-target-results");
const enteralIbw = document.getElementById("enteral-ibw");
const caloriePercent = document.getElementById("calorie-percent");
const caloriePercentValue = document.getElementById("calorie-percent-value");
const proteinTarget = document.getElementById("protein-target");
const proteinTargetValue = document.getElementById("protein-target-value");
const calorieTarget = document.getElementById("calorie-target");
const calorieTargetValue = document.getElementById("calorie-target-value");

const pathwayState = {
  patient: null,
  nutrition: null,
  gi: null,
  enteralPlan: null,
};

function getNumber(id) {
  return Number(document.getElementById(id).value);
}

function getSelectValue(id) {
  return document.getElementById(id).value;
}

function revealStage(stageEl) {
  stageEl.classList.remove("hidden");
  stageEl.scrollIntoView({ behavior: "smooth", block: "center" });
}

function hideStage(stageEl) {
  stageEl.classList.add("hidden");
}

function roundToOneDecimal(value) {
  return Math.round(value * 10) / 10;
}

function getHeightInCentimeters() {
  const height = getNumber("patient-height");
  const unit = getSelectValue("height-unit");
  return unit === "in" ? height * 2.54 : height;
}

function calculatePatientBodyWeights() {
  const sex = getSelectValue("patient-sex");
  const heightCm = getHeightInCentimeters();
  const heightIn = heightCm / 2.54;
  const actualWeight = getNumber("actual-weight");
  const baseWeight = sex === "male" ? 50 : 45.5;
  const idealBodyWeight = baseWeight + 2.3 * (heightIn - 60);
  const predictedBodyWeight = baseWeight + 0.91 * (heightCm - 152.4);
  const bmi = actualWeight > 0 ? actualWeight / (heightCm / 100) ** 2 : null;

  pathwayState.patient = {
    sex,
    heightCm: roundToOneDecimal(heightCm),
    heightIn: roundToOneDecimal(heightIn),
    idealBodyWeight: roundToOneDecimal(idealBodyWeight),
    predictedBodyWeight: roundToOneDecimal(predictedBodyWeight),
    bmi: bmi ? roundToOneDecimal(bmi) : null,
  };

  return pathwayState.patient;
}

function copyBmiToEmptyNutritionFields(bmi) {
  if (!bmi) {
    return;
  }

  ["bmi", "must-bmi", "glim-bmi"].forEach((id) => {
    const input = document.getElementById(id);
    if (input && !input.value) {
      input.value = bmi;
    }
  });
}

function renderPatientDataResults(patient) {
  copyBmiToEmptyNutritionFields(patient.bmi);

  const bmiText = patient.bmi
    ? `<p><strong>BMI:</strong> ${patient.bmi} kg/m2 from actual body weight.</p>`
    : "<p><strong>BMI:</strong> Add actual body weight to calculate BMI.</p>";

  patientDataResults.innerHTML = `
    <h3>Calculated ICU Body Weight</h3>
    <div class="mini-result-grid">
      <article class="mini-result">
        <h3>Ideal Body Weight</h3>
        <p class="score">${patient.idealBodyWeight}<span> kg</span></p>
        <p>Devine-style IBW estimate using sex and height.</p>
      </article>
      <article class="mini-result">
        <h3>Predicted Body Weight</h3>
        <p class="score">${patient.predictedBodyWeight}<span> kg</span></p>
        <p>ARDSNet-style PBW equation using sex and height.</p>
      </article>
    </div>
    <p><strong>Height used:</strong> ${patient.heightCm} cm (${patient.heightIn} in).</p>
    ${bmiText}
    <p class="summary">Patient data saved. Continue with the existing nutrition assessment below.</p>
  `;
  patientDataResults.classList.remove("hidden");
}

function resetPatientData() {
  patientDataForm.reset();
  patientDataResults.innerHTML = "";
  patientDataResults.classList.add("hidden");
  pathwayState.patient = null;
}

function scoreNutric() {
  const age = getNumber("nutric-age");
  const apache = getNumber("apache");
  const sofa = getNumber("sofa");
  const comorbidities = getNumber("comorbidities");
  const hospitalDays = getNumber("hospital-days");
  const il6 = getSelectValue("il6");

  let score = 0;

  if (age >= 75) {
    score += 2;
  } else if (age >= 50) {
    score += 1;
  }

  if (apache >= 28) {
    score += 3;
  } else if (apache >= 20) {
    score += 2;
  } else if (apache >= 15) {
    score += 1;
  }

  if (sofa >= 10) {
    score += 2;
  } else if (sofa >= 6) {
    score += 1;
  }

  if (comorbidities >= 2) {
    score += 1;
  }

  if (hospitalDays >= 1) {
    score += 1;
  }

  const isModified = il6 === "unknown";
  const total = score + (il6 === "yes" ? 1 : 0);
  const highRisk = isModified ? total >= 5 : total >= 6;

  return {
    name: isModified ? "mNUTRIC" : "NUTRIC",
    score: total,
    max: isModified ? 9 : 10,
    interpretation: highRisk
      ? "High nutrition risk; prioritize early nutrition planning and close monitoring."
      : "Lower nutrition risk by this tool; continue routine ICU reassessment.",
    risk: highRisk ? "high" : "moderate",
  };
}

function scoreNrs2002() {
  const age = getNumber("nutric-age");
  const bmi = getNumber("bmi");
  const weightLoss = getNumber("weight-loss");
  const intake = getNumber("intake");
  const diseaseSeverity = getNumber("disease-severity");

  let nutritionImpairment = 0;

  if (bmi < 18.5 || weightLoss > 10 || intake <= 25) {
    nutritionImpairment = 3;
  } else if ((bmi < 20.5 && weightLoss > 5) || weightLoss > 5 || intake <= 50) {
    nutritionImpairment = 2;
  } else if (weightLoss > 0 || intake < 75) {
    nutritionImpairment = 1;
  }

  const ageAdjustment = age >= 70 ? 1 : 0;
  const score = nutritionImpairment + diseaseSeverity + ageAdjustment;

  return {
    name: "NRS-2002",
    score,
    max: 7,
    interpretation:
      score >= 3
        ? "At nutritional risk; nutrition therapy is indicated if consistent with goals of care."
        : "Below the usual nutrition-risk threshold; reassess if clinical status changes.",
    risk: score >= 3 ? "high" : "moderate",
  };
}

function scoreMust() {
  const bmi = getNumber("must-bmi");
  const weightLoss = getNumber("must-weight-loss");
  const acuteDisease = getNumber("must-acute-disease");

  let bmiScore = 0;
  if (bmi < 18.5) {
    bmiScore = 2;
  } else if (bmi <= 20) {
    bmiScore = 1;
  }

  let weightLossScore = 0;
  if (weightLoss > 10) {
    weightLossScore = 2;
  } else if (weightLoss >= 5) {
    weightLossScore = 1;
  }

  const score = bmiScore + weightLossScore + acuteDisease;
  let interpretation = "Low malnutrition risk; continue routine screening.";
  let risk = "low";

  if (score >= 2) {
    interpretation =
      "High malnutrition risk by MUST; treat nutrition risk and monitor closely.";
    risk = "high";
  } else if (score === 1) {
    interpretation =
      "Medium malnutrition risk by MUST; observe, document intake, and reassess.";
    risk = "moderate";
  }

  return {
    name: "MUST",
    score,
    max: 6,
    interpretation,
    risk,
  };
}

function scoreGlim() {
  const age = getNumber("glim-age");
  const bmi = getNumber("glim-bmi");
  const weightLoss = getNumber("glim-weight-loss");
  const timeframe = getSelectValue("glim-weight-loss-timeframe");
  const muscleMass = getNumber("glim-muscle");
  const reducedIntakeOrAssimilation = getNumber("glim-intake") === 1;
  const inflammation = getNumber("glim-inflammation") === 1;

  const weightLossModerate =
    timeframe === "six-months" ? weightLoss >= 5 : weightLoss >= 10;
  const weightLossSevere =
    timeframe === "six-months" ? weightLoss > 10 : weightLoss > 20;
  const lowBmiModerate = age >= 70 ? bmi < 22 : bmi < 20;
  const lowBmiSevere = age >= 70 ? bmi < 20 : bmi < 18.5;
  const phenotypicCriterion = weightLossModerate || lowBmiModerate || muscleMass >= 1;
  const severePhenotypicCriterion = weightLossSevere || lowBmiSevere || muscleMass === 2;
  const etiologicCriterion = reducedIntakeOrAssimilation || inflammation;
  const diagnosisMet = phenotypicCriterion && etiologicCriterion;

  let score = "No diagnosis";
  let interpretation =
    "GLIM diagnosis not met; requires at least one phenotypic and one etiologic criterion.";
  let risk = "low";

  if (diagnosisMet && severePhenotypicCriterion) {
    score = "Stage 2";
    interpretation =
      "GLIM severe malnutrition pattern; prioritize nutrition intervention and monitoring.";
    risk = "high";
  } else if (diagnosisMet) {
    score = "Stage 1";
    interpretation =
      "GLIM moderate malnutrition pattern; start targeted nutrition plan and reassess.";
    risk = "moderate";
  }

  return {
    name: "GLIM",
    score,
    max: "criteria",
    interpretation,
    risk,
  };
}

function scoreSga() {
  const fields = [
    "sga-weight",
    "sga-intake",
    "sga-symptoms",
    "sga-function",
    "sga-physical",
  ];
  const score = fields.reduce((total, id) => total + getNumber(id), 0);

  let grade = "A";
  let interpretation = "Well nourished or low suspicion of malnutrition.";
  let risk = "low";

  if (score >= 7) {
    grade = "C";
    interpretation = "Severely malnourished pattern; escalate nutrition support planning.";
    risk = "high";
  } else if (score >= 3) {
    grade = "B";
    interpretation = "Moderate or suspected malnutrition; start targeted nutrition plan.";
    risk = "moderate";
  }

  return {
    name: "SGA",
    score: grade,
    max: "A-C",
    interpretation,
    risk,
  };
}

function calculateNutrition() {
  const scores = [scoreNutric(), scoreNrs2002(), scoreMust(), scoreGlim(), scoreSga()];
  const highRiskCount = scores.filter((score) => score.risk === "high").length;
  const summary =
    highRiskCount > 0
      ? "Overall nutrition priority: high. Complete GI function assessment before choosing route."
      : "Overall nutrition priority: moderate/standard. Continue to GI function assessment.";

  pathwayState.nutrition = { scores, summary };
  return pathwayState.nutrition;
}

function renderNutritionResults(results) {
  const scoreCards = results.scores
    .map(
      (tool) => `
        <article class="mini-result ${tool.risk === "high" ? "alert" : ""}">
          <h3>${tool.name}</h3>
          <p class="score">${tool.score}<span> / ${tool.max}</span></p>
          <p>${tool.interpretation}</p>
        </article>
      `
    )
    .join("");

  nutritionResults.innerHTML = `
    <h3>Nutrition Assessment Results</h3>
    <div class="mini-result-grid">${scoreCards}</div>
    <p class="summary">${results.summary}</p>
  `;
  nutritionResults.classList.remove("hidden");
  completeAssessment.classList.remove("hidden");
}

function getRedFlags() {
  return Array.from(document.querySelectorAll('input[name="red-flags"]:checked')).map(
    (input) => input.value
  );
}

function classifyGiFunction() {
  const symptomSeverity = getNumber("gi-symptoms");
  const feedingTolerance = getSelectValue("feeding-tolerance");
  const iah = getNumber("iah");
  const redFlags = getRedFlags();

  let grade = 1;
  let title = "AGI Grade I: risk of GI dysfunction";
  let recommendation = "enteral";
  let explanation =
    "GI function appears available. Start or continue enteral nutrition with routine tolerance checks.";

  if (
    redFlags.length > 0 ||
    symptomSeverity >= 4 ||
    feedingTolerance === "contraindicated" ||
    iah >= 3
  ) {
    grade = 4;
    title = "AGI Grade IV: GI failure with immediate threat";
    recommendation = "parenteral";
    explanation =
      "Enteral feeding may be unsafe. Hold enteral nutrition, treat the cause, and use parenteral nutrition when nutrition support is needed.";
  } else if (symptomSeverity >= 3 || feedingTolerance === "intolerant") {
    grade = 3;
    title = "AGI Grade III: GI failure";
    recommendation = "parenteral";
    explanation =
      "GI function is not adequate for full enteral feeding. Consider parenteral or supplemental parenteral nutrition while reassessing daily.";
  } else if (
    symptomSeverity >= 2 ||
    feedingTolerance === "partial" ||
    feedingTolerance === "not-started" ||
    iah >= 2
  ) {
    grade = 2;
    title = "AGI Grade II: GI dysfunction";
    recommendation = "enteral";
    explanation =
      "Enteral nutrition can be attempted cautiously if not contraindicated, often with trophic or reduced-rate feeding and close monitoring.";
  }

  pathwayState.gi = {
    grade,
    title,
    recommendation,
    explanation,
    redFlags,
  };

  return pathwayState.gi;
}

function renderGiResults(result) {
  const redFlagText =
    result.redFlags.length > 0
      ? `<p><strong>Red flags selected:</strong> ${result.redFlags.join(", ")}.</p>`
      : "";

  giResults.innerHTML = `
    <h3>${result.title}</h3>
    <p>${result.explanation}</p>
    ${redFlagText}
    <p class="summary">Suggested branch: <strong>${result.recommendation}</strong>. You can still choose either route below.</p>
  `;
  giResults.classList.remove("hidden");
  updateRecommendedRoute(result.recommendation);
  revealStage(stepBranches);
}

function updateRecommendedRoute(recommendation) {
  [enteralChoice, parenteralChoice].forEach((button) => {
    button.classList.remove("recommended");
    button.removeAttribute("aria-describedby");
  });

  if (recommendation === "enteral") {
    enteralChoice.classList.add("recommended");
  } else {
    parenteralChoice.classList.add("recommended");
  }
}

function getSuggestedCaloriePercent(day) {
  if (day <= 1) {
    return 25;
  }

  if (day === 2) {
    return 50;
  }

  if (day === 3) {
    return 75;
  }

  return 100;
}

function getEstimatedIdealBodyWeight() {
  return pathwayState.patient?.idealBodyWeight || pathwayState.patient?.idealBodyWeightKg || null;
}

function prepareEnteralPlanner() {
  const estimatedIdealBodyWeight = getEstimatedIdealBodyWeight();

  enteralPlanner.classList.remove("hidden");
  enteralDayForm.reset();
  enteralTargetControls.classList.add("hidden");
  enteralTargetResults.innerHTML = "";
  pathwayState.enteralPlan = null;

  if (estimatedIdealBodyWeight) {
    enteralIbw.value = estimatedIdealBodyWeight;
  }
}

function resetEnteralPlanner() {
  enteralPlanner.classList.add("hidden");
  enteralTargetControls.classList.add("hidden");
  enteralDayForm.reset();
  enteralTargetResults.innerHTML = "";
  pathwayState.enteralPlan = null;
}

function updateEnteralTargetDisplay() {
  const day = getNumber("icu-day");
  const idealBodyWeight = getNumber("enteral-ibw");

  if (!day || !idealBodyWeight) {
    return;
  }

  const calorieDeliveryPercent = Number(caloriePercent.value);
  const proteinPerKg = Number(proteinTarget.value);
  const caloriesPerKg = Number(calorieTarget.value);
  const proteinGrams = Math.round(idealBodyWeight * proteinPerKg * 10) / 10;
  const fullCalories = Math.round(idealBodyWeight * caloriesPerKg);
  const dayCalories = Math.round(fullCalories * (calorieDeliveryPercent / 100));

  caloriePercentValue.textContent = `${calorieDeliveryPercent}%`;
  proteinTargetValue.textContent = proteinPerKg.toFixed(1);
  calorieTargetValue.textContent = caloriesPerKg.toString();

  pathwayState.enteralPlan = {
    day,
    idealBodyWeight,
    calorieDeliveryPercent,
    proteinPerKg,
    caloriesPerKg,
    proteinGrams,
    fullCalories,
    dayCalories,
  };

  enteralTargetResults.innerHTML = `
    <div class="target-number-grid">
      <article>
        <span>Protein target</span>
        <strong>${proteinGrams} g/day</strong>
        <small>${proteinPerKg.toFixed(1)} g/kg/day x IBW ${idealBodyWeight} kg</small>
      </article>
      <article>
        <span>Full calorie requirement</span>
        <strong>${fullCalories} kcal/day</strong>
        <small>${caloriesPerKg} kcal/kg/day x IBW ${idealBodyWeight} kg</small>
      </article>
      <article>
        <span>ICU day ${day} calorie target</span>
        <strong>${dayCalories} kcal/day</strong>
        <small>${calorieDeliveryPercent}% of full calorie requirement</small>
      </article>
    </div>
    <p class="summary">Suggested day-based advancement: day 1 about 25%, day 2 about 50%, day 3 about 75%, and day 4 onward up to 100% if tolerated.</p>
  `;
}

function selectRoute(route) {
  const gi = pathwayState.gi;
  const nutrition = pathwayState.nutrition;
  const isRecommended = gi && gi.recommendation === route;

  resultTitle.textContent =
    route === "enteral" ? "Enteral Pathway Selected" : "Parenteral Pathway Selected";

  resultText.textContent =
    route === "enteral"
      ? "Proceed with enteral nutrition if no contraindication is present. Start per protocol, advance as tolerated, and monitor gastric residuals, vomiting, distension, diarrhea, aspiration risk, and hemodynamics."
      : "Proceed with parenteral nutrition strategy when enteral nutrition is unsafe, contraindicated, or insufficient. Reassess GI function frequently for possible transition to enteral feeding.";

  resultContext.innerHTML = `
    ${gi ? `<p><strong>GI classification:</strong> ${gi.title}</p>` : ""}
    ${nutrition ? `<p><strong>Nutrition summary:</strong> ${nutrition.summary}</p>` : ""}
    <p><strong>Route alignment:</strong> ${
      isRecommended
        ? "This matches the pathway recommendation from the GI assessment."
        : "This differs from the pathway recommendation; document the clinical reason for overriding."
    }</p>
  `;

  if (route === "enteral") {
    prepareEnteralPlanner();
  } else {
    resetEnteralPlanner();
  }

  revealStage(stepResult);
}

function resetFlow() {
  [stepPatient, stepNutrition, stepGi, stepBranches, stepResult].forEach(hideStage);
  [nutritionResults, giResults, completeAssessment].forEach((element) =>
    element.classList.add("hidden")
  );
  patientDataForm.reset();
  nutritionForm.reset();
  giForm.reset();
  enteralDayForm.reset();
  patientDataResults.innerHTML = "";
  nutritionResults.innerHTML = "";
  giResults.innerHTML = "";
  resultContext.innerHTML = "";
  enteralTargetResults.innerHTML = "";
  patientDataResults.classList.add("hidden");
  enteralPlanner.classList.add("hidden");
  enteralTargetControls.classList.add("hidden");
  pathwayState.patient = null;
  pathwayState.nutrition = null;
  pathwayState.gi = null;
  pathwayState.enteralPlan = null;
  [enteralChoice, parenteralChoice].forEach((button) =>
    button.classList.remove("recommended")
  );
}

stepStart.addEventListener("click", () => {
  revealStage(stepPatient);
});

patientDataForm.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPatientDataResults(calculatePatientBodyWeights());
  revealStage(stepNutrition);
});

clearPatientData.addEventListener("click", () => {
  resetPatientData();
  nutritionForm.reset();
  giForm.reset();
  enteralDayForm.reset();
  nutritionResults.innerHTML = "";
  giResults.innerHTML = "";
  resultContext.innerHTML = "";
  enteralTargetResults.innerHTML = "";
  nutritionResults.classList.add("hidden");
  giResults.classList.add("hidden");
  completeAssessment.classList.add("hidden");
  enteralPlanner.classList.add("hidden");
  enteralTargetControls.classList.add("hidden");
  hideStage(stepNutrition);
  hideStage(stepGi);
  hideStage(stepBranches);
  hideStage(stepResult);
  pathwayState.nutrition = null;
  pathwayState.gi = null;
  pathwayState.enteralPlan = null;
  [enteralChoice, parenteralChoice].forEach((button) =>
    button.classList.remove("recommended")
  );
});

nutritionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  renderNutritionResults(calculateNutrition());
});

resetNutrition.addEventListener("click", () => {
  nutritionForm.reset();
  giForm.reset();
  enteralDayForm.reset();
  nutritionResults.innerHTML = "";
  giResults.innerHTML = "";
  resultContext.innerHTML = "";
  enteralTargetResults.innerHTML = "";
  nutritionResults.classList.add("hidden");
  giResults.classList.add("hidden");
  completeAssessment.classList.add("hidden");
  enteralPlanner.classList.add("hidden");
  enteralTargetControls.classList.add("hidden");
  hideStage(stepGi);
  hideStage(stepBranches);
  hideStage(stepResult);
  pathwayState.nutrition = null;
  pathwayState.gi = null;
  pathwayState.enteralPlan = null;
  [enteralChoice, parenteralChoice].forEach((button) =>
    button.classList.remove("recommended")
  );
});

completeAssessment.addEventListener("click", () => {
  revealStage(stepGi);
});

giForm.addEventListener("submit", (event) => {
  event.preventDefault();
  renderGiResults(classifyGiFunction());
});

enteralChoice.addEventListener("click", () => selectRoute("enteral"));
parenteralChoice.addEventListener("click", () => selectRoute("parenteral"));

enteralDayForm.addEventListener("submit", (event) => {
  event.preventDefault();
  caloriePercent.value = getSuggestedCaloriePercent(getNumber("icu-day"));
  enteralTargetControls.classList.remove("hidden");
  updateEnteralTargetDisplay();
});

[caloriePercent, proteinTarget, calorieTarget, enteralIbw].forEach((input) => {
  input.addEventListener("input", updateEnteralTargetDisplay);
});

restart.addEventListener("click", () => {
  resetFlow();
  window.scrollTo({ top: 0, behavior: "smooth" });
});
