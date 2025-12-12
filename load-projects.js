async function loadProjects() {
    const projectListElement = document.getElementById("project-list");

    const projectFiles = [
        "projects/liby.json",
        "projects/nicos_backslots.json",
        "projects/nicos_graves.json"
        
    ];

    for (const file of projectFiles) {
        try {
            const res = await fetch(file);
            const project = await res.json();

            const projectEl = document.createElement("div");
            projectEl.className = "project";
            projectEl.innerHTML = `
            <a id = "project_card" href = "project.html?id=${project.id}" style = "text-decoration: none">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem;">
                <div style="flex: 1; font-size: 1.1rem; line-height: 75%">
                  <h3>${project.title}</h3>
                  <p>${project.description}</p>
                  <p><strong>Versions:</strong> ${project.versions.join(", ")}</p>
                </div>
                <img src="${project.icon}" alt="${project.title} icon" style="width: 128px; height: 128px; border-radius: 8px;">
              </div>
            </a>
            `;


            projectListElement.appendChild(projectEl);
        } catch (err) {
            console.error("Error loading project:", file, err);
        }
    }
}

window.addEventListener("DOMContentLoaded", loadProjects);
