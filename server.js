/********************************************************************************
* WEB322 – Assignment 02
*
* I declare that this assignment is majorly my own work and in accordance with Seneca's
* Academic Integrity Policy. I have also took major help from Chat GPT for good formating and 
* vercel deployment.
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Tanish Soni   Student ID: 188999239   Date: 09/11/2025
*
********************************************************************************/

const express = require("express");
const path = require("path");
const projectData = require("./modules/projects");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set("view engine", "ejs");

projectData.initialize().then(() => {

  app.get("/", (req, res) => {
    res.render("home", { page: "/" });
  });

  app.get("/about", (req, res) => {
    res.render("about", { page: "/about" });
  });

  // List projects (support ?sector=)
  app.get("/solutions/projects", (req, res) => {
    const sector = req.query.sector;
    const promise = sector ? projectData.getProjectsBySector(sector) : projectData.getAllProjects();

    promise.then((data) => {
      if (!data || data.length === 0) {
        return res.status(404).render("404", { page: "/solutions/projects", message: `No projects found for sector: ${sector || 'all'}` });
      }
      res.render("projects", { page: "/solutions/projects", projects: data });
    }).catch(err => {
      res.status(500).render("404", { page: "/solutions/projects", message: err.toString() });
    });
  });

  // Single project by id
  app.get("/solutions/projects/:id", (req, res) => {
    const id = req.params.id;
    projectData.getProjectById(id).then(project => {
      if (!project) {
        return res.status(404).render("404", { page: "", message: `No project found with id ${id}` });
      }
      res.render("project", { page: "", project });
    }).catch(err => {
      res.status(404).render("404", { page: "", message: err.toString() });
    });
  });

  // 404
  app.use((req, res) => {
    res.status(404).render("404", { page: "", message: `No view for ${req.originalUrl}` });
  });

  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

}).catch(err => {
  console.error("Initialization failed:", err);
});
