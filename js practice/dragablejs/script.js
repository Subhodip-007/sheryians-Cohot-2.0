const container = document.getElementById("container");

let draggedItem = null;

document.querySelectorAll(".item").forEach(item => {

    item.addEventListener("dragstart", () => {
        draggedItem = item;
        item.classList.add("dragging");
    });

    item.addEventListener("dragend", () => {
        item.classList.remove("dragging");
        draggedItem = null;
    });

});

container.addEventListener("dragover", e => {
    e.preventDefault();

    const afterElement = getDragAfterElement(
        container,
        e.clientY
    );

    if (!draggedItem) return;

    if (afterElement == null) {
        container.appendChild(draggedItem);
    } else {
        container.insertBefore(draggedItem, afterElement);
    }
});

function getDragAfterElement(container, mouseY) {

    const elements = [
        ...container.querySelectorAll(".item:not(.dragging)")
    ];

    return elements.reduce(
        (closest, child) => {

            const box = child.getBoundingClientRect();

            const offset =
                mouseY - box.top - box.height / 2;

            if (
                offset < 0 &&
                offset > closest.offset
            ) {
                return {
                    offset,
                    element: child
                };
            }

            return closest;
        },
        {
            offset: Number.NEGATIVE_INFINITY
        }
    ).element;
}