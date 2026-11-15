const category = document.getElementById("category");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const valueInput = document.getElementById("value");
const result = document.getElementById("result");
const swapButton = document.getElementById("swapButton");
const clearButton = document.getElementById("clearButton");

const units = {

    length: {
        km: ["Kilometer", 1000],
        m: ["Meter", 1],
        cm: ["Centimeter", 0.01],
        mm: ["Millimeter", 0.001],
        mile: ["Mile", 1609.344],
        yard: ["Yard", 0.9144],
        foot: ["Foot", 0.3048],
        inch: ["Inch", 0.0254]
    },

    weight: {
        kg: ["Kilogram", 1],
        g: ["Gram", 0.001],
        mg: ["Milligram", 0.000001],
        lb: ["Pound", 0.453592],
        oz: ["Ounce", 0.0283495]
    },

    temperature: {
        celsius: ["Celsius", "temperature"],
        fahrenheit: ["Fahrenheit", "temperature"],
        kelvin: ["Kelvin", "temperature"]
    },

    area: {
        sqkm: ["Square Kilometer", 1000000],
        sqm: ["Square Meter", 1],
        sqcm: ["Square Centimeter", 0.0001],
        sqmm: ["Square Millimeter", 0.000001],
        hectare: ["Hectare", 10000],
        acre: ["Acre", 4046.8564224],
        sqft: ["Square Foot", 0.092903],
        sqyard: ["Square Yard", 0.836127],
        sqmile: ["Square Mile", 2589988.11]
    },

    speed: {
        kmh: ["Kilometer per Hour", 1],
        mph: ["Mile per Hour", 1.609344],
        ms: ["Meter per Second", 3.6],
        knot: ["Knot", 1.852]
    },

    data: {
        bit: ["Bit", 1],
        byte: ["Byte", 8],
        kb: ["Kilobyte", 8000],
        mb: ["Megabyte", 8000000],
        gb: ["Gigabyte", 8000000000],
        tb: ["Terabyte", 8000000000000]
    },

    time: {
        hour: ["Hour", 3600],
        minute: ["Minute", 60],
        second: ["Second", 1],
        millisecond: ["Millisecond", 0.001]
    },

    currency: {
        usd: ["US Dollar", 1],
        inr: ["Indian Rupee", 0.0119],
        eur: ["Euro", 1.08],
        gbp: ["British Pound", 1.27],
        jpy: ["Japanese Yen", 0.0065],
        cad: ["Canadian Dollar", 0.72],
        aud: ["Australian Dollar", 0.65]
    }
};


function loadUnits() {

    const selectedCategory = category.value;
    const categoryUnits = units[selectedCategory];

    fromUnit.innerHTML = "";
    toUnit.innerHTML = "";

    if (!categoryUnits) {
        return;
    }

    for (const unit in categoryUnits) {

        const option1 = document.createElement("option");
        option1.value = unit;
        option1.textContent = categoryUnits[unit][0];

        const option2 = document.createElement("option");
        option2.value = unit;
        option2.textContent = categoryUnits[unit][0];

        fromUnit.appendChild(option1);
        toUnit.appendChild(option2);
    }

    if (toUnit.options.length > 1) {
        toUnit.selectedIndex = 1;
    }

    convert();
}


function convertTemperature(value, from, to) {

    let celsius;

    if (from === "celsius") {
        celsius = value;
    }
    else if (from === "fahrenheit") {
        celsius = (value - 32) * 5 / 9;
    }
    else if (from === "kelvin") {
        celsius = value - 273.15;
    }

    if (to === "celsius") {
        return celsius;
    }

    if (to === "fahrenheit") {
        return (celsius * 9 / 5) + 32;
    }

    if (to === "kelvin") {
        return celsius + 273.15;
    }
}

function convert() {

    const value = parseFloat(valueInput.value);

    if (isNaN(value)) {
        result.textContent = "Result will appear here";
        return;
    }

    const selectedCategory = category.value;
    const categoryUnits = units[selectedCategory];

    const from = fromUnit.value;
    const to = toUnit.value;

    if (!categoryUnits[from] || !categoryUnits[to]) {
        return;
    }


    if (selectedCategory === "temperature") {

        const convertedValue = convertTemperature(value, from, to);

        result.textContent =
            `${formatNumber(convertedValue)} ${categoryUnits[to][0]}`;

        return;
    }


    const fromValue = categoryUnits[from][1];
    const toValue = categoryUnits[to][1];

    const baseValue = value * fromValue;
    const convertedValue = baseValue / toValue;

    result.textContent =
        `${formatNumber(convertedValue)} ${categoryUnits[to][0]}`;
}


function formatNumber(number) {

    if (Number.isInteger(number)) {
        return number.toLocaleString();
    }

    return Number(number.toFixed(8)).toLocaleString();
}


swapButton.addEventListener("click", function () {

    const oldFrom = fromUnit.value;

    fromUnit.value = toUnit.value;
    toUnit.value = oldFrom;

    convert();
});


clearButton.addEventListener("click", function () {

    valueInput.value = "";

    result.textContent = "Result will appear here";

    valueInput.focus();
});


category.addEventListener("change", loadUnits);

valueInput.addEventListener("input", convert);

fromUnit.addEventListener("change", convert);
toUnit.addEventListener("change", convert);


loadUnits();