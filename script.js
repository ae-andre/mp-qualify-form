const steps = {
    start: {
        title: "Are you completing the MobilityPLUS application for yourself or for someone else?",
        options: { self: "self-phone-shared", someone_else: "access-verification" }
    },
    "self-phone-shared": {
        title: "Do you have a phone number or email address that is not shared with anyone else who uses MobilityPLUS or GRT Flex app?",
        options: { yes: "display-application", no: "call-grt" }
    },
    "access-verification": {
        title: "Do you have access to the applicant's phone or email to receive a verification code?",
        options: { yes: "applicant-phone-shared", no: "call-grt" }
    },
    "applicant-phone-shared": {
        title: "Does the applicant share their phone number with anyone else who uses MobilityPLUS or GRT Flex app?",
        options: { yes: "call-grt", no: "display-application" }
    },
    "call-grt": {
        title: "Please submit the application in-person or via mail.",
        description: "Download and complete the MobilityPLUS application using the link below.",
        options: null
    },
    "display-application": {
        title: "Continue to application",
        options: null
    }
};

let currentStep = "start";

function handleAnswer(answer) {
    const nextStep = steps[currentStep]?.options?.[answer];
    if (nextStep) {
        currentStep = nextStep;
        renderStep();
    }
}

function renderStep() {
    const step = steps[currentStep];
    const formTitle = document.getElementById("form-title");
    const formContent = document.getElementById("form-content");

    formTitle.innerHTML = step.title;

    if (currentStep === "call-grt") {
        formContent.innerHTML = `
            <p class="text-gray-700 mb-4">${step.description}</p>
            <a href="https://www.grt.ca/en/mobilityplus-application.pdf" target="_blank">
                <button class="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 w-full">
                    Download Application PDF
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
        if (currentStep === "start") {
            formContent.innerHTML = `
                <button 
                    class="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 mr-4 w-full" 
                    onclick="handleAnswer('self')">
                    Applying for Myself
                </button>
                <button 
                    class="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 w-full" 
                    onclick="handleAnswer('someone_else')">
                    Applying for Someone Else
                </button>
            `;
        } else {
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
        }
    } else {
        formContent.innerHTML = `<p class="text-gray-700">${step.title}</p>`;
    }
}

renderStep();