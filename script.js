// Candidate selection
const candidateCards = document.querySelectorAll('.candidate-card');
const selectedCandidateInput = document.getElementById('selectedCandidate');

candidateCards.forEach(card => {
  card.addEventListener('click', () => {
    candidateCards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    selectedCandidateInput.value = card.dataset.name;
  });
});

// Form submission
const form = document.getElementById('voteForm');
form.addEventListener('submit', e => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => data[key] = value);

  fetch('https://script.google.com/macros/s/AKfycbybAXYSw-4PnDCOYwRQODdCNn2sLm2zjrIk2BWPE6-vL4iZamcRKSILOHetBGDgqKiwHQ/exec', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => res.json())
  .then(response => {
    if(response.status === 'success') {
      alert('✅ Your response has been submitted successfully!');
      form.reset();
      candidateCards.forEach(c => c.classList.remove('selected'));
    } else {
      alert('❌ Submission failed. Please check the script URL and deployment.');
    }
  })
  .catch(err => {
    console.error(err);
    alert('❌ An error occurred. Please check your script URL and deployment.');
  });
});