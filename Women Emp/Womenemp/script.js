document.addEventListener("DOMContentLoaded", () => {
    const feedbackForm = document.getElementById("feedbackForm");
    const feedbackList = document.getElementById("feedbackList");

    function loadFeedback() {
        fetch("http://127.0.0.1:5000/get_feedback") 
            .then(response => response.json())
            .then(data => {
                feedbackList.innerHTML = ""; 
                data.forEach(item => {
                    const li = document.createElement("li");
                    li.innerHTML = `<strong>${item.name}:</strong> ${item.message}`;
                    feedbackList.appendChild(li);
                });
            })
            .catch(error => console.error("Error fetching feedback:", error));
    }

    feedbackForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            alert("All fields are required!");
            return;
        }

        fetch("http://127.0.0.1:5000/submit_feedback", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message })
        })
        .then(response => response.json())
        .then(data => {
            loadFeedback(); 
            feedbackForm.reset(); 
            alert("Feedback submitted successfully!");
        })
        .catch(error => console.error("Error submitting feedback:", error));
    });

    loadFeedback(); 
});

function showSection(sectionId) {
    let sections = document.querySelectorAll('.topic-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    document.getElementById(sectionId).classList.add('active');
}
window.showSection = showSection;