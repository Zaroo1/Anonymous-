const form = document.getElementById("voteForm");
const cards = document.querySelectorAll(".card");
const candidateInput = document.getElementById("candidate");
const submitBtn = document.getElementById("submitBtn");

/* Candidate selection */
cards.forEach(card=>{
  card.addEventListener("click",()=>{
    cards.forEach(c=>c.classList.remove("active"));
    card.classList.add("active");
    candidateInput.value = card.dataset.value;
  });
});

/* FORM SUBMISSION */
form.addEventListener("submit",function(e){
  e.preventDefault();

  if(candidateInput.value === ""){
    alert("Please select a candidate.");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";

  const formData = new FormData(form);

  fetch("https://script.google.com/macros/s/AKfycbx6JYuCG1bkZ5rJjK8K6byLLziB-Y18ic7uC6Wod75MAY5cjfSPM3rU5DpW3kYyg0y9mg/exec",{
    method:"POST",
    body: formData,
    mode: "no-cors"
  })
  .then(()=>{
    alert("Vote submitted successfully. Thank you!");
    form.reset();
    cards.forEach(c=>c.classList.remove("active"));
    submitBtn.textContent = "Submit Vote";
    submitBtn.disabled = false;
  })
  .catch(()=>{
    alert("Submission failed. Please try again.");
    submitBtn.textContent = "Submit Vote";
    submitBtn.disabled = false;
  });
});