const projectData = require("../data/projectData");
const sectorData = require("../data/sectorData");

let projects = [];

function initialize() {
  return new Promise((resolve, reject) => {
    projectData.forEach((proj) => {
      const sector = sectorData.find((sec) => sec.id === proj.sector_id);
      if (sector) {
        const updatedProj = { ...proj, sector: sector.sector_name };
        projects.push(updatedProj);
      }
    });
    if (projects.length > 0) {
      resolve();  // Success, no data returned
    } else {
      reject("No projects loaded");
    }
  });
}

function getAllProjects() {
  return new Promise((resolve, reject) => {
    if (projects.length > 0) {
      resolve(projects);
    } else {
      reject("No projects available");
    }
  });
}

function getProjectById(id) {
  return new Promise((resolve, reject) => {
    const project = projects.find(p => Number(p.id) === Number(id));
    project ? resolve(project) : reject(`no project found with id: ${id}`);
  });
}


function getProjectsBySector(sector) {
  return new Promise((resolve, reject) => {
    const filtered = projects.filter(
      p => p.sector.toLowerCase() === sector.toLowerCase()
    );
    filtered.length > 0
      ? resolve(filtered)
      : reject(`no results returned for sector: ${sector}`);
  });
}


module.exports = { initialize, getAllProjects, getProjectById, getProjectsBySector };