const commercialProjects = document.querySelectorAll('.project.commercial')
const exerciseProjects = document.querySelectorAll('.project.exercise')
if (commercialProjects.length) {
  document.querySelector('.proj-count-commercial').innerHTML = commercialProjects.length
}
if (exerciseProjects.length) {
  document.querySelector('.proj-count-exercise').innerHTML = exerciseProjects.length
}
