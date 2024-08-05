// search-webnovel.js
document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const boxes = document.querySelectorAll('.box');
    const toggleButton = document.getElementById('toggle-tag-filter');
    const tagFilter = document.getElementById('tag-filter');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterBoxes);
    });

    toggleButton.addEventListener('click', () => {
        tagFilter.classList.toggle('hidden');
        updateButtonText();
    });

    function updateButtonText() {
        toggleButton.textContent = tagFilter.classList.contains('hidden') 
            ? 'タグを表示' 
            : 'タグを非表示';
    }

    function filterBoxes() {
        const selectedTags = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        boxes.forEach(box => {
            const boxTags = box.dataset.tags.split(' ');
            const shouldShow = selectedTags.length === 0 || selectedTags.every(tag => boxTags.includes(tag));
            box.style.display = shouldShow ? 'block' : 'none';
        });
    }

    // 初期状態でボタンのテキストを設定
    updateButtonText();
});
