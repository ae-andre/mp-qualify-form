// Define the steps in the flowchart
const steps = {
    start: {
        title: "Will you be completing the MobilityPlus Application for yourself?",
        options: { yes: "share-phone", no: "access-verification" }
    },
    "share-phone": {
        title: "Do you share your phone number with anyone else?",
        options: { yes: "call-grt", no: "display-application" }
    },
    "access-verification": {
        title: "Do you have access to the MobilityPlus applicant's phone for verification?",
        options: { yes: "applicant-phone-shared", no: "call-grt" }
    },
    "applicant-phone-shared": {
        title: "Does the applicant share their phone number with anyone else?",
        options: { yes: "call-grt", no: "display-application" }
    },
    "call-grt": {
        title: "Please call or email GRT.",
        options: null
    },
    "display-application": {
        title: "Continue to application",
        options: null
    }
};

// Current step in the flow
let currentStep = "start";

// Function to handle user answers and update the form
function handleAnswer(answer) {
    const nextStep = steps[currentStep]?.options?.[answer];
    if (nextStep) {
        currentStep = nextStep;
        renderStep();
    }
}

// Function to render the current step
function renderStep() {
    const step = steps[currentStep];
    const formTitle = document.getElementById("form-title");
    const formContent = document.getElementById("form-content");

    // Update the question title
    formTitle.textContent = step.title;

    // Clear and display the Yes/No buttons
    if (step.options) {
        formContent.innerHTML = `
            <button 
                class="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 mr-4 mb-2"
                onclick="handleAnswer('yes')">
                Yes
            </button>
            <button 
                class="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
                onclick="handleAnswer('no')">
                No
            </button>
        `;
    } else {
        // If no options, display a message or end step
        formContent.innerHTML = `<p class="text-gray-700">${step.title}</p>`;
    }
}

// Initial render
renderStep();