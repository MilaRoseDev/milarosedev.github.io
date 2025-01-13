const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('highlight');
        } else {
            entry.target.classList.remove('highlight');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.resume-section').forEach(section => {
    observer.observe(section);
});
