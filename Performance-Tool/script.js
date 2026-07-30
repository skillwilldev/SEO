document.addEventListener('DOMContentLoaded', () => {
    console.log("FoodExpress აპლიკაცია წარმატებით ჩაიტვირთა.");

    function generateTestimonials() {
        const container = document.getElementById('testimonials-container');
        if (!container) return;

        const names = ['ნინო მ.', 'გიორგი კ.', 'მარიამ ბ.', 'დავით ხ.', 'ანა ტ.'];
        const texts = [
            'საუკეთესო მიტანის სერვისი! საკვები ცხელი მოვიდა.',
            'ძალიან სწრაფი მომსახურება. 20 წუთში მოიტანეს.',
            'ხარისხი შესანიშნავია, ფასები ხელმისაწვდომი.'
        ];

        // ოპტიმიზაცია: 150-ის ნაცვლად ვქმნით მხოლოდ 5 ელემენტს, რომ არ გადაიტვირთოს DOM და არ გამოიწვიოს Long Tasks
        for (let i = 0; i < 5; i++) {
            const card = document.createElement('div');
            card.className = 'testimonial-card';

            const nameEl = document.createElement('div');
            nameEl.className = 'testimonial-name';
            nameEl.textContent = names[i % names.length];

            const textEl = document.createElement('div');
            textEl.className = 'testimonial-text';
            textEl.textContent = texts[i % texts.length];

            card.appendChild(nameEl);
            card.appendChild(textEl);
            container.appendChild(card);
        }
    }

    generateTestimonials();

    // ფორმის დამუშავება
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('შეკვეთა წარმატებით გაიგზავნა!');
            orderForm.reset();
        });
    }
});