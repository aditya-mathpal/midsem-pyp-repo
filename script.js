async function loadData() {
  const response = await fetch("data.json");
  const data = await response.json();
  renderYears(data);
}

function renderYears(data) {
  const container = document.getElementById("content");
  container.innerHTML = "";

  Object.entries(data).forEach(([year, value]) => {
    const div = document.createElement("div");
    div.className = "subject";

    if (typeof value === "string") {
      // Direct link (First Year case)
      div.innerHTML = `
        <h2>${year}</h2>
        <p><a href="${value}" target="_blank">Open Folder</a></p>
      `;
    } else {
      // Has branches
      let html = `<h2>${year}</h2><ul>`;
      Object.entries(value).forEach(([branch, link]) => {
        html += `<li><a href="${link}" target="_blank">${branch}</a></li>`;
      });
      html += "</ul>";
      div.innerHTML = html;
    }

    container.appendChild(div);
  });
}

loadData();
