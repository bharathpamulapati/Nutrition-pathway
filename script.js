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

const enteralPlanner = document.getElementById("enteral-planner");
const enteralPhaseSelector = document.getElementById("enteral-phase-selector");
const enteralPhaseButtons = document.querySelectorAll(".enteral-phase-btn");
const enteralDayForm = document.getElementById("enteral-day-form");
const icuDayInput = document.getElementById("icu-day");
const enteralTargetControls = document.getElementById("enteral-target-controls");
const enteralTargetResults = document.getElementById("enteral-target-results");
const enteralIbw = document.getElementById("enteral-ibw");
const caloriePercent = document.getElementById("calorie-percent");
const caloriePercentValue = document.getElementById("calorie-percent-value");
const proteinTarget = document.getElementById("protein-target");
const proteinTargetValue = document.getElementById("protein-target-value");
const caloriePercentNote = document.getElementById("calorie-percent-note");
const calorieTargetMin = document.getElementById("calorie-target-min");
const calorieTargetMax = document.getElementById("calorie-target-max");
const calorieTargetRangeValue = document.getElementById("calorie-target-range-value");
const calorieRangeFill = document.getElementById("calorie-range-fill");

const CALORIE_KG_RANGE_MIN = 15;
const CALORIE_KG_RANGE_MAX = 35;
const productLibrary = document.getElementById("product-library");
const prepLibraryToggle = document.getElementById("prep-library-toggle");
const prepLibraryContent = document.getElementById("prep-library-content");
const productFilterSummary = document.getElementById("product-filter-summary");
const productGrid = document.getElementById("product-grid");
const productDetailPanel = document.getElementById("product-detail-panel");
const compareSelectionCount = document.getElementById("compare-selection-count");
const compareProducts = document.getElementById("compare-products");
const compareModal = document.getElementById("compare-modal");
const compareTableWrap = document.getElementById("compare-table-wrap");
const closeCompare = document.getElementById("close-compare");
const feedConfigurator = document.querySelector(".feed-configurator");
const feedProductName = document.getElementById("feed-product-name");
const feedDilution = document.getElementById("feed-dilution");
const feedHours = document.getElementById("feed-hours");
const feedRate = document.getElementById("feed-rate");
const feedRateValue = document.getElementById("feed-rate-value");
const feedConfigSummary = document.getElementById("feed-config-summary");
const feedTargetAnalysis = document.getElementById("feed-target-analysis");
const feedSchedule = document.getElementById("feed-schedule");
const feedInstruction = document.getElementById("feed-instruction");
const generatePrescription = document.getElementById("generate-prescription");
const dietPrescription = document.getElementById("diet-prescription");
const proteinDeficitPanel = document.getElementById("protein-deficit-panel");
const proteinDeficitSummary = document.getElementById("protein-deficit-summary");
const proteinSupplementPanel = document.getElementById("protein-supplement-panel");
const proteinSupplementIntro = document.getElementById("protein-supplement-intro");
const proteinSupplementSelect = document.getElementById("protein-supplement-select");
const proteinSupplementMode = document.getElementById("protein-supplement-mode");
const supplementConstituentsWrap = document.getElementById("supplement-constituents-wrap");
const supplementFeedControls = document.getElementById("supplement-feed-controls");
const supplementModeNote = document.getElementById("supplement-mode-note");
const supplementFeedHours = document.getElementById("supplement-feed-hours");
const supplementFeedRate = document.getElementById("supplement-feed-rate");
const supplementFeedRateValue = document.getElementById("supplement-feed-rate-value");
const supplementFeedConfigSummary = document.getElementById("supplement-feed-config-summary");
const supplementFeedTargetAnalysis = document.getElementById("supplement-feed-target-analysis");
const supplementFeedSchedule = document.getElementById("supplement-feed-schedule");
const supplementFeedInstruction = document.getElementById("supplement-feed-instruction");
const combinedFeedPanel = document.getElementById("combined-feed-panel");
const combinedFeedTargetAnalysis = document.getElementById("combined-feed-target-analysis");
const combinedFeedScheduleOutput = document.getElementById("combined-feed-schedule-output");
const prescriptionReadyNote = document.getElementById("prescription-ready-note");

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

const CELEVIDA_PRODUCT_NAME = "CELEVIDA EN";
const CELEVIDA_FEED_CALORIES = 220;

function getCelevidaVariantMetrics(variantKey) {
  const densityKcalPerMl = Number(variantKey);
  const exactVolumeMl = CELEVIDA_FEED_CALORIES / densityKcalPerMl;
  const wholePart = Math.floor(exactVolumeMl);
  const decimalPart = exactVolumeMl - wholePart;
  const volumeMl = decimalPart > 0.5 ? wholePart + 1 : wholePart;
  const calDensity =
    variantKey === "1" || variantKey === "2"
      ? `${densityKcalPerMl.toFixed(2)} kcal/ml`
      : `${variantKey} kcal/ml`;
  const totalVolume = `${volumeMl} ml`;

  return { calDensity, totalVolume, volumeMl, densityKcalPerMl };
}

function createCelevidaPreparation() {
  return {
    name: CELEVIDA_PRODUCT_NAME,
    isCelevida: true,
    type: "Standard",
    manufacturer: "Nestle-Dr Reddy",
    variants: [
      {
        key: "1",
        label: "1 Kcal/mL",
        dilution: "Standard Dilution: 2 leveled scoops (50g) in 200ml water",
        tags: ["Low Protein"],
      },
      {
        key: "1.52",
        label: "1.52 Kcal/mL",
        dilution: "Standard Dilution: 2 leveled scoops (50g) in 125ml water",
        tags: ["Low Protein"],
      },
      {
        key: "1.69",
        label: "1.69 Kcal/mL",
        dilution: "Standard Dilution: 2 leveled scoops (50g) in 110ml water",
        tags: ["Low Protein", "High Cal Density"],
      },
      {
        key: "2",
        label: "2 Kcal/mL",
        dilution: "Standard Dilution: 2 leveled scoops (50g) in 90ml water",
        tags: ["Fluid Restriction", "Low Protein", "High Cal Density"],
      },
    ],
  };
}

function resolveCelevidaProduct(product, variantKey) {
  const variant =
    product.variants.find((item) => item.key === variantKey) || product.variants[0];
  const { calDensity, totalVolume } = getCelevidaVariantMetrics(variant.key);

  return {
    name: product.name,
    isCelevida: true,
    type: product.type,
    manufacturer: product.manufacturer,
    variantKey: variant.key,
    variantLabel: variant.label,
    tags: variant.tags,
    dilution: variant.dilution,
    constituents: [
      { label: "Calories", value: "220 kcal" },
      { label: "Cal Density", value: calDensity, highlight: true },
      { label: "Protein", value: "10.5 g" },
      { label: "Fat", value: "8.0 g" },
      { label: "CHO", value: "26.0 g" },
      { label: "Sodium", value: "218 mg" },
      { label: "Potassium", value: "137 mg" },
      { label: "Phosphorus", value: "87 mg" },
      { label: "Total Volume", value: totalVolume },
    ],
  };
}

function findEnteralProductByName(name) {
  if (!name) {
    return null;
  }

  const direct = enteralPreparations.find((product) => product.name === name);
  if (direct) {
    return direct;
  }

  if (/^CELEVIDA EN - /i.test(name)) {
    return enteralPreparations.find((product) => product.isCelevida) || null;
  }

  return null;
}

function resolveProductForUse(product, variantKey = celevidaSelectedVariantKey) {
  if (product?.isCelevida) {
    return resolveCelevidaProduct(product, variantKey);
  }

  return product;
}

function normalizeCompareProductNames(names) {
  return names
    .map((name) => (/^CELEVIDA EN - /i.test(name) ? CELEVIDA_PRODUCT_NAME : name))
    .filter((name, index, list) => list.indexOf(name) === index);
}

function syncCelevidaVariantFromLegacyName(name) {
  const match = name?.match(/^CELEVIDA EN - ([\d.]+)\s*Kcal\/ml/i);
  if (match) {
    celevidaSelectedVariantKey = match[1];
    return CELEVIDA_PRODUCT_NAME;
  }
  return name;
}

const enteralPreparations = [
  createPreparation("ALBUWISE", "Standard", "Nucgnex", ["Low Sodium", "High Protein", "Low Cal Density"], "129 kcal", "0.65 kcal/ml", "18.3 g", "3.0 g", "7.2 g", "137 mg", "116 mg", "29 mg", "200 ml", "Standard Dilution: 3 levelled scoops (30g) in 180ml water"),
  createCelevidaPreparation(),
  createPreparation("CELNUTRA 1.0", "Standard", "Nucgnex", ["Low Sodium", "Low Protein"], "210 kcal", "1.00 kcal/ml", "10.5 g", "7.0 g", "24.3 g", "36 mg", "105 mg", "100 mg", "210 ml", "Standard Dilution: 5 leveled scoops (50g) in 170ml water"),
  createPreparation("CELNUTRA 2.0", "Standard", "Nucgnex", ["Low Sodium", "Fluid Restriction", "High Protein", "High Cal Density"], "245 kcal", "2.23 kcal/ml", "18.0 g", "8.9 g", "23.1 g", "67 mg", "105 mg", "71 mg", "110 ml", "Standard Dilution: 5 levelled scoops (50g) in 70ml water"),
  createPreparation("CELNUTRA DM 1.5", "Standard", "Nucgnex", ["Low Sodium", "Low Protein", "High Cal Density"], "230 kcal", "1.53 kcal/ml", "12.0 g", "10.0 g", "20.5 g", "100 mg", "175 mg", "160 mg", "150 ml", "Standard Dilution: 5 levelled scoops (50g) in 125ml water"),
  createPreparation("ENSURE DM", "Diabetes", "Abbott", ["Low Cal Density"], "215.17 kcal", "0.91 kcal/ml", "10.47 g", "7.6 g", "22.03 g", "168.8 mg", "295.92 mg", "134.41 mg", "237 ml", "Standard Dilution: 6 levelled scoops (52.1g) in 200ml water"),
  createPreparation("ENSURE PLUS", "Standard", "Abbott", ["Low Sodium", "Low Protein"], "236.5 kcal", "1.02 kcal/ml", "10.4 g", "6.5 g", "33.0 g", "150 mg", "314 mg", "122 mg", "231 ml", "Standard Dilution: 6 leveled scoops (55g) in 190ml water"),
  createPreparation("FRESUBIN DM", "Diabetes", "Fresenius Kabi", ["Low Sodium", "Low Protein"], "223 kcal", "1.02 kcal/ml", "10.1 g", "10.0 g", "24.9 g", "180 mg", "300 mg", "150 mg", "218 ml", "Standard Dilution: 4 leveled scoops (50g) in 170ml water"),
  createPreparation("FRESUBIN HP", "High Protein", "Fresenius Kabi", ["Low Sodium", "Fluid Restriction", "Low Protein", "High Cal Density"], "200 kcal", "2.00 kcal/ml", "9.0 g", "10.5 g", "18.5 g", "63 mg", "99 mg", "63 mg", "100 ml", "Standard Dilution: 3 leveled scoops (42g) in 60ml water"),
  createPreparation("HINEX DM", "Diabetic", "Otsuka", ["Low Sodium", "Low Protein"], "228 kcal", "1.14 kcal/ml", "11.4 g", "10.1 g", "25.3 g", "152 mg", "266 mg", "135 mg", "200 ml", "Standard Dilution: 4 leveled scoops (50g) in 190ml water"),
  createPreparation("HINEX HP", "High Protein", "Otsuka", ["Low Sodium", "Low Protein", "Low Cal Density"], "89 kcal", "0.45 kcal/ml", "11.3 g", "0.3 g", "11.4 g", "60 mg", "190 mg", "63 mg", "200 ml", "Standard Dilution: 2 leveled scoops (25g) in 150ml water"),
  createPreparation("HINEX ST", "Standard", "Otsuka", ["Low Sodium", "Low Protein"], "224 kcal", "1.12 kcal/ml", "9.5 g", "8.0 g", "29.4 g", "155 mg", "254 mg", "127 mg", "200 ml", "Standard Dilution: 4 leveled scoops (50g) in 185ml water"),
  createPreparation("HINEX ST PLUS", "Probiotic", "Otsuka", ["Low Sodium", "Low Protein"], "220 kcal", "1.10 kcal/ml", "11.0 g", "7.5 g", "28.3 g", "162 mg", "267 mg", "125 mg", "200 ml", "Standard Dilution: 4 leveled scoops (50g) in 180ml water"),
  createPreparation("KABIPRO", "KABIPRO", "Fresenius Kabi", ["Low Sodium", "Low Protein", "Low Cal Density"], "88 kcal", "0.40 kcal/ml", "10.1 g", "0.7 g", "10.8 g", "55 mg", "164 mg", "94 mg", "220 ml", "Standard Dilution: 2 leveled scoops (24g) in 200ml water"),
  createPreparation("PentaSure 2.0", "High Calorie, High Protein", "Pentasure", ["Low Sodium", "Fluid Restriction", "High Protein", "High Cal Density"], "243 kcal", "2.25 kcal/ml", "18.7 g", "8.6 g", "23.2 g", "68 mg", "113 mg", "81 mg", "108 ml", "Standard Dilution: 4 level scoops (54g) in 65 ml water"),
  createPreparation("PentaSure CRITIPEP", "Peptide diet", "Pentasure", ["Low Sodium", "Low Protein"], "99 kcal", "0.97 kcal/ml", "4.0 g", "4.5 g", "10.5 g", "30 mg", "128 mg", "70 mg", "102 ml", "Standard Dilution: 2 heaped scoops (20g) in 85ml water"),
  createPreparation("PentaSure DLS", "Dialysis", "Pentasure", ["Low Sodium", "Fluid Restriction", "Low Protein", "High Cal Density"], "413.3 kcal", "2.07 kcal/ml", "21 g", "20.8 g", "35.5 g", "117.6 mg", "197 mg", "119 mg", "200 ml", "Standard Dilution: 8 heaped scoops (84g) in 132ml water"),
  createPreparation("PentaSure DM", "Diabetes", "Pentasure", ["Low Sodium", "Low Protein"], "229 kcal", "0.97 kcal/ml", "11.3 g", "9.3 g", "25.0 g", "150 mg", "225 mg", "163 mg", "237 ml", "Standard Dilution: 4 level scoops (50g) in 200ml water"),
  createPreparation("PentaSure Hepatic", "Hepatic", "Pentasure", ["Low Sodium", "Low Protein", "High Cal Density"], "207 kcal", "1.50 kcal/ml", "8.8 g", "4.5 g", "32.5 g", "120 mg", "180 mg", "100 mg", "138 ml", "Standard Dilution: 4 heaped scoops (50g) in 100ml water"),
  createPreparation("PentaSure HP", "High Protein", "Pentasure", ["Low Sodium"], "116 kcal", "0.81 kcal/ml", "13.5 g", "1.0 g", "13.2 g", "180 mg", "240 mg", "171 mg", "144 ml", "Standard Dilution: 2 level scoops (30g) in 120ml water"),
  createPreparation("PentaSure Renal", "Low protein", "Pentasure", ["Low Sodium", "Low Protein", "High Cal Density"], "398.1 kcal", "1.99 kcal/ml", "10.92 g", "18.48 g", "47.04 g", "84 mg", "100.8 mg", "126 mg", "200 ml", "Standard Dilution: 8 heaped scoops (84g) in 132ml water"),
  createPreparation("PEPTAMEN ADULT", "Peptide", "Nestle-Dr Reddy", ["Low Protein"], "258 kcal", "1.03 kcal/ml", "10.1 g", "9.9 g", "32.2 g", "204 mg", "374 mg", "140 mg", "250 ml", "Standard Dilution: 7 leveled scoops (55g) in 210ml water"),
  createPreparation("RESOURCE Dialysis", "Dialysis", "Nestle-Dr Reddy", ["Low Sodium", "High Cal Density"], "217 kcal", "1.56 kcal/ml", "13.5 g", "8.2 g", "23.6 g", "73 mg", "173 mg", "116 mg", "139 ml", "Standard Dilution: 6 leveled scoops (50g) in 90ml water"),
  createPreparation("RESOURCE Diabetic", "Diabetic", "Nestle-Dr Reddy", ["Low Sodium", "Low Protein"], "230 kcal", "1.00 kcal/ml", "11 g", "9.5 g", "25.5 g", "112.5 mg", "225 mg", "100 mg", "231 ml", "Standard Dilution: 6 levelled scoops (50g) in 190ml water"),
  createPreparation("RESOURCE HP", "High Protein", "Nestle-Dr Reddy", ["Low Sodium", "High Protein"], "174 kcal", "0.87 kcal/ml", "21.0 g", "1.0 g", "21.3 g", "105 mg", "0 mg", "215 mg", "200 ml", "Standard Dilution: 6 leveled scoops (50g) in 150ml water"),
  createPreparation("RESOURCE OPTI", "Standard", "Nestle-Dr Reddy", ["Low Sodium", "Low Protein"], "215 kcal", "0.95 kcal/ml", "10.0 g", "7.5 g", "28.0 g", "113 mg", "237 mg", "150 mg", "225 ml", "Standard Dilution: 6 leveled scoops (50g) in 190ml water"),
  createPreparation("RESOURCE Renal", "Low Protein", "Nestle-Dr Reddy", ["Low Sodium", "Low Protein", "High Cal Density"], "233 kcal", "1.69 kcal/ml", "6 g", "10 g", "29.75 g", "125 mg", "207 mg", "72.5 mg", "138 ml", "Standard Dilution: 6 levelled scoops (50g) in 100ml water"),
];

let selectedFeedProductName = null;
let selectedCompareProductNames = [];
let celevidaSelectedVariantKey = "1";
let activeProductCardName = null;
const productFilterDefinitions = {
  "low-sodium": "Low Sodium",
  "high-sodium": "High Sodium",
  "low-cal-density": "Low Cal Density",
  "high-cal-density": "High Cal Density",
  "low-protein": "Low Protein",
  "high-protein": "High Protein",
  "fluid-restriction": "Fluid Restriction",
};

const pathwayState = {
  patient: null,
  nutrition: null,
  gi: null,
  enteralPhase: null,
  enteralPlan: null,
  feedConfig: null,
  supplementFeedConfig: null,
  proteinSupplementSelection: null,
  dietPrescription: null,
  dietPrescriptionText: null,
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
  ["nutric-age", "nrs-age", "glim-age"],
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

function getSortedPreparations() {
  return enteralPreparations
    .slice()
    .sort((first, second) => first.name.localeCompare(second.name));
}

function getSelectedFeedProduct() {
  const product = findEnteralProductByName(selectedFeedProductName) || getSortedPreparations()[0];
  return resolveProductForUse(product);
}

function parseConstituentNumber(value) {
  return Number.parseFloat(value);
}

function getConstituentNumber(product, label) {
  const item = product.constituents.find((constituent) => constituent.label === label);
  return item ? parseConstituentNumber(item.value) : 0;
}

function getSelectedProductFilters() {
  return Array.from(document.querySelectorAll('input[name="product-filter"]:checked')).map(
    (input) => input.value
  );
}

function getProductFilterTags(product) {
  const sodium = getConstituentNumber(product, "Sodium");
  const calorieDensity = getConstituentNumber(product, "Cal Density");
  const protein = getConstituentNumber(product, "Protein");
  const tags = [];

  if (sodium < 100) {
    tags.push("Low Sodium");
  } else if (sodium > 200) {
    tags.push("High Sodium");
  }

  if (calorieDensity < 1) {
    tags.push("Low Cal Density");
  } else if (calorieDensity >= 2) {
    tags.push("High Cal Density");
    tags.push("Fluid Restriction");
  }

  if (protein < 10) {
    tags.push("Low Protein");
  } else if (protein > 15) {
    tags.push("High Protein");
  }

  return tags;
}

function productMatchesFilter(product, filter) {
  return getProductFilterTags(product).includes(productFilterDefinitions[filter]);
}

function productMatchesCompositionFilters(product, selectedFilters) {
  const filterGroups = {
    sodium: ["low-sodium", "high-sodium"],
    calorieDensity: ["low-cal-density", "high-cal-density"],
    protein: ["low-protein", "high-protein"],
    fluidRestriction: ["fluid-restriction"],
  };

  return Object.values(filterGroups).every((group) => {
    const activeGroupFilters = group.filter((filter) => selectedFilters.includes(filter));

    if (activeGroupFilters.length === 0) {
      return true;
    }

    return activeGroupFilters.some((filter) => productMatchesFilter(product, filter));
  });
}

function productMatchesSelectedFilters(product, selectedFilters) {
  if (selectedFilters.length === 0) {
    return true;
  }

  if (product.isCelevida && product.variants) {
    return product.variants.some((variant) =>
      productMatchesCompositionFilters(
        resolveCelevidaProduct(product, variant.key),
        selectedFilters
      )
    );
  }

  return productMatchesCompositionFilters(product, selectedFilters);
}

function getFilteredPreparations() {
  const selectedFilters = getSelectedProductFilters();
  return getSortedPreparations().filter((product) =>
    productMatchesSelectedFilters(product, selectedFilters)
  );
}

function updateProductFilterSummary(products) {
  const selectedFilters = getSelectedProductFilters();

  if (selectedFilters.length === 0) {
    productFilterSummary.textContent = "No filters selected. Showing all preparations.";
    return;
  }

  const filterNames = selectedFilters.map((filter) => productFilterDefinitions[filter]).join(", ");
  productFilterSummary.textContent = `Filters selected: ${filterNames}. Showing ${products.length} matching preparation${
    products.length === 1 ? "" : "s"
  }.`;
}

function updateCompareControls() {
  const selectedCount = selectedCompareProductNames.length;
  compareSelectionCount.textContent =
    selectedCount === 0
      ? "Select any 4 preparations to compare."
      : `${selectedCount} of 4 preparations selected for comparison.`;
  compareProducts.disabled = selectedCount !== 4;
}

function getCompareRows() {
  return [
    { label: "Type", getValue: (product) => product.type },
    { label: "Manufacturer", getValue: (product) => product.manufacturer },
    ...[
      "Calories",
      "Cal Density",
      "Protein",
      "Fat",
      "CHO",
      "Sodium",
      "Potassium",
      "Phosphorus",
      "Total Volume",
    ].map((label) => ({
      label: getDisplayConstituentLabel(label),
      getValue: (product) => product.constituents.find((item) => item.label === label)?.value || "-",
    })),
    { label: "Standard dilution", getValue: (product) => product.dilution },
  ];
}

function renderComparisonModal() {
  const products = selectedCompareProductNames
    .map((name) => {
      const product = findEnteralProductByName(name);
      if (!product) {
        return null;
      }
      if (product.isCelevida && name === CELEVIDA_PRODUCT_NAME) {
        return resolveCelevidaProduct(product, celevidaSelectedVariantKey);
      }
      if (product.isCelevida && /^CELEVIDA EN - /i.test(name)) {
        const legacyMatch = name.match(/([\d.]+)\s*Kcal\/ml/i);
        const legacyKey = legacyMatch ? legacyMatch[1] : celevidaSelectedVariantKey;
        return resolveCelevidaProduct(product, legacyKey);
      }
      return product;
    })
    .filter(Boolean);

  if (products.length !== 4) {
    return;
  }

  const rows = getCompareRows()
    .map((row) => {
      const values = products.map(row.getValue);
      const hasDifference = new Set(values).size > 1;
      return `
        <tr class="${hasDifference ? "comparison-difference" : ""}">
          <th scope="row">${row.label}</th>
          ${values.map((value) => `<td>${value}</td>`).join("")}
        </tr>
      `;
    })
    .join("");

  compareTableWrap.innerHTML = `
    <table class="compare-table">
      <thead>
        <tr>
          <th scope="col">Parameter</th>
          ${products
            .map((product) => {
              const columnName = product.variantLabel
                ? `${product.name} (${product.variantLabel})`
                : product.name;
              return `<th scope="col">${columnName}</th>`;
            })
            .join("")}
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
  compareModal.classList.remove("hidden");
}

function formatNumber(value, decimals = 1) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return "Not set";
  }

  return Number.isInteger(numericValue)
    ? numericValue.toString()
    : numericValue.toFixed(decimals);
}

function formatRange(min, max, unit = "") {
  const suffix = unit ? ` ${unit}` : "";
  return `${formatNumber(min)}-${formatNumber(max)}${suffix}`;
}

function getDilutionLabel(multiplier) {
  if (multiplier === 0.5) {
    return "Half standard";
  }

  if (multiplier === 2) {
    return "Double standard";
  }

  return "Standard";
}

function getDisplayConstituentLabel(label) {
  return label === "Cal Density" ? "Calorie density" : label;
}

function renderConstituentTile(item) {
  return `
    <div class="constituent-tile ${item.highlight ? "featured" : ""}">
      <span>${getDisplayConstituentLabel(item.label)}</span>
      <strong>${item.value}</strong>
    </div>
  `;
}

function renderCelevidaDensityControl(product) {
  return `
    <label class="celevida-density-control">
      Calorie density
      <select class="celevida-density-select" aria-label="CELEVIDA EN calorie density">
        ${product.variants
          .map(
            (variant) => `
              <option value="${variant.key}" ${
                variant.key === celevidaSelectedVariantKey ? "selected" : ""
              }>${variant.label}</option>
            `
          )
          .join("")}
      </select>
    </label>
  `;
}

function renderProductDetailContent(product, displayProduct, detailsId) {
  const mainLabels = ["Calories", "Cal Density", "Protein", "Total Volume"];
  const mainConstituents = displayProduct.constituents.filter((item) =>
    mainLabels.includes(item.label)
  );
  const extraConstituents = displayProduct.constituents.filter(
    (item) => !mainLabels.includes(item.label)
  );

  return `
    <p class="product-detail-hint">Click this panel to configure feeds for this preparation.</p>
    <div class="product-card-header">
      <div>
        <h3>${product.name}</h3>
        <p>${product.type} &bull; ${product.manufacturer}</p>
      </div>
      <div class="product-tags">
        ${getProductFilterTags(displayProduct)
          .map((tag) => `<span class="${getTagClass(tag)}">${tag}</span>`)
          .join("")}
      </div>
    </div>
    ${product.isCelevida ? renderCelevidaDensityControl(product) : ""}
    <label class="compare-select">
      <input
        type="checkbox"
        class="compare-product-checkbox"
        value="${product.name}"
        ${selectedCompareProductNames.includes(product.name) ? "checked" : ""}
      />
      Compare this preparation
    </label>
    <div class="constituent-grid">
      ${mainConstituents.map(renderConstituentTile).join("")}
    </div>
    <p class="dilution-note">${displayProduct.dilution}</p>
    <div id="${detailsId}" class="product-extra-details">
      <div class="constituent-grid">
        ${extraConstituents.map(renderConstituentTile).join("")}
      </div>
    </div>
  `;
}

function renderProductDetailPanel(productsToRender) {
  if (!productDetailPanel) {
    return;
  }

  if (
    activeProductCardName &&
    !productsToRender.some((product) => product.name === activeProductCardName)
  ) {
    activeProductCardName = null;
  }

  if (!activeProductCardName) {
    productDetailPanel.classList.add("hidden");
    productDetailPanel.innerHTML = "";
    productDetailPanel.dataset.productName = "";
    return;
  }

  const product = productsToRender.find((item) => item.name === activeProductCardName);
  if (!product) {
    productDetailPanel.classList.add("hidden");
    productDetailPanel.innerHTML = "";
    productDetailPanel.dataset.productName = "";
    return;
  }

  const displayProduct = product.isCelevida
    ? resolveCelevidaProduct(product, celevidaSelectedVariantKey)
    : product;

  productDetailPanel.classList.remove("hidden");
  productDetailPanel.dataset.productName = product.name;
  productDetailPanel.innerHTML = `
    <article class="product-detail-card selected-product">
      ${renderProductDetailContent(product, displayProduct, "product-detail-extra")}
    </article>
  `;
}

function renderEnteralPreparations() {
  const productsToRender = getFilteredPreparations();
  const visibleProductNames = productsToRender.map((product) => product.name);
  selectedCompareProductNames = normalizeCompareProductNames(
    selectedCompareProductNames.filter((name) => {
      if (name === CELEVIDA_PRODUCT_NAME) {
        return visibleProductNames.includes(name);
      }
      if (/^CELEVIDA EN - /i.test(name)) {
        return visibleProductNames.includes(CELEVIDA_PRODUCT_NAME);
      }
      return visibleProductNames.includes(name);
    })
  );
  updateProductFilterSummary(productsToRender);
  updateCompareControls();

  if (productsToRender.length === 0) {
    productGrid.innerHTML = `
      <article class="product-card empty-product-card">
        <h3>No matching preparations</h3>
        <p>Change or clear filters to view commercial enteral nutrition preparations.</p>
      </article>
    `;
    renderProductDetailPanel(productsToRender);
    return;
  }

  productGrid.innerHTML = productsToRender
    .map((product) => {
      const isActiveNameTile = activeProductCardName === product.name;

      return `
        <article
          class="product-card product-card-compact ${
            isActiveNameTile ? "product-name-tile-active" : ""
          }"
          data-product-name="${product.name}"
        >
          <div class="product-card-header product-name-tile">
            <div>
              <h3>${product.name}</h3>
              <p>${product.manufacturer}</p>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  renderProductDetailPanel(productsToRender);
}

function openFeedConfigurationForProduct(productName) {
  const normalizedName = syncCelevidaVariantFromLegacyName(productName);
  activeProductCardName = normalizedName;
  selectedFeedProductName = normalizedName;
  updateSelectedFeedProductName();
  renderEnteralPreparations();
  updateFeedConfiguration();
  feedConfigurator.classList.remove("hidden");
  feedConfigurator.scrollIntoView({ behavior: "smooth", block: "start" });
}

function updateSelectedFeedProductName() {
  if (!selectedFeedProductName) {
    feedProductName.textContent = "Select a product tile above";
    return;
  }

  const product = findEnteralProductByName(selectedFeedProductName);
  if (product?.isCelevida) {
    const resolved = resolveCelevidaProduct(product, celevidaSelectedVariantKey);
    feedProductName.textContent = `${resolved.name} (${resolved.variantLabel})`;
    return;
  }

  feedProductName.textContent = selectedFeedProductName;
}

function createSummaryTile(label, value, detail = "") {
  return `
    <article class="summary-metric-tile">
      <span>${label}</span>
      <strong>${value}</strong>
      ${detail ? `<small>${detail}</small>` : ""}
    </article>
  `;
}

function buildFeedConfigFromProduct(product, { dilutionMultiplier, hours, rate, role = "primary" }) {
  const baseCalDensity = getConstituentNumber(product, "Cal Density");
  const baseProtein = getConstituentNumber(product, "Protein");
  const baseVolume = getConstituentNumber(product, "Total Volume");
  const adjustedCalDensity = baseCalDensity * dilutionMultiplier;
  const adjustedProteinPerMl = (baseProtein / baseVolume) * dilutionMultiplier;
  const volumePerFeed = baseVolume / dilutionMultiplier;
  const timePerFeed = volumePerFeed / rate;
  const feedsPerDay = Math.ceil((rate * hours) / volumePerFeed);
  const totalVolumePerDay = rate * hours;
  const caloriesPerFeed = adjustedCalDensity * volumePerFeed;
  const proteinPerFeed = adjustedProteinPerMl * volumePerFeed;
  const deliveredCalories = adjustedCalDensity * totalVolumePerDay;
  const deliveredProtein = adjustedProteinPerMl * totalVolumePerDay;
  const plan = pathwayState.enteralPlan;
  const calorieTarget = plan?.fullCalories || null;
  const calorieTargetMinKcal = plan?.dayCaloriesMin ?? plan?.fullCaloriesMin ?? null;
  const calorieTargetMaxKcal = plan?.dayCaloriesMax ?? plan?.fullCaloriesMax ?? null;
  const proteinRequired = plan?.proteinGrams || null;

  return {
    role,
    selectedProduct: product,
    dilutionMultiplier,
    dilutionLabel: getDilutionLabel(dilutionMultiplier),
    manufacturerDilution: product.dilution,
    hours,
    rate,
    baseCalDensity,
    baseProtein,
    baseVolume,
    adjustedCalDensity,
    adjustedProteinPerMl,
    volumePerFeed,
    timePerFeed,
    feedsPerDay,
    totalVolumePerDay,
    caloriesPerFeed,
    proteinPerFeed,
    deliveredCalories,
    deliveredProtein,
    calorieTarget,
    calorieTargetMinKcal,
    calorieTargetMaxKcal,
    proteinRequired,
  };
}

function getFeedConfigurationData() {
  const selectedProduct = getSelectedFeedProduct();
  return buildFeedConfigFromProduct(selectedProduct, {
    dilutionMultiplier: Number(feedDilution.value),
    hours: Number(feedHours.value),
    rate: Number(feedRate.value),
    role: "primary",
  });
}

function getCalorieTargetLabel(config) {
  if (config.calorieTargetMinKcal == null || config.calorieTargetMaxKcal == null) {
    return "Set in planner";
  }

  return config.calorieTargetMinKcal === config.calorieTargetMaxKcal
    ? `${Math.round(config.calorieTargetMinKcal)} kcal/day`
    : `${Math.round(config.calorieTargetMinKcal)}-${Math.round(config.calorieTargetMaxKcal)} kcal/day`;
}

function getCalorieTargetPercent(config, deliveredCalories) {
  if (config.calorieTargetMinKcal == null || config.calorieTargetMaxKcal == null) {
    return "Complete Enteral Nutrition Target Planner";
  }

  const midTarget = (config.calorieTargetMinKcal + config.calorieTargetMaxKcal) / 2;
  return `${Math.round((deliveredCalories / midTarget) * 100)}% of day calorie target`;
}

function getProteinTargetPercent(config, deliveredProtein) {
  if (config.proteinRequired == null) {
    return "Complete Enteral Nutrition Target Planner";
  }

  return `${Math.round((deliveredProtein / config.proteinRequired) * 100)}% of protein target`;
}

function renderFeedConfigPanels(config, containers) {
  if (!config?.selectedProduct) {
    return;
  }

  containers.summary.innerHTML = [
    createSummaryTile("Dilution type", config.dilutionLabel),
    createSummaryTile(
      "Feeding hours",
      `${config.hours} hours`,
      config.hours === 18 ? "6AM-12AM" : "Continuous"
    ),
    createSummaryTile("Current rate", `${config.rate} mL/hour`),
    createSummaryTile("Time per feed", `${formatNumber(config.timePerFeed)} hours`),
  ].join("");

  containers.targetAnalysis.innerHTML = [
    createSummaryTile("Calorie target required", getCalorieTargetLabel(config)),
    createSummaryTile(
      "Calories delivered",
      `${Math.round(config.deliveredCalories)} kcal/day`,
      getCalorieTargetPercent(config, config.deliveredCalories)
    ),
    createSummaryTile(
      "Protein target required",
      config.proteinRequired ? `${formatNumber(config.proteinRequired)} g/day` : "Set in planner",
      ""
    ),
    createSummaryTile(
      "Protein delivered",
      `${formatNumber(config.deliveredProtein)} g/day`,
      getProteinTargetPercent(config, config.deliveredProtein)
    ),
  ].join("");

  containers.schedule.innerHTML = [
    createSummaryTile("Feeds per day", config.feedsPerDay),
    createSummaryTile(
      "Calories and protein per feed",
      `${Math.round(config.caloriesPerFeed)} kcal / ${formatNumber(config.proteinPerFeed)} g protein`
    ),
    createSummaryTile("Volume per feed", `${Math.round(config.volumePerFeed)} mL`),
    createSummaryTile("Total calories per day", `${Math.round(config.deliveredCalories)} kcal`),
    createSummaryTile("Total protein per day", `${formatNumber(config.deliveredProtein)} g`),
    createSummaryTile("Total feed volume per day", `${config.totalVolumePerDay} mL`),
  ].join("");

  if (containers.instruction) {
    containers.instruction.textContent = `Instruction: Prepare fresh feed every ${formatNumber(
      config.timePerFeed
    )} hours.`;
  }
}

function updateFeedConfiguration() {
  if (!selectedFeedProductName) {
    updateProteinDeficitAndSupplement(null);
    updateGeneratePrescriptionButton(false);
    return;
  }

  const feedConfig = getFeedConfigurationData();

  pathwayState.feedConfig = feedConfig;
  feedRateValue.textContent = feedConfig.rate;
  renderFeedConfigPanels(feedConfig, {
    summary: feedConfigSummary,
    targetAnalysis: feedTargetAnalysis,
    schedule: feedSchedule,
    instruction: feedInstruction,
  });

  updateProteinDeficitAndSupplement(feedConfig);

  if (!dietPrescription.classList.contains("hidden")) {
    renderDietPrescription(false);
  }
}

function resetFeedConfiguration() {
  selectedFeedProductName = null;
  activeProductCardName = null;
  celevidaSelectedVariantKey = "1";
  feedDilution.value = "1";
  feedHours.value = "18";
  feedRate.value = "20";
  dietPrescription.innerHTML = "";
  dietPrescription.classList.add("hidden");
  feedConfigurator.classList.add("hidden");
  pathwayState.dietPrescription = null;
  pathwayState.dietPrescriptionText = null;
  pathwayState.supplementFeedConfig = null;
  pathwayState.proteinSupplementSelection = null;
  if (proteinSupplementSelect) {
    proteinSupplementSelect.value = "";
  }
  if (proteinSupplementMode) {
    proteinSupplementMode.value = "";
    proteinSupplementMode.disabled = true;
  }
  if (supplementFeedRate) {
    supplementFeedRate.value = "20";
  }
  if (supplementFeedHours) {
    supplementFeedHours.value = "18";
  }
  if (supplementFeedRateValue) {
    supplementFeedRateValue.textContent = "20";
  }
  document.querySelectorAll('input[name="feed-schedule-mode"]').forEach((input) => {
    input.checked = false;
  });
  updateSelectedFeedProductName();
  renderEnteralPreparations();
  updateFeedConfiguration();
}

function resetPreparationLibrary() {
  prepLibraryContent.classList.add("hidden");
  compareModal.classList.add("hidden");
  selectedCompareProductNames = [];
  document.querySelectorAll('input[name="product-filter"]').forEach((input) => {
    input.checked = false;
  });
  resetFeedConfiguration();
}

function getPrescriptionPatientData() {
  const heightCm = pathwayState.patient?.heightCm || roundToOneDecimal(getHeightInCentimeters());
  const idealBodyWeight =
    pathwayState.patient?.idealBodyWeight || Number(enteralIbw.value) || null;
  const predictedBodyWeight = pathwayState.patient?.predictedBodyWeight || idealBodyWeight;

  return {
    heightCm,
    idealBodyWeight,
    predictedBodyWeight,
    calculationWeight: predictedBodyWeight || idealBodyWeight || 0,
  };
}

function getPrescriptionProductOptions() {
  const options = [];

  getSortedPreparations().forEach((product) => {
    if (product.isCelevida) {
      product.variants.forEach((variant) => {
        options.push({
          value: `${CELEVIDA_PRODUCT_NAME}|${variant.key}`,
          label: `${CELEVIDA_PRODUCT_NAME} (${variant.label})`,
        });
      });
      return;
    }

    options.push({
      value: product.name,
      label: product.name,
    });
  });

  return options;
}

function populateSupplementProductSelect() {
  if (!proteinSupplementSelect) {
    return;
  }

  const selection = pathwayState.proteinSupplementSelection?.productKey || "";
  const options = getPrescriptionProductOptions();

  proteinSupplementSelect.innerHTML = `
    <option value="">Select a formula</option>
    ${options
      .map(
        (option) =>
          `<option value="${option.value}" ${
            selection === option.value ? "selected" : ""
          }>${option.label}</option>`
      )
      .join("")}
  `;
}

function getProteinRangeTargets() {
  const patient = getPrescriptionPatientData();
  const proteinWeight = patient.idealBodyWeight || patient.calculationWeight;
  const plan = pathwayState.enteralPlan;

  return {
    proteinMin: proteinWeight * 1.2,
    proteinMax: proteinWeight * 1.5,
    proteinRequired: plan?.proteinGrams ?? proteinWeight * 1.2,
    calorieMin: plan?.dayCaloriesMin ?? plan?.fullCaloriesMin ?? null,
    calorieMax: plan?.dayCaloriesMax ?? plan?.fullCaloriesMax ?? null,
  };
}

function getProteinDeficitFromFeed(feedConfig) {
  const targets = getProteinRangeTargets();
  const extraProteinMin = Math.max(targets.proteinMin - feedConfig.deliveredProtein, 0);
  const extraProteinMax = Math.max(targets.proteinMax - feedConfig.deliveredProtein, 0);
  const hasDeficit = extraProteinMax > 0;

  return {
    hasDeficit,
    extraProteinMin,
    extraProteinMax,
    targets,
  };
}

function ensureProteinSupplementSelection() {
  if (!pathwayState.proteinSupplementSelection) {
    pathwayState.proteinSupplementSelection = {
      productKey: "",
      deliveryMode: "",
      rate: 20,
      hours: 18,
      scheduleMode: "",
    };
  }

  return pathwayState.proteinSupplementSelection;
}

function getSupplementFeedConfig() {
  const selection = ensureProteinSupplementSelection();
  const product = resolveSupplementProductFromKey(selection.productKey);

  if (!product || !selection.deliveryMode) {
    return null;
  }

  return buildFeedConfigFromProduct(product, {
    dilutionMultiplier: 1,
    hours: Number(selection.hours || supplementFeedHours?.value || 18),
    rate: Number(selection.rate || supplementFeedRate?.value || 20),
    role: "supplement",
  });
}

function getSupplementDeliveryModeLabel(mode) {
  if (mode === "separate") {
    return "Separate feed at manufacturer standard dilution";
  }

  if (mode === "powder") {
    return "Powder added to ongoing primary feed";
  }

  return "";
}

function resolveSupplementProductFromKey(productKey) {
  if (!productKey) {
    return null;
  }

  if (productKey.includes("|")) {
    const [name, variantKey] = productKey.split("|");
    const product = findEnteralProductByName(name);
    return product?.isCelevida ? resolveCelevidaProduct(product, variantKey) : null;
  }

  const product = findEnteralProductByName(productKey);
  return product ? resolveProductForUse(product) : null;
}

function getSupplementProductDisplayName(product) {
  if (!product) {
    return "";
  }

  if (product.isCelevida && product.variantLabel) {
    return `${product.name} (${product.variantLabel})`;
  }

  return product.name;
}

function renderSupplementConstituentPanel(product) {
  if (!supplementConstituentsWrap || !product) {
    return;
  }

  supplementConstituentsWrap.innerHTML = `
    <div class="supplement-constituent-panel">
      <h4>Selected supplement constituents</h4>
      <div class="constituent-grid supplement-constituent-grid">
        ${product.constituents
          .map((item) =>
            renderConstituentTile({
              ...item,
              highlight: item.label === "Protein" || item.highlight,
            })
          )
          .join("")}
      </div>
      <p class="dilution-note"><strong>Manufacturer standard dilution:</strong> ${product.dilution}</p>
    </div>
  `;
  supplementConstituentsWrap.classList.remove("hidden");
}

function getCombinedFeedTotals(primaryConfig, supplementConfig) {
  const combinedCalories =
    primaryConfig.deliveredCalories + (supplementConfig?.deliveredCalories || 0);
  const combinedProtein =
    primaryConfig.deliveredProtein + (supplementConfig?.deliveredProtein || 0);
  const combinedVolume =
    primaryConfig.totalVolumePerDay + (supplementConfig?.totalVolumePerDay || 0);

  return { combinedCalories, combinedProtein, combinedVolume };
}

function areCombinedTargetsMet(primaryConfig, supplementConfig, hasDeficit) {
  const targets = getProteinRangeTargets();
  const { combinedCalories, combinedProtein } = getCombinedFeedTotals(
    primaryConfig,
    supplementConfig
  );

  const proteinOk = combinedProtein >= targets.proteinRequired;
  const calorieOk =
    targets.calorieMin == null || targets.calorieMax == null
      ? true
      : combinedCalories >= targets.calorieMin && combinedCalories <= targets.calorieMax * 1.15;

  if (!hasDeficit) {
    return proteinOk && calorieOk;
  }

  return proteinOk && calorieOk && Boolean(supplementConfig);
}

function renderCombinedFeedSchedule(primaryConfig, supplementConfig, scheduleMode, selection) {
  const primaryName = getSupplementProductDisplayName(primaryConfig.selectedProduct);
  const supplementName = getSupplementProductDisplayName(supplementConfig.selectedProduct);
  const modeLabel = getSupplementDeliveryModeLabel(selection.deliveryMode);

  if (scheduleMode === "combined") {
    const { combinedCalories, combinedProtein, combinedVolume } = getCombinedFeedTotals(
      primaryConfig,
      supplementConfig
    );

    return `
      <div class="combined-schedule-card">
        <h4>Combined feed schedule (both formulas)</h4>
        <p><strong>Formula 1:</strong> ${primaryName} at ${primaryConfig.rate} mL/hour (${primaryConfig.dilutionLabel})</p>
        <p><strong>Formula 2:</strong> ${supplementName} at ${supplementConfig.rate} mL/hour (${modeLabel})</p>
        <p><strong>Combined volume per day:</strong> ${combinedVolume} mL</p>
        <p><strong>Combined calories per day:</strong> ${Math.round(combinedCalories)} kcal</p>
        <p><strong>Combined protein per day:</strong> ${formatNumber(combinedProtein)} g</p>
        <p class="summary">Prepare and administer each formula as prescribed; coordinate timing per ICU protocol.</p>
      </div>
    `;
  }

  return `
    <div class="separate-schedule-grid">
      <article class="schedule-formula-card">
        <h4>Formula 1 schedule — ${primaryName}</h4>
        <p>Rate: <strong>${primaryConfig.rate} mL/hour</strong></p>
        <p>Dilution: <strong>${primaryConfig.dilutionLabel}</strong></p>
        <p>Feeds per day: <strong>${primaryConfig.feedsPerDay}</strong></p>
        <p>Prepare fresh feed every <strong>${formatNumber(primaryConfig.timePerFeed)} hours</strong></p>
        <p>Volume per day: <strong>${primaryConfig.totalVolumePerDay} mL</strong></p>
      </article>
      <article class="schedule-formula-card supplement-card">
        <h4>Formula 2 schedule — ${supplementName}</h4>
        <p>Method: <strong>${modeLabel}</strong></p>
        <p>Rate: <strong>${supplementConfig.rate} mL/hour</strong></p>
        <p>Standard manufacturer dilution</p>
        <p>Feeds per day: <strong>${supplementConfig.feedsPerDay}</strong></p>
        <p>Prepare fresh feed every <strong>${formatNumber(supplementConfig.timePerFeed)} hours</strong></p>
        <p>Volume per day: <strong>${supplementConfig.totalVolumePerDay} mL</strong></p>
      </article>
    </div>
  `;
}

function updateCombinedFeedPanel(primaryConfig, deficitState) {
  const selection = ensureProteinSupplementSelection();
  const supplementConfig = pathwayState.supplementFeedConfig;
  const hasSupplementSetup = Boolean(
    supplementConfig && selection.productKey && selection.deliveryMode
  );

  if (!combinedFeedPanel) {
    return { targetsMet: false, scheduleReady: false };
  }

  if (!deficitState.hasDeficit || !hasSupplementSetup) {
    combinedFeedPanel.classList.add("hidden");
    return {
      targetsMet: areCombinedTargetsMet(primaryConfig, null, false),
      scheduleReady: !deficitState.hasDeficit,
    };
  }

  combinedFeedPanel.classList.remove("hidden");
  const { combinedCalories, combinedProtein, combinedVolume } = getCombinedFeedTotals(
    primaryConfig,
    supplementConfig
  );
  const targets = getProteinRangeTargets();
  const targetsMet = areCombinedTargetsMet(primaryConfig, supplementConfig, true);
  const calorieTargetLabel = getCalorieTargetLabel(primaryConfig);

  combinedFeedTargetAnalysis.innerHTML = [
    createSummaryTile("Day calorie target", calorieTargetLabel),
    createSummaryTile(
      "Combined calories delivered",
      `${Math.round(combinedCalories)} kcal/day`,
      getCalorieTargetPercent(primaryConfig, combinedCalories)
    ),
    createSummaryTile(
      "Protein target required",
      `${formatNumber(targets.proteinRequired)} g/day`,
      ""
    ),
    createSummaryTile(
      "Combined protein delivered",
      `${formatNumber(combinedProtein)} g/day`,
      `${Math.round((combinedProtein / targets.proteinRequired) * 100)}% of protein target`
    ),
    createSummaryTile("Combined feed volume per day", `${combinedVolume} mL`),
    createSummaryTile(
      "Formula 1 protein",
      `${formatNumber(primaryConfig.deliveredProtein)} g/day`,
      getSupplementProductDisplayName(primaryConfig.selectedProduct)
    ),
    createSummaryTile(
      "Formula 2 protein",
      `${formatNumber(supplementConfig.deliveredProtein)} g/day`,
      getSupplementProductDisplayName(supplementConfig.selectedProduct)
    ),
  ].join("");

  const scheduleMode = selection.scheduleMode;
  const scheduleReady = Boolean(scheduleMode);

  if (scheduleReady) {
    combinedFeedScheduleOutput.innerHTML = renderCombinedFeedSchedule(
      primaryConfig,
      supplementConfig,
      scheduleMode,
      selection
    );
  } else {
    combinedFeedScheduleOutput.innerHTML =
      '<p class="summary">Choose whether to show separate or combined feed schedules in the prescription.</p>';
  }

  if (targetsMet && scheduleReady) {
    prescriptionReadyNote.textContent =
      "Calorie and protein targets are met with both formulas. You can generate the final diet prescription.";
    prescriptionReadyNote.classList.add("ready");
  } else if (!targetsMet) {
    prescriptionReadyNote.textContent =
      "Adjust primary or supplement feeding rates until combined calorie and protein targets are met, then choose a feed schedule display.";
    prescriptionReadyNote.classList.remove("ready");
  } else {
    prescriptionReadyNote.textContent =
      "Select separate or combined feed schedule display, then generate the prescription.";
    prescriptionReadyNote.classList.remove("ready");
  }

  document.querySelectorAll('input[name="feed-schedule-mode"]').forEach((input) => {
    input.checked = input.value === scheduleMode;
  });

  return { targetsMet, scheduleReady: scheduleReady && targetsMet };
}

function updateProteinDeficitAndSupplement(primaryConfig) {
  if (!primaryConfig) {
    proteinDeficitPanel?.classList.add("hidden");
    proteinSupplementPanel?.classList.add("hidden");
    combinedFeedPanel?.classList.add("hidden");
    pathwayState.supplementFeedConfig = null;
    updateGeneratePrescriptionButton(false);
    return;
  }

  const deficitState = getProteinDeficitFromFeed(primaryConfig);
  const selection = ensureProteinSupplementSelection();

  if (!deficitState.hasDeficit) {
    pathwayState.proteinSupplementSelection = null;
    pathwayState.supplementFeedConfig = null;
    proteinDeficitPanel?.classList.add("hidden");
    proteinSupplementPanel?.classList.add("hidden");
    combinedFeedPanel?.classList.add("hidden");
    const targetsMet = areCombinedTargetsMet(primaryConfig, null, false);
    updateGeneratePrescriptionButton(targetsMet);
    return;
  }

  proteinDeficitPanel?.classList.remove("hidden");
  proteinDeficitSummary.innerHTML = [
    createSummaryTile(
      "Protein delivered (primary feed)",
      `${formatNumber(primaryConfig.deliveredProtein)} g/day`
    ),
    createSummaryTile(
      "Recommended protein intake",
      formatRange(deficitState.targets.proteinMin, deficitState.targets.proteinMax, "g/day")
    ),
    createSummaryTile(
      "Estimated protein deficit",
      formatRange(deficitState.extraProteinMin, deficitState.extraProteinMax, "g/day"),
      "Gap to close with supplement formula"
    ),
  ].join("");

  proteinSupplementPanel?.classList.remove("hidden");
  proteinSupplementIntro.textContent = `Estimated protein deficit: ${formatRange(
    deficitState.extraProteinMin,
    deficitState.extraProteinMax,
    "g protein per day"
  )}. Choose a supplement formula, administration method, and feeding rate below before generating the prescription.`;

  populateSupplementProductSelect();

  const product = resolveSupplementProductFromKey(selection.productKey);
  if (proteinSupplementMode) {
    proteinSupplementMode.disabled = !product;
    proteinSupplementMode.value = selection.deliveryMode || "";
  }

  if (product) {
    renderSupplementConstituentPanel(product);
  } else if (supplementConstituentsWrap) {
    supplementConstituentsWrap.classList.add("hidden");
    supplementConstituentsWrap.innerHTML = "";
  }

  const showSupplementControls = Boolean(product && selection.deliveryMode);
  supplementFeedControls?.classList.toggle("hidden", !showSupplementControls);

  if (showSupplementControls) {
    selection.hours = Number(supplementFeedHours?.value || selection.hours || 18);
    selection.rate = Number(supplementFeedRate?.value || selection.rate || 20);
    supplementFeedHours.value = String(selection.hours);
    supplementFeedRate.value = String(selection.rate);
    supplementFeedRateValue.textContent = String(selection.rate);

    const supplementConfig = getSupplementFeedConfig();
    pathwayState.supplementFeedConfig = supplementConfig;
    supplementConfig.deliveryMode = selection.deliveryMode;
    supplementConfig.deliveryModeLabel = getSupplementDeliveryModeLabel(selection.deliveryMode);
    supplementConfig.productLabel = getSupplementProductDisplayName(product);

    if (selection.deliveryMode === "powder") {
      supplementModeNote.textContent = `Add ${supplementConfig.productLabel} powder into the ongoing ${getSupplementProductDisplayName(primaryConfig.selectedProduct)} feed using manufacturer standard dilution (${product.dilution}). Feeding rate below estimates supplement delivery.`;
    } else {
      supplementModeNote.textContent = `Give ${supplementConfig.productLabel} as a separate feed using manufacturer recommended standard dilution (${product.dilution}).`;
    }

    renderFeedConfigPanels(supplementConfig, {
      summary: supplementFeedConfigSummary,
      targetAnalysis: supplementFeedTargetAnalysis,
      schedule: supplementFeedSchedule,
      instruction: supplementFeedInstruction,
    });
  } else {
    pathwayState.supplementFeedConfig = null;
  }

  const combinedState = updateCombinedFeedPanel(primaryConfig, deficitState);
  const canGenerate = deficitState.hasDeficit
    ? combinedState.targetsMet && Boolean(selection.scheduleMode)
    : combinedState.targetsMet;
  updateGeneratePrescriptionButton(canGenerate);
}

function updateGeneratePrescriptionButton(enabled) {
  if (generatePrescription) {
    generatePrescription.disabled = !enabled;
  }
}

function handleSupplementFeedInteraction(event) {
  const target = event.target;

  if (
    target.closest("#protein-supplement-select") ||
    target.closest("#protein-supplement-mode") ||
    target.closest("#supplement-feed-hours") ||
    target.closest("#supplement-feed-rate") ||
    target.closest('input[name="feed-schedule-mode"]')
  ) {
    const selection = ensureProteinSupplementSelection();

    if (target.id === "protein-supplement-select") {
      selection.productKey = proteinSupplementSelect.value;
      selection.deliveryMode = "";
      if (proteinSupplementMode) {
        proteinSupplementMode.value = "";
      }
    }

    if (target.id === "protein-supplement-mode") {
      selection.deliveryMode = proteinSupplementMode.value;
      selection.hours = Number(feedHours?.value || 18);
      selection.rate = 20;
    }

    if (target.id === "supplement-feed-hours") {
      selection.hours = Number(supplementFeedHours.value);
    }

    if (target.id === "supplement-feed-rate") {
      selection.rate = Number(supplementFeedRate.value);
      supplementFeedRateValue.textContent = String(selection.rate);
    }

    if (target.name === "feed-schedule-mode") {
      selection.scheduleMode = target.value;
    }

    updateProteinDeficitAndSupplement(pathwayState.feedConfig);
  }
}

function buildDualFormulaNurseInstructions(primaryConfig, supplementConfig, selection) {
  const primaryName = getSupplementProductDisplayName(primaryConfig.selectedProduct);
  const supplementName = supplementConfig.productLabel;
  const powderNote =
    selection.deliveryMode === "powder"
      ? `Mix ${supplementName} powder into the ${primaryName} feed bag per manufacturer standard dilution before each feed.`
      : `Run ${supplementName} as a separate feed in a second bag.`;

  return `
Formula 1 — ${primaryName}
Dilution: ${primaryConfig.dilutionLabel}
Rate of administration: ${primaryConfig.rate} mL per hour
Prepare fresh feed every ${formatNumber(primaryConfig.timePerFeed)} hours

Formula 2 — ${supplementName}
Manufacturer recommended standard dilution: ${supplementConfig.manufacturerDilution}
Administration: ${supplementConfig.deliveryModeLabel}
Rate of administration: ${supplementConfig.rate} mL per hour
Prepare fresh feed every ${formatNumber(supplementConfig.timePerFeed)} hours
${powderNote}`;
}

function buildPrescriptionPlainText({
  patient,
  feedConfig,
  supplementConfig,
  hasDualFormula,
  calorieMin,
  calorieMax,
  proteinMin,
  proteinMax,
  proteinCaloriesMin,
  proteinCaloriesMax,
  totalCaloriesRequiredMin,
  totalCaloriesRequiredMax,
  dayThreeTargetMin,
  dayThreeTargetMax,
  deliveredCaloriesText,
  deliveredProteinText,
  totalVolumeText,
  selection,
}) {
  let text = `Enteral Nutrition Prescription:

Measured height: ${formatNumber(patient.heightCm)} cm
Estimated IBW: ${formatNumber(patient.idealBodyWeight)} Kg
Predicted body weight: ${formatNumber(patient.predictedBodyWeight)} Kg
Calorie requirement: ${formatRange(calorieMin, calorieMax, "KCal per day")}
Recommended protein intake: ${formatRange(proteinMin, proteinMax, "grams per day")}
Calories from protein: ${formatRange(proteinCaloriesMin, proteinCaloriesMax, "KCal per day")}
Total calories required: ${formatRange(totalCaloriesRequiredMin, totalCaloriesRequiredMax, "KCal per day")}
70% target by day 3: ${formatRange(dayThreeTargetMin, dayThreeTargetMax, "KCal per day")}`;

  if (hasDualFormula) {
    text += `

Formula 1 (Primary enteral feed): ${getSupplementProductDisplayName(feedConfig.selectedProduct)}
Manufacturer recommended standard dilution: ${feedConfig.manufacturerDilution}
Selected dilution in use: ${feedConfig.dilutionLabel}
Rate of administration: ${feedConfig.rate} mL per hour
Calories delivered: ${Math.round(feedConfig.deliveredCalories)} KCal per day
Protein delivered: ${formatNumber(feedConfig.deliveredProtein)} gm per day

Formula 2 (Protein supplement feed): ${supplementConfig.productLabel}
Manufacturer recommended standard dilution: ${supplementConfig.manufacturerDilution}
Administration method: ${supplementConfig.deliveryModeLabel}
Rate of administration: ${supplementConfig.rate} mL per hour
Calories delivered: ${Math.round(supplementConfig.deliveredCalories)} KCal per day
Protein delivered: ${formatNumber(supplementConfig.deliveredProtein)} gm per day`;
  } else {
    text += `

Enteral formula selected: ${feedConfig.selectedProduct.name}
Manufacturer recommended standard dilution: ${feedConfig.manufacturerDilution}`;
  }

  text += `

Instructions to Nurse:
${hasDualFormula ? buildDualFormulaNurseInstructions(feedConfig, supplementConfig, selection) : `
Dilution: ${feedConfig.dilutionLabel}
Rate of administration: ${feedConfig.rate} mL per hour
Prepare fresh feed every ${formatNumber(feedConfig.timePerFeed)} hours`}

Shake feed in bag hourly

Total calories delivered (all formulas): ${deliveredCaloriesText}
Total protein delivered (all formulas): ${deliveredProteinText}
Total volume from enteral feeds per day: ${totalVolumeText}

Standard precautions to be followed while preparing feeds:

* All personal protective equipment like cap & mask have to be donned.
* Wash hands with soap for about 40-60 seconds.
* Use sterile plastic apron and hand care gloves while preparing the feed.
* Prepare feed as per prescription.
* After mixing thoroughly put the preparation into feeding bag.
* Confirm position of Ryles tube/Freka tube with hissing sound in epigastric area before starting feeds (If any doubt - inform the consultant/Trainee immediately).
* Start feed at prescribed rate only.
* Whenever a patient is in Nil per Oral, please confirm with ICU consultant about need for starting IV fluids.
* Measure Gastric residual volume once each morning before starting feeds at about 6AM with a syringe. Anything above 100 mL has to be brought to the notice of ICU consultant/Trainee on duty immediately
* Monitor GRBS as advised in daily notes, and inform ICU Consultant if GRBS > 180 mg/dL.
* Any change in dilutions or rate of administration has to be brought to the notice of ICU consultant/Trainee.`;

  return text;
}

function renderDietPrescription(shouldScroll = true) {
  const patient = getPrescriptionPatientData();
  const feedConfig = pathwayState.feedConfig || getFeedConfigurationData();
  const calculationWeight = patient.calculationWeight;
  const proteinWeight = patient.idealBodyWeight || calculationWeight;
  const plan = pathwayState.enteralPlan;
  let calorieMin;
  let calorieMax;
  if (plan?.fullCaloriesMin != null && plan?.fullCaloriesMax != null) {
    calorieMin = plan.fullCaloriesMin;
    calorieMax = plan.fullCaloriesMax;
  } else {
    calorieMin = calculationWeight * 25;
    calorieMax = calculationWeight * 30;
  }
  const proteinMin = proteinWeight * 1.2;
  const proteinMax = proteinWeight * 1.5;
  const proteinCaloriesMin = proteinMin * 4;
  const proteinCaloriesMax = proteinMax * 4;
  const totalCaloriesRequiredMin = calorieMin + proteinCaloriesMin;
  const totalCaloriesRequiredMax = calorieMax + proteinCaloriesMax;
  const dayThreeTargetMin = totalCaloriesRequiredMin * 0.7;
  const dayThreeTargetMax = totalCaloriesRequiredMax * 0.7;
  const supplementConfig = pathwayState.supplementFeedConfig;
  const selection = pathwayState.proteinSupplementSelection;
  const hasDualFormula = Boolean(supplementConfig && selection?.deliveryMode);
  const { combinedCalories, combinedProtein, combinedVolume } = getCombinedFeedTotals(
    feedConfig,
    hasDualFormula ? supplementConfig : null
  );

  const deliveredCaloriesText = hasDualFormula
    ? `${Math.round(combinedCalories)} KCal per day (Formula 1 + Formula 2)`
    : `${Math.round(feedConfig.deliveredCalories)} KCal per day`;
  const deliveredProteinText = hasDualFormula
    ? `${formatNumber(combinedProtein)} gm per day (Formula 1 + Formula 2)`
    : `${formatNumber(feedConfig.deliveredProtein)} gm per day`;
  const totalVolumeText = hasDualFormula
    ? `${combinedVolume} mL (Formula 1: ${feedConfig.totalVolumePerDay} mL + Formula 2: ${supplementConfig.totalVolumePerDay} mL)`
    : `${feedConfig.totalVolumePerDay} mL`;

  const formulaLines = hasDualFormula
    ? [
        ["Formula 1 — Primary enteral feed", getSupplementProductDisplayName(feedConfig.selectedProduct)],
        [
          "Formula 1 — Manufacturer recommended standard dilution",
          feedConfig.manufacturerDilution,
        ],
        ["Formula 1 — Selected dilution in use", feedConfig.dilutionLabel],
        ["Formula 1 — Rate of administration", `${feedConfig.rate} mL per hour`],
        [
          "Formula 1 — Prepare fresh feed every",
          `${formatNumber(feedConfig.timePerFeed)} hours`,
        ],
        [
          "Formula 1 — Calories / protein delivered",
          `${Math.round(feedConfig.deliveredCalories)} KCal / ${formatNumber(feedConfig.deliveredProtein)} gm per day`,
        ],
        ["Formula 2 — Protein supplement feed", supplementConfig.productLabel],
        [
          "Formula 2 — Manufacturer recommended standard dilution",
          supplementConfig.manufacturerDilution,
        ],
        ["Formula 2 — Administration method", supplementConfig.deliveryModeLabel],
        ["Formula 2 — Rate of administration", `${supplementConfig.rate} mL per hour`],
        [
          "Formula 2 — Prepare fresh feed every",
          `${formatNumber(supplementConfig.timePerFeed)} hours`,
        ],
        [
          "Formula 2 — Calories / protein delivered",
          `${Math.round(supplementConfig.deliveredCalories)} KCal / ${formatNumber(supplementConfig.deliveredProtein)} gm per day`,
        ],
      ]
    : [
        ["Enteral formula selected", feedConfig.selectedProduct.name],
        [
          "Manufacturer recommended standard dilution",
          feedConfig.manufacturerDilution,
        ],
        ["Selected dilution in use", feedConfig.dilutionLabel],
        ["Rate of administration", `${feedConfig.rate} mL per hour`],
        ["Prepare fresh feed every", `${formatNumber(feedConfig.timePerFeed)} hours`],
      ];

  pathwayState.dietPrescription = {
    patient,
    feedConfig,
    supplementConfig,
    hasDualFormula,
    calorieMin,
    calorieMax,
    proteinMin,
    proteinMax,
  };

  pathwayState.dietPrescriptionText = buildPrescriptionPlainText({
    patient,
    feedConfig,
    supplementConfig,
    hasDualFormula,
    calorieMin,
    calorieMax,
    proteinMin,
    proteinMax,
    proteinCaloriesMin,
    proteinCaloriesMax,
    totalCaloriesRequiredMin,
    totalCaloriesRequiredMax,
    dayThreeTargetMin,
    dayThreeTargetMax,
    deliveredCaloriesText,
    deliveredProteinText,
    totalVolumeText,
    selection,
  });

  const nurseInstructionsHtml = hasDualFormula
    ? `
      <div class="nurse-formula-block">
        <h5>Formula 1 — ${getSupplementProductDisplayName(feedConfig.selectedProduct)}</h5>
        <p><strong>Manufacturer standard dilution:</strong> ${feedConfig.manufacturerDilution}</p>
        <p><strong>Dilution in use:</strong> ${feedConfig.dilutionLabel}</p>
        <p><strong>Rate of administration:</strong> ${feedConfig.rate} mL per hour</p>
        <p><strong>Prepare fresh feed every:</strong> ${formatNumber(feedConfig.timePerFeed)} hours</p>
      </div>
      <div class="nurse-formula-block">
        <h5>Formula 2 — ${supplementConfig.productLabel}</h5>
        <p><strong>Manufacturer standard dilution:</strong> ${supplementConfig.manufacturerDilution}</p>
        <p><strong>Administration:</strong> ${supplementConfig.deliveryModeLabel}</p>
        <p><strong>Rate of administration:</strong> ${supplementConfig.rate} mL per hour</p>
        <p><strong>Prepare fresh feed every:</strong> ${formatNumber(supplementConfig.timePerFeed)} hours</p>
        ${
          selection.deliveryMode === "powder"
            ? `<p><strong>Powder mixing:</strong> Add supplement powder into the Formula 1 feed bag using manufacturer standard dilution; mix thoroughly before each administration.</p>`
            : `<p><strong>Separate feed:</strong> Administer Formula 2 in a separate feeding bag at the prescribed rate.</p>`
        }
      </div>
    `
    : `
      <p><strong>Dilution:</strong> ${feedConfig.dilutionLabel}</p>
      <p><strong>Rate of administration:</strong> ${feedConfig.rate} mL per hour</p>
      <p><strong>Prepare fresh feed every:</strong> ${formatNumber(feedConfig.timePerFeed)} hours</p>
    `;

  dietPrescription.innerHTML = `
    <h3>Enteral Nutrition Prescription :</h3>
    <div class="prescription-single-tile">
      <div class="prescription-lines">
        ${[
          ["Measured height", `${formatNumber(patient.heightCm)} cm`],
          ["Estimated IBW", `${formatNumber(patient.idealBodyWeight)} Kg`],
          ["Predicted body weight", `${formatNumber(patient.predictedBodyWeight)} Kg`],
          ["Calorie requirement", formatRange(calorieMin, calorieMax, "KCal per day")],
          ["Recommended protein intake", formatRange(proteinMin, proteinMax, "grams per day")],
          ["Calories from protein", formatRange(proteinCaloriesMin, proteinCaloriesMax, "KCal per day")],
          ["Total calories required", formatRange(totalCaloriesRequiredMin, totalCaloriesRequiredMax, "KCal per day")],
          ["70% target by day 3", formatRange(dayThreeTargetMin, dayThreeTargetMax, "KCal per day")],
          ...formulaLines,
          ["Shake feed in bag", "Hourly"],
          ["Total calories delivered (all formulas)", deliveredCaloriesText],
          ["Total protein delivered (all formulas)", deliveredProteinText],
          ["Total volume from enteral feeds per day", totalVolumeText],
        ]
          .map(
            ([label, value]) => `
              <p>
                <span>${label}</span>
                <strong>${value}</strong>
              </p>
            `
          )
          .join("")}
      </div>
      <div class="nurse-instructions">
        <h4>Instructions to Nurse:</h4>
        ${nurseInstructionsHtml}
        <p><strong>Shake feed in bag:</strong> Hourly</p>
      </div>
      <h4>Standard precautions to be followed while preparing feeds:</h4>
      <ul>
        <li>All personal protective equipment like cap &amp; mask have to be donned.</li>
        <li>Wash hands with soap for about 40-60 seconds.</li>
        <li>Use sterile plastic apron and hand care gloves while preparing the feed.</li>
        <li>Prepare feed as per prescription.</li>
        <li>After mixing thoroughly put the preparation into feeding bag.</li>
        <li>Confirm position of Ryles tube/Freka tube with hissing sound in epigastric area before starting feeds (If any doubt - inform the consultant/Trainee immediately).</li>
        <li>Start feed at prescribed rate only.</li>
        <li>Whenever a patient is in Nil per Oral, please confirm with ICU consultant about need for starting IV fluids.</li>
        <li>Measure Gastric residual volume once each morning before starting feeds at about 6AM with a syringe. Anything above 100 mL has to be brought to the notice of ICU consultant/Trainee on duty immediately</li>
        <li>Monitor GRBS as advised in daily notes, and inform ICU Consultant if GRBS &gt; 180 mg/dL.</li>
        <li>Any change in dilutions or rate of administration has to be brought to the notice of ICU consultant/Trainee.</li>
      </ul>
    </div>
    <button id="copy-prescription" class="copy-prescription-tile" type="button">
      Copy Prescription
    </button>
    <p id="copy-prescription-status" class="copy-status" aria-live="polite"></p>
  `;
  dietPrescription.classList.remove("hidden");

  if (shouldScroll) {
    dietPrescription.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function setCopyPrescriptionStatus(message) {
  const status = document.getElementById("copy-prescription-status");

  if (status) {
    status.textContent = message;
  }
}

function fallbackCopyText(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.setAttribute("readonly", "");
  textArea.style.left = "-9999px";
  textArea.style.position = "fixed";
  document.body.appendChild(textArea);
  textArea.select();
  const copied = document.execCommand("copy");
  document.body.removeChild(textArea);
  return copied;
}

async function copyDietPrescription() {
  if (!pathwayState.dietPrescriptionText) {
    renderDietPrescription(false);
  }

  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(pathwayState.dietPrescriptionText);
    } else if (!fallbackCopyText(pathwayState.dietPrescriptionText)) {
      throw new Error("Clipboard copy failed");
    }

    setCopyPrescriptionStatus("Prescription copied. You can paste it wherever required.");
  } catch (error) {
    setCopyPrescriptionStatus("Copy failed. Select the prescription text and copy manually.");
  }
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
  const age = getNumber("nrs-age");
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
    requiredFields: ["nrs-age", "bmi", "weight-loss", "intake", "disease-severity"],
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

  return 70;
}

function getEstimatedIdealBodyWeight() {
  return pathwayState.patient?.idealBodyWeight || pathwayState.patient?.idealBodyWeightKg || null;
}

function showEnteralPhaseSelector() {
  if (!enteralPhaseSelector) {
    return;
  }

  revealStage(stepBranches);
  enteralPhaseSelector.classList.remove("hidden");
  enteralPlanner.classList.add("hidden");
  enteralTargetControls.classList.add("hidden");
  enteralDayForm.reset();
  enteralTargetResults.innerHTML = "";
  pathwayState.enteralPhase = null;
  pathwayState.enteralPlan = null;
  enteralPhaseButtons.forEach((button) => button.classList.remove("recommended"));
  enteralPhaseSelector.scrollIntoView({ behavior: "smooth", block: "center" });
}

function selectEnteralPhase(phase) {
  if (!phase) {
    return;
  }

  pathwayState.enteralPhase = phase;
  enteralPhaseButtons.forEach((button) => {
    button.classList.toggle("recommended", button.dataset.phase === phase);
  });
  prepareEnteralPlanner();
  revealStage(stepResult);
  enteralPlanner.scrollIntoView({ behavior: "smooth", block: "start" });
}

function resetEnteralPhaseSelector() {
  if (!enteralPhaseSelector) {
    return;
  }

  enteralPhaseSelector.classList.add("hidden");
  pathwayState.enteralPhase = null;
  enteralPhaseButtons.forEach((button) => button.classList.remove("recommended"));
}

function prepareEnteralPlanner() {
  const estimatedIdealBodyWeight = getEstimatedIdealBodyWeight();

  enteralPlanner.classList.remove("hidden");
  enteralDayForm.reset();
  enteralTargetControls.classList.add("hidden");
  enteralTargetResults.innerHTML = "";
  pathwayState.enteralPlan = null;

  caloriePercent.value = "25";
  caloriePercent.disabled = false;
  if (caloriePercentNote) {
    caloriePercentNote.textContent = "";
  }
  calorieTargetMin.value = "22";
  calorieTargetMax.value = "28";
  updateCalorieDualRangeFill();

  if (estimatedIdealBodyWeight) {
    enteralIbw.value = estimatedIdealBodyWeight;
  }
}

function resetEnteralPlanner() {
  resetEnteralPhaseSelector();
  enteralPlanner.classList.add("hidden");
  enteralTargetControls.classList.add("hidden");
  enteralDayForm.reset();
  enteralTargetResults.innerHTML = "";
  pathwayState.enteralPhase = null;
  pathwayState.enteralPlan = null;
}

function syncCalorieKcalPerKgRange(sourceSlider) {
  let minV = Number(calorieTargetMin.value);
  let maxV = Number(calorieTargetMax.value);
  if (minV > maxV) {
    if (sourceSlider === calorieTargetMax) {
      calorieTargetMin.value = String(maxV);
      minV = maxV;
    } else {
      calorieTargetMax.value = String(minV);
      maxV = minV;
    }
  }
  return { minV, maxV };
}

function updateCalorieDualRangeFill() {
  if (!calorieRangeFill) {
    return;
  }
  const lo = Number(calorieTargetMin.value);
  const hi = Number(calorieTargetMax.value);
  const span = CALORIE_KG_RANGE_MAX - CALORIE_KG_RANGE_MIN;
  const leftPct = ((lo - CALORIE_KG_RANGE_MIN) / span) * 100;
  const rightPct = ((hi - CALORIE_KG_RANGE_MIN) / span) * 100;
  calorieRangeFill.style.left = `${leftPct}%`;
  calorieRangeFill.style.width = `${Math.max(0, rightPct - leftPct)}%`;
}

function updateEnteralTargetDisplay() {
  const { minV: caloriesPerKgMin, maxV: caloriesPerKgMax } = syncCalorieKcalPerKgRange(null);
  updateCalorieDualRangeFill();

  const day = getNumber("icu-day");
  const idealBodyWeight = getNumber("enteral-ibw");

  if (!day || !idealBodyWeight) {
    return;
  }

  if (day >= 3) {
    caloriePercent.value = "70";
    caloriePercent.disabled = true;
    if (caloriePercentNote) {
      caloriePercentNote.textContent =
        "From ICU day 3 onward, day-based delivery is fixed at 70% of full calorie requirement.";
    }
  } else {
    caloriePercent.disabled = false;
    let pct = Number(caloriePercent.value);
    if (pct > 95) {
      pct = 95;
      caloriePercent.value = "95";
    }
    if (caloriePercentNote) {
      caloriePercentNote.textContent = "Delivery is capped below 100% (maximum 95%).";
    }
  }

  const calorieDeliveryPercent = Number(caloriePercent.value);
  const proteinPerKg = Number(proteinTarget.value);
  const caloriesPerKgMid = (caloriesPerKgMin + caloriesPerKgMax) / 2;
  const proteinGrams = Math.round(idealBodyWeight * proteinPerKg * 10) / 10;
  const fullCaloriesMin = Math.round(idealBodyWeight * caloriesPerKgMin);
  const fullCaloriesMax = Math.round(idealBodyWeight * caloriesPerKgMax);
  const fullCaloriesMid = Math.round(idealBodyWeight * caloriesPerKgMid);
  const dayCaloriesMin = Math.round(fullCaloriesMin * (calorieDeliveryPercent / 100));
  const dayCaloriesMax = Math.round(fullCaloriesMax * (calorieDeliveryPercent / 100));

  caloriePercentValue.textContent = `${calorieDeliveryPercent}%`;
  proteinTargetValue.textContent = proteinPerKg.toFixed(1);
  calorieTargetRangeValue.textContent =
    caloriesPerKgMin === caloriesPerKgMax
      ? `${caloriesPerKgMin}`
      : `${caloriesPerKgMin}–${caloriesPerKgMax}`;

  pathwayState.enteralPlan = {
    day,
    idealBodyWeight,
    calorieDeliveryPercent,
    proteinPerKg,
    caloriesPerKgMin,
    caloriesPerKgMax,
    caloriesPerKgMid,
    proteinGrams,
    fullCalories: fullCaloriesMid,
    fullCaloriesMin,
    fullCaloriesMax,
    dayCaloriesMin,
    dayCaloriesMax,
    dayCalories: Math.round(fullCaloriesMid * (calorieDeliveryPercent / 100)),
  };

  const fullCalorieDetail =
    caloriesPerKgMin === caloriesPerKgMax
      ? `${caloriesPerKgMin} kcal/kg/day x IBW ${idealBodyWeight} kg`
      : `${caloriesPerKgMin}–${caloriesPerKgMax} kcal/kg/day x IBW ${idealBodyWeight} kg`;

  enteralTargetResults.innerHTML = `
    <div class="target-number-grid">
      <article>
        <span>Protein target</span>
        <strong>${proteinGrams} g/day</strong>
        <small>${proteinPerKg.toFixed(1)} g/kg/day x IBW ${idealBodyWeight} kg</small>
      </article>
      <article>
        <span>Full calorie requirement</span>
        <strong>${fullCaloriesMin === fullCaloriesMax ? fullCaloriesMin : `${fullCaloriesMin}–${fullCaloriesMax}`} kcal/day</strong>
        <small>${fullCalorieDetail}</small>
      </article>
      <article>
        <span>ICU day ${day} calorie target</span>
        <strong>${dayCaloriesMin === dayCaloriesMax ? dayCaloriesMin : `${dayCaloriesMin}–${dayCaloriesMax}`} kcal/day</strong>
        <small>${calorieDeliveryPercent}% of full calorie requirement</small>
      </article>
    </div>
    <p class="summary">Advance feeding as tolerated; from ICU day 3 onward the planner uses 70% of full calories (never 100%).</p>
  `;
  updateFeedConfiguration();
}

function selectRoute(route) {
  if (route === "enteral") {
    showEnteralPhaseSelector();
    resetPreparationLibrary();
    hideStage(stepResult);
    productLibrary.classList.add("hidden");
  } else {
    resetEnteralPlanner();
    productLibrary.classList.add("hidden");
    resetPreparationLibrary();
    hideStage(stepResult);
  }

  updateFeedConfiguration();
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
  enteralTargetResults.innerHTML = "";
  resetPreparationLibrary();
  patientDataResults.classList.add("hidden");
  enteralPlanner.classList.add("hidden");
  resetEnteralPhaseSelector();
  enteralTargetControls.classList.add("hidden");
  productLibrary.classList.add("hidden");
  pathwayState.patient = null;
  pathwayState.nutrition = null;
  pathwayState.gi = null;
  pathwayState.enteralPhase = null;
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
  enteralTargetResults.innerHTML = "";
  resetPreparationLibrary();
  nutritionResults.classList.add("hidden");
  giResults.classList.add("hidden");
  completeAssessment.classList.add("hidden");
  enteralPlanner.classList.add("hidden");
  resetEnteralPhaseSelector();
  enteralTargetControls.classList.add("hidden");
  productLibrary.classList.add("hidden");
  hideStage(stepNutrition);
  hideStage(stepGi);
  hideStage(stepBranches);
  hideStage(stepResult);
  pathwayState.nutrition = null;
  pathwayState.gi = null;
  pathwayState.enteralPhase = null;
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
  enteralTargetResults.innerHTML = "";
  resetFeedConfiguration();
  nutritionResults.classList.add("hidden");
  giResults.classList.add("hidden");
  completeAssessment.classList.add("hidden");
  enteralPlanner.classList.add("hidden");
  resetEnteralPhaseSelector();
  enteralTargetControls.classList.add("hidden");
  productLibrary.classList.add("hidden");
  hideStage(stepGi);
  hideStage(stepBranches);
  hideStage(stepResult);
  pathwayState.nutrition = null;
  pathwayState.gi = null;
  pathwayState.enteralPhase = null;
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

if (enteralPhaseSelector) {
  enteralPhaseSelector.addEventListener("click", (event) => {
    const phaseButton = event.target.closest(".enteral-phase-btn");
    if (!phaseButton?.dataset.phase) {
      return;
    }

    selectEnteralPhase(phaseButton.dataset.phase);
  });
}

enteralDayForm.addEventListener("submit", (event) => {
  event.preventDefault();
  caloriePercent.value = getSuggestedCaloriePercent(getNumber("icu-day"));
  enteralTargetControls.classList.remove("hidden");
  updateEnteralTargetDisplay();
  productLibrary.classList.remove("hidden");
  productLibrary.scrollIntoView({ behavior: "smooth", block: "start" });
});

[caloriePercent, proteinTarget, enteralIbw].forEach((input) => {
  input.addEventListener("input", updateEnteralTargetDisplay);
});

calorieTargetMin.addEventListener("input", () => {
  syncCalorieKcalPerKgRange(calorieTargetMin);
  updateEnteralTargetDisplay();
});

calorieTargetMax.addEventListener("input", () => {
  syncCalorieKcalPerKgRange(calorieTargetMax);
  updateEnteralTargetDisplay();
});

[calorieTargetMin, calorieTargetMax].forEach((slider) => {
  slider.addEventListener("pointerdown", () => {
    slider.style.zIndex = "5";
    const other = slider === calorieTargetMin ? calorieTargetMax : calorieTargetMin;
    other.style.zIndex = "4";
  });
});

if (icuDayInput) {
  icuDayInput.addEventListener("input", () => {
    if (!enteralTargetControls.classList.contains("hidden")) {
      updateEnteralTargetDisplay();
    }
  });
}

[feedDilution, feedHours, feedRate].forEach((input) => {
  input.addEventListener("input", updateFeedConfiguration);
  input.addEventListener("change", updateFeedConfiguration);
});

document.querySelectorAll('input[name="product-filter"]').forEach((input) => {
  input.addEventListener("change", renderEnteralPreparations);
});

compareProducts.addEventListener("click", renderComparisonModal);

closeCompare.addEventListener("click", () => {
  compareModal.classList.add("hidden");
});

compareModal.addEventListener("click", (event) => {
  if (event.target === compareModal) {
    compareModal.classList.add("hidden");
  }
});

prepLibraryToggle.addEventListener("click", () => {
  prepLibraryContent.classList.remove("hidden");
  renderEnteralPreparations();
  productGrid.scrollIntoView({ behavior: "smooth", block: "start" });
});

generatePrescription.addEventListener("click", () => {
  if (generatePrescription.disabled) {
    return;
  }

  renderDietPrescription();
});

dietPrescription.addEventListener("click", (event) => {
  if (event.target.closest("#copy-prescription")) {
    copyDietPrescription();
  }
});

if (feedConfigurator) {
  feedConfigurator.addEventListener("change", handleSupplementFeedInteraction);
  feedConfigurator.addEventListener("input", handleSupplementFeedInteraction);
}

populateSupplementProductSelect();

function handleCelevidaDensityChange(event) {
  const densitySelect = event.target.closest(".celevida-density-select");
  if (!densitySelect) {
    return;
  }

  celevidaSelectedVariantKey = densitySelect.value;
  renderEnteralPreparations();
  if (selectedFeedProductName === CELEVIDA_PRODUCT_NAME) {
    updateSelectedFeedProductName();
    updateFeedConfiguration();
  }
}

function handleCompareCheckboxClick(compareCheckbox) {
  const productName = compareCheckbox.value;

  if (compareCheckbox.checked) {
    if (selectedCompareProductNames.length >= 4) {
      compareCheckbox.checked = false;
    } else {
      selectedCompareProductNames.push(productName);
    }
  } else {
    selectedCompareProductNames = selectedCompareProductNames.filter((name) => name !== productName);
  }

  updateCompareControls();
}

productGrid.addEventListener("change", handleCelevidaDensityChange);
if (productDetailPanel) {
  productDetailPanel.addEventListener("change", handleCelevidaDensityChange);
}

productGrid.addEventListener("click", (event) => {
  const compactTile = event.target.closest(".product-card-compact");
  if (!compactTile?.dataset.productName) {
    return;
  }

  activeProductCardName = syncCelevidaVariantFromLegacyName(compactTile.dataset.productName);
  renderEnteralPreparations();
  productDetailPanel?.scrollIntoView({ behavior: "smooth", block: "start" });
});

if (productDetailPanel) {
  productDetailPanel.addEventListener("click", (event) => {
    if (event.target.closest(".celevida-density-control")) {
      return;
    }

    const compareCheckbox = event.target.closest(".compare-product-checkbox");
    if (compareCheckbox) {
      handleCompareCheckboxClick(compareCheckbox);
      return;
    }

    if (event.target.closest(".compare-select")) {
      return;
    }

    if (!productDetailPanel.dataset.productName) {
      return;
    }

    openFeedConfigurationForProduct(productDetailPanel.dataset.productName);
  });
}

updateSelectedFeedProductName();
renderEnteralPreparations();
updateFeedConfiguration();
