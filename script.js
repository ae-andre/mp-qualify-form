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

    // Clear and display buttons based on the current step
    if (currentStep === "call-grt") {
        formContent.innerHTML = `
            <a href="https://www.grt.ca/en/about-grt/contact-us.aspx" target="_blank">
                <button class="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 w-full">
                    Contact GRT
                </button>
            </a>
        `;
    } else if (currentStep === "display-application") {
        formContent.innerHTML = `
            <a href="https://forms.sparelabs.com/forms?organizationId=1966c7f8-3e36-4320-b0d7-de0f7d8d4355&caseTypeKey=mobilityPlusEligibilityTemplate&formKey=MobilityPlusApplication" target="_blank">
                <button class="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 w-full">
                    Start Application
                </button>
            </a>
        `;
    } else if (step.options) {
        // For "yes" and "no" options
        formContent.innerHTML = `
            <button 
                class="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 mr-4 w-full" 
                onclick="handleAnswer('yes')">
                Yes
            </button>
            <button 
                class="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 w-full" 
                onclick="handleAnswer('no')">
                No
            </button>
        `;
    } else {
        // Fallback for no options (display plain text)
        formContent.innerHTML = `<p class="text-gray-700">${step.title}</p>`;
    }
}

// Initial render
renderStep();