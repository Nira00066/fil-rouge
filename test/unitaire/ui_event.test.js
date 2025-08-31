const express = require("express");
const {
  toggleEndDate,
  initTabs,
} = require("../../assets/scripts/action/event");



function toggleEndDate() {
  const checkbox = document.getElementById("multiple-dates");
  const endDateGroup = document.getElementById("end-date-group");
  endDateGroup.style.display = checkbox.checked ? "flex" : "none";
}

function initTabs() {
  document.querySelectorAll(".tabs button").forEach((button) => {
    button.addEventListener("click", () => {
      // Supprimer "active" des autres
      document
        .querySelectorAll(".tabs button")
        .forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Cacher toutes les sections
      document
        .querySelectorAll(".tab-section")
        .forEach((section) => (section.style.display = "none"));

      // Afficher la bonne section
      const targetId = button.getAttribute("data-tab");
      const targetSection = document.getElementById(targetId);
      if (targetSection) targetSection.style.display = "block";
    });
  });
}

describe("toggleEndDate", () => {
  beforeEach(() => {
    // Simuler le DOM
    document.body.innerHTML = `
      <input type="checkbox" id="multiple-dates">
      <div id="end-date-group" style="display:none;"></div>
    `;
  });

  test("cache la date de fin quand la checkbox est décochée", () => {
    const checkbox = document.getElementById("multiple-dates");
    checkbox.checked = false;

    toggleEndDate();

    expect(document.getElementById("end-date-group").style.display).toBe(
      "none"
    );
  });

  test("affiche la date de fin quand la checkbox est cochée", () => {
    const checkbox = document.getElementById("multiple-dates");
    checkbox.checked = true;

    toggleEndDate();

    expect(document.getElementById("end-date-group").style.display).toBe(
      "flex"
    );
  });
});

describe("initTabs", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="tabs">
        <button data-tab="section1">Onglet 1</button>
        <button data-tab="section2">Onglet 2</button>
      </div>
      <div id="section1" class="tab-section">Section 1</div>
      <div id="section2" class="tab-section" style="display:none;">Section 2</div>
    `;
    initTabs();
  });

  test("active le bon onglet quand on clique", () => {
    const btn2 = document.querySelector('[data-tab="section2"]');
    btn2.click();

    expect(btn2.classList.contains("active")).toBe(true);
    expect(
      document
        .querySelector('[data-tab="section1"]')
        .classList.contains("active")
    ).toBe(false);
  });

  test("affiche la bonne section quand on clique sur un onglet", () => {
    const btn2 = document.querySelector('[data-tab="section2"]');
    btn2.click();

    expect(document.getElementById("section2").style.display).toBe("block");
    expect(document.getElementById("section1").style.display).toBe("none");
  });
});
