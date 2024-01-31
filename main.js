// Function to show project details modal
function showProjectModal(title, description) {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');

    modalTitle.textContent = title;
    modalDescription.textContent = description;

    modal.style.display = 'block';
}

// Function to close project details modal
function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.style.display = 'none';
}

// Close modal if user clicks outside of it
window.onclick = function (event) {
    const modal = document.getElementById('projectModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};
