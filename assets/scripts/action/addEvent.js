
  document.addEventListener("DOMContentLoaded", () => {
    // ============================
    // TAGS
    // ============================
    const inputTag = document.getElementById("tags");
    const selectedTagsContainer = document.querySelector(".tags-selectionner");
    let selectedTags = [];

    window.addTagFromInput = function () {
      const tagValue = inputTag.value.trim();
      if (!tagValue) return;
      addTag(tagValue);
      inputTag.value = "";
    };

    window.addTag = function (tagValue) {
      tagValue = (tagValue || "").trim();
      if (!tagValue || selectedTags.includes(tagValue)) return;

      selectedTags.push(tagValue);

      const tagElement = document.createElement("span");
      tagElement.classList.add("tag", "selected");
      tagElement.textContent = tagValue;
      tagElement.addEventListener("click", () => removeTag(tagValue, tagElement));

      selectedTagsContainer.appendChild(tagElement);
      console.log("Tags sélectionnés :", selectedTags);
    };

    function removeTag(tagValue, tagElement) {
      selectedTags = selectedTags.filter(t => t !== tagValue);
      tagElement.remove();
      console.log("Tags après suppression :", selectedTags);
    }

    inputTag.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addTagFromInput();
      }
    });

    // ============================
    // RÈGLES
    // ============================
    const rulesList  = document.getElementById("rules-list");
    const ruleInput  = document.getElementById("rule-input");
    const suggRules  = document.getElementById("suggested-rules");
    let selectedRules = [];

    window.addRuleFromInput = function () {
      const value = ruleInput.value.trim();
      if (!value) return;
      addRule(value);
      ruleInput.value = "";
    };

    window.addRule = function (ruleText) {
      ruleText = (ruleText || "").trim();
      if (!ruleText || selectedRules.includes(ruleText)) return;

      selectedRules.push(ruleText);

      const li = document.createElement("li");
      li.textContent = ruleText;
      li.title = "Cliquer pour supprimer";
      li.style.cursor = "pointer";
      li.addEventListener("click", () => removeRule(ruleText, li));

      rulesList.appendChild(li);
      updateSuggestedRules();
      console.log("Règles sélectionnées :", selectedRules);
    };

    function removeRule(ruleText, liElement) {
      selectedRules = selectedRules.filter(r => r !== ruleText);
      liElement.remove();
      updateSuggestedRules();
      console.log("Règles après suppression :", selectedRules);
    }

    function updateSuggestedRules() {
      if (!suggRules) return;
      suggRules.querySelectorAll(".tag").forEach(tag => {
        const text = tag.textContent.trim();
        tag.classList.toggle("selected", selectedRules.includes(text));
      });
    }

    ruleInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addRuleFromInput();
      }
    });

    // ============================
    // SERVICES
    // ============================
    const servicesList   = document.getElementById("services-list");
    const serviceInput   = document.getElementById("service-input");
    const suggServices   = document.getElementById("suggested-services");
    let selectedServices = [];

    window.addServiceFromInput = function () {
      const value = serviceInput.value.trim();
      if (!value) return;
      addService(value);
      serviceInput.value = "";
    };

    window.addService = function (serviceText) {
      serviceText = (serviceText || "").trim();
      if (!serviceText || selectedServices.includes(serviceText)) return;

      selectedServices.push(serviceText);

      const li = document.createElement("li");
      li.textContent = serviceText;
      li.title = "Cliquer pour supprimer";
      li.style.cursor = "pointer";
      li.addEventListener("click", () => removeService(serviceText, li));

      servicesList.appendChild(li);
      updateSuggestedServices();
      console.log("Services sélectionnés :", selectedServices);
    };

    function removeService(serviceText, liElement) {
      selectedServices = selectedServices.filter(s => s !== serviceText);
      liElement.remove();
      updateSuggestedServices();
      console.log("Services après suppression :", selectedServices);
    }

    function updateSuggestedServices() {
      if (!suggServices) return;
      suggServices.querySelectorAll(".tag").forEach(tag => {
        const text = tag.textContent.trim();
        tag.classList.toggle("selected", selectedServices.includes(text));
      });
    }

    serviceInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addServiceFromInput();
      }
    });
  });
