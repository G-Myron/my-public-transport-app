export function disableElement(elementId) {
    document.getElementById(elementId).classList.add("disabled");
}

export function enableElement(elementId) {
    document.getElementById(elementId).classList.remove("disabled");
}

export function hideElement(elementId){
    const element = document.getElementById(elementId);
    element.classList.add("hide");
}

export function showElement(elementId){
    const element = document.getElementById(elementId);
    element.classList.remove("hide");
}

export function removeTooltip(targetId){
    const tooltipElement = document.getElementById(targetId);
    tooltipElement.removeAttribute("data-tooltip-content");
};

export function setTooltipContent(targetId, text){
    const tooltipElement = document.getElementById(targetId);
    tooltipElement.setAttribute("data-tooltip-content", text);
};

export function markSelectedTrip(tripWrapperId){
    const otherTripWrappers = document.querySelectorAll(".trip-wrapper");
    otherTripWrappers.forEach((tripWrapper) => {
        tripWrapper.classList.remove("trip-selected");
    });

    const tripWrapper = document.getElementById(tripWrapperId);
    tripWrapper.classList.add("trip-selected");
};
