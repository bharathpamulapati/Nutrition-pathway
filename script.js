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
const productLibrary = document.getElementById("product-library");
const productGrid = document.getElementById("product-grid");

function createPreparation(
  name,
  type,
  manufacturer,
  tags,
  calories,
  calDensity,
  protein,
  fat,
  cho,
  sodium,
  potassium,
  phosphorus,
  totalVolume,
  dilution
) {
  return {
    name,
    type,
    manufacturer,
    tags,
    constituents: [
      { label: "Calories", value: calories },
      { label: "Cal Density", value: calDensity, highlight: true },
      { label: "Protein", value: protein },
      { label: "Fat", value: fat },
      { label: "CHO", value: cho },
      { label: "Sodium", value: sodium },
      { label: "Potassium", value: potassium },
      { label: "Phosphorus", value: phosphorus },
      { label: "Total Volume", value: totalVolume },
    ],
    dilution,
  };
}

const enteralPreparations = [
  createPreparation("ALBUWISE", "Standard", "Nucgnex", ["Low Sodium", "High Protein", "Low Cal Density"], "129 kcal", "0.65 kcal/ml", "18.3 g", "3.0 g", "7.2 g", "137 mg", "116 mg", "29 mg", "200 ml", "Standard Dilution: 3 levelled scoops (30g) in 180ml water"),
  createPreparation("CELEVIDA EN - 1 Kcal/ml", "Standard", "Nestle-Dr Reddy", ["Low Protein"], "220 kcal", "0.96 kcal/ml", "10.5 g", "8.0 g", "26.0 g", "218 mg", "137 mg", "87 mg", "230 ml", "Standard Dilution: 2 leveled scoops (50g) in 200ml water"),
  createPreparation("CELEVIDA EN - 1.52 Kcal/ml", "Standard", "Nestle-Dr Reddy", ["Low Protein"], "220 kcal", "1.47 kcal/ml", "10.5 g", "8.0 g", "26.0 g", "218 mg", "137 mg", "87 mg", "150 ml", "Standard Dilution: 2 leveled scoops (50g) in 125ml water"),
  createPreparation("CELEVIDA EN - 1.69 Kcal/ml", "Standard", "Nestle-Dr Reddy", ["Low Protein", "High Cal Density"], "220 kcal", "1.63 kcal/ml", "10.5 g", "8.0 g", "26.0 g", "218 mg", "137 mg", "87 mg", "135 ml", "Standard Dilution: 2 leveled scoops (50g) in 110ml water"),
  createPreparation("CELEVIDA EN - 2 Kcal/ml", "Standard", "Nestle-Dr Reddy", ["Fluid Restriction", "Low Protein", "High Cal Density"], "220 kcal", "2.00 kcal/ml", "10.5 g", "8.0 g", "26.0 g", "218 mg", "137 mg", "87 mg", "110 ml", "Standard Dilution: 2 leveled scoops (50g) in 90ml water"),
  createPreparation("CELNUTRA 1.0", "Standard", "Nucgnex", ["Low Sodium", "Low Protein"], "210 kcal", "1.00 kcal/ml", "10.5 g", "7.0 g", "24.3 g", "63 mg", "105 mg", "100 mg", "210 ml", "Standard Dilution: 5 leveled scoops (50g) in 170ml water"),
  createPreparation("CELNUTRA 2.0", "Standard", "Nucgnex", ["Low Sodium", "Fluid Restriction", "High Protein", "High Cal Density"], "245 kcal", "2.23 kcal/ml", "18.0 g", "8.9 g", "23.1 g", "67 mg", "105 mg", "71 mg", "110 ml", "Standard Dilution: 5 levelled scoops (50g) in 70ml water"),
  createPreparation("CELNUTRA DM 1.5", "Standard", "Nucgnex", ["Low Sodium", "Low Protein", "High Cal Density"], "230 kcal", "1.53 kcal/ml", "12.0 g", "10.0 g", "20.5 g", "100 mg", "175 mg", "160 mg", "150 ml", "Standard Dilution: 5 levelled scoops (50g) in 125ml water"),
  createPreparation("ENSURE DM", "Diabetes", "Abbott", ["Low Protein"], "217 kcal", "0.92 kcal/ml", "10.8 g", "8.7 g", "22.0 g", "211 mg", "370 mg", "168 mg", "237 ml", "Standard Dilution: 6 leveled scoops (52.1g) in 200ml water"),
  createPreparation("ENSURE PLUS", "Standard", "Abbott", ["Low Sodium", "Low Protein"], "239 kcal", "1.03 kcal/ml", "10.4 g", "6.5 g", "33.0 g", "150 mg", "314 mg", "122 mg", "231 ml", "Standard Dilution: 6 leveled scoops (55g) in 190ml water"),
  createPreparation("FRESUBIN DM", "Diabetes", "Fresenius Kabi", ["Low Sodium", "Low Protein"], "223 kcal", "1.02 kcal/ml", "10.1 g", "10.0 g", "24.9 g", "180 mg", "300 mg", "150 mg", "218 ml", "Standard Dilution: 4 leveled scoops (50g) in 170ml water"),
  createPreparation("FRESUBIN HP", "High Protein", "Fresenius Kabi", ["Low Sodium", "Fluid Restriction", "Low Protein", "High Cal Density"], "200 kcal", "2.00 kcal/ml", "9.0 g", "10.5 g", "18.5 g", "63 mg", "99 mg", "63 mg", "100 ml", "Standard Dilution: 3 leveled scoops (42g) in 60ml water"),
  createPreparation("HINEX DM", "Diabetic", "Otsuka", ["Low Sodium", "Low Protein"], "228 kcal", "1.14 kcal/ml", "11.4 g", "10.1 g", "25.3 g", "152 mg", "266 mg", "135 mg", "200 ml", "Standard Dilution: 4 leveled scoops (50g) in 190ml water"),
  createPreparation("HINEX HP", "High Protein", "Otsuka", ["Low Sodium", "Low Protein", "Low Cal Density"], "89 kcal", "0.45 kcal/ml", "11.3 g", "0.3 g", "11.4 g", "60 mg", "190 mg", "63 mg", "200 ml", "Standard Dilution: 2 leveled scoops (25g) in 150ml water"),
  createPreparation("HINEX ST", "Standard", "Otsuka", ["Low Sodium", "Low Protein"], "224 kcal", "1.12 kcal/ml", "9.5 g", "8.0 g", "29.4 g", "155 mg", "254 mg", "127 mg", "200 ml", "Standard Dilution: 4 leveled scoops (50g) in 185ml water"),
  createPreparation("HINEX ST PLUS", "Probiotic", "Otsuka", ["Low Sodium", "Low Protein"], "220 kcal", "1.10 kcal/ml", "11.0 g", "7.5 g", "28.3 g", "162 mg", "267 mg", "125 mg", "200 ml", "Standard Dilution: 4 leveled scoops (50g) in 180ml water"),
  createPreparation("KABIPRO", "KABIPRO", "Fresenius Kabi", ["Low Sodium", "Low Protein", "Low Cal Density"], "88 kcal", "0.40 kcal/ml", "10.1 g", "0.7 g", "10.8 g", "55 mg", "164 mg", "94 mg", "220 ml", "Standard Dilution: 2 leveled scoops (24g) in 200ml water"),
  createPreparation("PentaSure 2.0", "High Calorie, High Protein", "Pentasure", ["Low Sodium", "Fluid Restriction", "High Protein", "High Cal Density"], "243 kcal", "2.25 kcal/ml", "18.7 g", "8.6 g", "23.2 g", "68 mg", "113 mg", "81 mg", "108 ml", "Standard Dilution: 4 level scoops (54g) in 65 ml water"),
  createPreparation("PentaSure CRITIPEP", "Peptide diet", "Pentasure", ["Low Sodium", "Low Protein"], "99 kcal", "0.97 kcal/ml", "4.0 g", "4.5 g", "10.5 g", "30 mg", "128 mg", "70 mg", "102 ml", "Standard Dilution: 2 heaped scoops (20g) in 85ml water"),
  createPreparation("PentaSure DLS", "Dialysis", "Pentasure", ["Low Sodium", "Fluid Restriction", "Low Protein", "High Cal Density"], "207 kcal", "2.07 kcal/ml", "10.5 g", "10.4 g", "17.8 g", "59 mg", "99 mg", "60 mg", "100 ml", "Standard Dilution: 4 heaped scoops (42g) in 66ml water"),
  createPreparation("PentaSure DM", "Diabetes", "Pentasure", ["Low Sodium", "Low Protein"], "229 kcal", "0.97 kcal/ml", "11.3 g", "9.3 g", "25.0 g", "150 mg", "225 mg", "163 mg", "237 ml", "Standard Dilution: 4 level scoops (50g) in 200ml water"),
  createPreparation("PentaSure Hepatic", "Hepatic", "Pentasure", ["Low Sodium", "Low Protein", "High Cal Density"], "207 kcal", "1.50 kcal/ml", "8.8 g", "4.5 g", "32.5 g", "120 mg", "180 mg", "100 mg", "138 ml", "Standard Dilution: 4 heaped scoops (50g) in 100ml water"),
  createPreparation("PentaSure HP", "High Protein", "Pentasure", ["Low Sodium"], "116 kcal", "0.81 kcal/ml", "13.5 g", "1.0 g", "13.2 g", "180 mg", "240 mg", "171 mg", "144 ml", "Standard Dilution: 2 level scoops (30g) in 120ml water"),
  createPreparation("PentaSure Renal", "Low protein", "Pentasure", ["Low Sodium", "Low Protein", "High Cal Density"], "199 kcal", "1.99 kcal/ml", "5.5 g", "9.2 g", "23.5 g", "42 mg", "50 mg", "63 mg", "100 ml", "Standard Dilution: 4 heaped scoops (42g) in 66ml water"),
  createPreparation("PEPTAMEN ADULT", "Peptide", "Nestle-Dr Reddy", ["Low Protein"], "258 kcal", "1.03 kcal/ml", "10.1 g", "9.9 g", "32.2 g", "204 mg", "374 mg", "140 mg", "250 ml", "Standard Dilution: 7 leveled scoops (55g) in 210ml water"),
  createPreparation("RESOURCE Dialysis", "Dialysis", "Nestle-Dr Reddy", ["Low Sodium", "High Cal Density"], "217 kcal", "1.56 kcal/ml", "13.5 g", "8.2 g", "23.6 g", "73 mg", "173 mg", "116 mg", "139 ml", "Standard Dilution: 6 leveled scoops (50g) in 90ml water"),
  createPreparation("RESOURCE Diabetic", "Diabetic", "Nestle-Dr Reddy", ["Low Sodium", "Low Protein"], "214 kcal", "0.92 kcal/ml", "12.0 g", "8.0 g", "25.1 g", "108 mg", "274 mg", "150 mg", "231 ml", "Standard Dilution: 6 leveled scoops (50g) in 190ml water"),
  createPreparation("RESOURCE HP", "High Protein", "Nestle-Dr Reddy", ["Low Sodium", "High Protein"], "174 kcal", "0.87 kcal/ml", "21.0 g", "1.0 g", "21.3 g", "105 mg", "0 mg", "215 mg", "200 ml", "Standard Dilution: 6 leveled scoops (50g) in 150ml water"),
  createPreparation("RESOURCE OPTI", "Standard", "Nestle-Dr Reddy", ["Low Sodium", "Low Protein"], "215 kcal", "0.95 kcal/ml", "10.0 g", "7.5 g", "28.0 g", "113 mg", "237 mg", "150 mg", "225 ml", "Standard Dilution: 6 leveled scoops (50g) in 190ml water"),
  createPreparation("RESOURCE Renal", "Low Protein", "Nestle-Dr Reddy", ["Low Sodium", "Low Protein", "High Cal Density"], "224 kcal", "1.61 kcal/ml", "6.0 g", "8.0 g", "33.2 g", "71 mg", "150 mg", "72 mg", "139 ml", "Standard Dilution: 6 leveled scoops (50g) in 90ml water"),
];

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

const sharedParameterGroups = [
  ["nutric-age", "glim-age"],
  ["bmi", "must-bmi", "glim-bmi"],
  ["weight-loss", "must-weight-loss", "glim-weight-loss"],
];

function getElement(id) {
  return document.getElementById(id);
}

function isFieldComplete(id) {
  const field = getElement(id);
  return Boolean(field && field.value !== "");
}

function areFieldsComplete(ids) {
  return ids.every(isFieldComplete);
}

function syncSharedParameter(sourceId, value) {
  const group = sharedParameterGroups.find((ids) => ids.includes(sourceId));

  if (!group) {
    return;
  }

  group.forEach((id) => {
    if (id !== sourceId) {
      const input = getElement(id);
      if (input && input.value !== value) {
        input.value = value;
      }
    }
  });
}

function getTagClass(tag) {
  return `tag-${tag.toLowerCase().replace(/\s+/g, "-")}`;
}

function renderEnteralPreparations() {
  productGrid.innerHTML = enteralPreparations
    .slice()
    .sort((first, second) => first.name.localeCompare(second.name))
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-card-header">
            <div>
              <h3>${product.name}</h3>
              <p>${product.type} &bull; ${product.manufacturer}</p>
            </div>
            <div class="product-tags">
              ${product.tags
                .map((tag) => `<span class="${getTagClass(tag)}">${tag}</span>`)
                .join("")}
            </div>
          </div>
          <div class="constituent-grid">
            ${product.constituents
              .map(
                (item) => `
                  <div class="constituent-tile ${item.highlight ? "featured" : ""}">
                    <span>${item.label}</span>
                    <strong>${item.value}</strong>
                  </div>
                `
              )
              .join("")}
          </div>
          <p class="dilution-note">${product.dilution}</p>
        </article>
      `
    )
    .join("");
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
  const muac = getNumber("muac");
  const baseWeight = sex === "male" ? 50 : 45.5;
  const idealBodyWeight = baseWeight + 2.3 * (heightIn - 60);
  const predictedBodyWeight = baseWeight + 0.91 * (heightCm - 152.4);
  const bmiFromMuac = muac > 0 ? 1.01 * muac - 4.7 : null;
  const bmiFromActualWeight =
    actualWeight > 0 ? actualWeight / (heightCm / 100) ** 2 : null;
  const bmi = bmiFromMuac || bmiFromActualWeight;

  pathwayState.patient = {
    sex,
    heightCm: roundToOneDecimal(heightCm),
    heightIn: roundToOneDecimal(heightIn),
    idealBodyWeight: roundToOneDecimal(idealBodyWeight),
    predictedBodyWeight: roundToOneDecimal(predictedBodyWeight),
    muac: muac > 0 ? roundToOneDecimal(muac) : null,
    bmiSource: bmiFromMuac ? "MUAC" : bmiFromActualWeight ? "actual body weight" : null,
    bmi: bmi ? roundToOneDecimal(bmi) : null,
  };

  return pathwayState.patient;
}

function copyBmiToEmptyNutritionFields(bmi) {
  if (!bmi) {
    return;
  }

  const bmiValue = String(bmi);
  getElement("bmi").value = bmiValue;
  syncSharedParameter("bmi", bmiValue);
}

function renderPatientDataResults(patient) {
  copyBmiToEmptyNutritionFields(patient.bmi);

  const bmiText = patient.bmi
    ? `<p><strong>BMI:</strong> ${patient.bmi} kg/m2 from ${patient.bmiSource}. ${
        patient.muac ? `MUAC used: ${patient.muac} cm.` : ""
      }</p>`
    : "<p><strong>BMI:</strong> Add MUAC or actual body weight to calculate BMI.</p>";

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

const nutritionScoringTools = [
  {
    label: "NUTRIC / mNUTRIC",
    requiredFields: ["nutric-age", "apache", "sofa", "comorbidities", "hospital-days"],
    score: scoreNutric,
  },
  {
    label: "NRS-2002",
    requiredFields: ["nutric-age", "bmi", "weight-loss", "intake", "disease-severity"],
    score: scoreNrs2002,
  },
  {
    label: "MUST",
    requiredFields: ["must-bmi", "must-weight-loss", "must-acute-disease"],
    score: scoreMust,
  },
  {
    label: "GLIM",
    requiredFields: [
      "glim-age",
      "glim-bmi",
      "glim-weight-loss",
      "glim-weight-loss-timeframe",
      "glim-muscle",
      "glim-intake",
      "glim-inflammation",
    ],
    score: scoreGlim,
  },
  {
    label: "SGA",
    requiredFields: [
      "sga-weight",
      "sga-intake",
      "sga-symptoms",
      "sga-function",
      "sga-physical",
    ],
    score: scoreSga,
  },
];

function calculateNutrition() {
  const completedTools = nutritionScoringTools.filter((tool) =>
    areFieldsComplete(tool.requiredFields)
  );
  const scores = completedTools.map((tool) => tool.score());
  const skippedTools = nutritionScoringTools
    .filter((tool) => !areFieldsComplete(tool.requiredFields))
    .map((tool) => tool.label);
  const highRiskCount = scores.filter((score) => score.risk === "high").length;
  const summary = scores.length
    ? highRiskCount > 0
      ? "Overall nutrition priority: high. Complete GI function assessment before choosing route."
      : "Overall nutrition priority: moderate/standard. Continue to GI function assessment."
    : "Complete all variables for at least one scoring tool to continue.";

  pathwayState.nutrition = { scores, skippedTools, summary };
  return pathwayState.nutrition;
}

function renderNutritionResults(results) {
  if (results.scores.length === 0) {
    nutritionResults.innerHTML = `
      <h3>Nutrition Assessment Incomplete</h3>
      <p>Fill all variables for at least one scoring tool to calculate a result and continue.</p>
    `;
    nutritionResults.classList.remove("hidden");
    completeAssessment.classList.add("hidden");
    return;
  }

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
  const skippedText = results.skippedTools.length
    ? `<p class="summary">Incomplete tools skipped: ${results.skippedTools.join(", ")}.</p>`
    : "";

  nutritionResults.innerHTML = `
    <h3>Nutrition Assessment Results</h3>
    <div class="mini-result-grid">${scoreCards}</div>
    <p class="summary">${results.summary}</p>
    ${skippedText}
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
    <p class="summary">Suggested day-based advancement: gradually increase the intake to target 70% by day 3 if tolerated.</p>
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

  productLibrary.classList.remove("hidden");
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
  productLibrary.classList.add("hidden");
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

Array.from(new Set(sharedParameterGroups.flat())).forEach((id) => {
  const input = getElement(id);
  if (input) {
    input.addEventListener("input", () => syncSharedParameter(id, input.value));
  }
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
  productLibrary.classList.add("hidden");
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
  productLibrary.classList.add("hidden");
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

renderEnteralPreparations();

restart.addEventListener("click", () => {
  resetFlow();
  window.scrollTo({ top: 0, behavior: "smooth" });
});
