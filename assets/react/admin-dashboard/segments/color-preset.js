/**
 * Color PRESET and PICKER manipulation
 */

const colorPresetInputs = document.querySelectorAll(
  "label.color-preset-input input[type='radio']"
);
const colorPickerInputs = document.querySelectorAll(
  "label.color-picker-input input[type='color']"
);
const pickerView = document.querySelectorAll(
  ".color-picker-wrapper [data-key]"
);
const moreButton = document.querySelector(".more_button");
const otherColors = document.querySelector(".other_colors");
const otherColorsExpanded = document.querySelector(".other_colors.expanded");
document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "interactive") {
    console.log("before state");
  }
  if (event.target.readyState === "complete") {
    // console.log("after state");
    otherColorsPreview();
  }
});

const otherColorsPreview = () => {
  let itemsHeight = 0,
    initHeight = 0;
  otherColors
    .querySelectorAll(".tutor-option-field-row")
    .forEach((item, index) => {
      if (0 == index) {
        initHeight = item.offsetHeight;
        otherColors.style.height = initHeight - 10 + "px";
      }
      itemsHeight = itemsHeight + item.offsetHeight;
    });
  const toggleHeight = itemsHeight + moreButton.offsetHeight + "px";
  moreButton.onclick = () => {
    otherColors.classList.toggle("expanded");
    if (otherColors.classList.contains("expanded")) {
      otherColors.style.height = toggleHeight;
      moreButton.querySelector("i").classList.remove("ttr-plus-filled");
      moreButton.querySelector("i").classList.add("ttr-minus-filled");
      moreButton.querySelector("span").innerText = "Show Less";
    } else {
      otherColors.style.height = initHeight - 10 + "px";
      moreButton.querySelector("i").classList.remove("ttr-minus-filled");
      moreButton.querySelector("i").classList.add("ttr-plus-filled");
      moreButton.querySelector("span").innerText = "Show More";
    }
  };
};

// Color PRESET Slecetion (color inputs)
colorPresetInputs.forEach((preset) => {
  // listening preset input events
  preset.addEventListener("input", (e) => {
    const presetItem = preset.parentElement.querySelector(".preset-item");
    const presetColors = presetItem.querySelectorAll(".header span");

    presetColors.forEach((color) => {
      let presetKey = color.dataset.preset;
      let presetColor = color.dataset.color;

      pickerView.forEach((toPicker) => {
        let pickerInput = toPicker.dataset.key;
        if (pickerInput == presetKey) {
          toPicker.querySelector("input").value = presetColor;
          toPicker.querySelector(".picker-value").innerHTML = presetColor;

          toPicker.style.borderColor = presetColor;
          toPicker.style.boxShadow = `inset 0 0 0 1px ${presetColor}`;

          setTimeout(() => {
            toPicker.style.borderColor = "#cdcfd5";
            toPicker.style.boxShadow = "none";
          }, 5000);
        }
      });
    });
  });
});

// Updating Custom Color PRESET
const updateCustomPreset = (picker) => {
  const customPresetEl = document.querySelector(
    "label.color-preset-input[for='custom']"
  );

  // listening picker input events
  picker.addEventListener("input", function(e) {
    const presetColors = customPresetEl.querySelectorAll(".header span");
    const presetItem = customPresetEl.querySelector('input[type="radio"]');
    const pickerCode = picker.nextElementSibling;

    colorPickerInputs.forEach((picker) => {
      let preset = picker.dataset.picker;
      presetColors.forEach((toPreset) => {
        if (toPreset.dataset.preset == preset) {
          toPreset.dataset.color = picker.value;
          toPreset.style.backgroundColor = picker.value;
        }
      });
      pickerCode.innerText = picker.value;
      presetItem.checked = true;
    });
  });
};

// listening color pickers input event
colorPickerInputs.forEach((picker) => {
  updateCustomPreset(picker);
});