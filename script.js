const stepStart = document.getElementById("step-start");
const stepNutrition = document.getElementById("step-nutrition");
const stepGi = document.getElementById("step-gi");
const stepBranches = document.getElementById("step-branches");
const stepResult = document.getElementById("step-result");

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

const pathwayState = {
  nutrition: null,
  gi: null,
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
  const scores = [scoreNutric(), scoreNrs2002(), scoreSga()];
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

  revealStage(stepResult);
}

function resetFlow() {
  [stepNutrition, stepGi, stepBranches, stepResult].forEach(hideStage);
  [nutritionResults, giResults, completeAssessment].forEach((element) =>
    element.classList.add("hidden")
  );
  nutritionForm.reset();
  giForm.reset();
  nutritionResults.innerHTML = "";
  giResults.innerHTML = "";
  resultContext.innerHTML = "";
  pathwayState.nutrition = null;
  pathwayState.gi = null;
  [enteralChoice, parenteralChoice].forEach((button) =>
    button.classList.remove("recommended")
  );
}

stepStart.addEventListener("click", () => {
  revealStage(stepNutrition);
});

nutritionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  renderNutritionResults(calculateNutrition());
});

resetNutrition.addEventListener("click", () => {
  nutritionForm.reset();
  giForm.reset();
  nutritionResults.innerHTML = "";
  giResults.innerHTML = "";
  resultContext.innerHTML = "";
  nutritionResults.classList.add("hidden");
  giResults.classList.add("hidden");
  completeAssessment.classList.add("hidden");
  hideStage(stepGi);
  hideStage(stepBranches);
  hideStage(stepResult);
  pathwayState.nutrition = null;
  pathwayState.gi = null;
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

restart.addEventListener("click", () => {
  resetFlow();
  window.scrollTo({ top: 0, behavior: "smooth" });
});
