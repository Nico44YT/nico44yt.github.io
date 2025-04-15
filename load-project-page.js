async function loadProjectPage() {
    const container = document.getElementById("project-details");
    const fileName = window.location.search.replace("?","").split("=")[1];
    
    const jsonPath = `projects/${fileName}.json`;

    try {
        const res = await fetch(jsonPath);
        const project = await res.json();

        const page = project.project_page;

        var screenshots_text;

        if (page.screenshots != null && page.screenshots.length > 0) {
            screenshots_text = `<h3>Screenshots</h3>
                <div class="screenshots">
                  ${page.screenshots.map(url => `<img src="${url}" alt="Screenshot" />`).join("")}
                </div>`
        } else {
            screenshots_text = ""
        }
        
        var customHtml;
        
        if(page.custom_html != null) {
            customHtml = `
            <div style="display: inline-block; min-width: 50%">
            <style>${page.custom_style}</style>
                ${page.custom_html}
            </div>`;
        } else {
            customHtml = "";
        }
        
        container.innerHTML = `
      <button id = "back_button"><</button>
      <h2>${project.title}</h2>
      <p>${project.description}</p>
      <p><strong>Versions:</strong> ${project.versions.join(", ")}</p>

      ${customHtml}
      ${screenshots_text}
      
      <h3>Links</h3>
        <div class="links">
          ${page.links.map(json => `
            <a id = "link_badge" target="_blank" href="${json.link}">
              <img id = "link_badge" src="${json.image}" alt="alt"/> 
            </a>
          `).join('')}
        </div>
    `;
    } catch (err) {
        console.error("Failed to load project page:", err);
        container.innerHTML = `<p>Failed to load project.</p>`;
    }
}

window.addEventListener("DOMContentLoaded", () => {
    loadProjectPage().then(r => {
        
    });
    
    document.body.addEventListener("click", (e) => {
        if (e.target.matches(".screenshots img")) {
            window.open(e.target.src);
        }
        
        if (e.target.id === "back_button") history.back();
    });
});
