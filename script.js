async function loadData() {
  const response = await fetch("data.json?nocache=" + new Date().getTime()); // force refresh
  const data = await response.json();
  renderData(data);
}

function renderData(data) {
  const container = document.getElementById("content");
  container.innerHTML = "";

  Object.entries(data).forEach(([year, value]) => {
    const div = document.createElement("div");
    div.className = "subject";

    if (typeof value === "string") {
      // Direct link (First Year)
      div.innerHTML = `
        <h2>${year}</h2>
        <p><a href="${value}" target="_blank">Open Folder</a></p>
      `;
    } else {
      // Year has semesters (and inside that, branches)
      let html = `<h2>${year}</h2>`;

      Object.entries(value).forEach(([semester, branches]) => {
        html += `<h3>${semester}</h3><ul>`;
        Object.entries(branches).forEach(([branch, link]) => {
          html += `<li><a href="${link}" target="_blank">${branch}</a></li>`;
        });
        html += "</ul>";
      });

      div.innerHTML = html;
    }

    container.appendChild(div);
  });
}

loadData();
