// 1. ამოღებულია მძიმე სინქრონული გამოთვლები (computeDistanceMatrix) მთავარი კრიტიკული გზიდან.

const regions = ['კახეთი', 'იმერეთი', 'სვანეთი', 'თუშეთი', 'აჭარა', 'გურია', 'მცხეთა-მთიანეთი', 'სამეგრელო', 'რაჭა'];
const tourTypes = ['ტრეკინგი', 'ღვინის ტური', 'კულტურული', 'საზაფხულო', 'საზამთრო', 'გასტრო', 'ფოტო ტური'];
const images = [
    'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800',
    'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
    'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800',
    'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800',
];

const destinations = _.range(1, 501).map(i => ({
    id: i,
    name: `${regions[i % regions.length]} — ტური #${i}`,
    price: _.round(Math.random() * 2000 + 100, 2),
    date: new Date(Date.now() + Math.random() * 180 * 24 * 60 * 60 * 1000),
    region: regions[i % regions.length],
    type: tourTypes[i % tourTypes.length],
    rating: _.round(Math.random() * 2 + 3, 1),
    image: images[i % images.length],
    description: `აღმოაჩინე ${regions[i % regions.length]}ს სილამაზე ამ საოცარი ტურით. `
}));

let currentIndex = 0;
const itemsPerPage = 10; // საწყისად და ყოველ ჯერზე ჩასატვირთი ტურების რაოდენობა
let currentFilteredData = destinations; // მიმდინარე მონაცემები ძებნისთვის

function renderDestinations(data, append = false) {
    currentFilteredData = data;
    const container = document.getElementById('destination-cards');
    
    if (!append) {
        container.innerHTML = '';
        currentIndex = 0;
    }

    const fragment = document.createDocumentFragment();
    const nextItems = data.slice(currentIndex, currentIndex + itemsPerPage);
    
    nextItems.forEach(dest => {
        const card = document.createElement('div');
        card.className = 'destination-card';

        const formattedDate = moment(dest.date).format('DD MMMM YYYY, HH:mm');
        const formattedPrice = _.padStart(String(_.round(dest.price, 2)), 8, ' ');
        const stars = '★'.repeat(Math.floor(dest.rating)) + (dest.rating % 1 >= 0.5 ? '½' : '');

        card.innerHTML = `
            <img src="${dest.image}" class="card-image" width="300" height="200" alt="Destination">
            <div class="card-body">
                <h3>${dest.name}</h3>
                <div class="rating">${stars} (${dest.rating})</div>
                <p class="price">₾${formattedPrice}</p>
                <p class="date">${formattedDate}</p>
                <span class="category">${dest.type}</span>
            </div>
        `;

        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });

        fragment.appendChild(card);
    });

    container.appendChild(fragment);
    currentIndex += nextItems.length;

    document.getElementById('destination-count').textContent =
        `ნაჩვენებია ${currentIndex} / ${data.length} მიმართულება`;

    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.style.display = currentIndex >= data.length ? 'none' : 'inline-block';
    }
}

// საწყისი ჩატვირთვა (მხოლოდ პირველი 10)
renderDestinations(destinations);

// ღილაკზე დაჭერის ეგზეკუტორი (Load More)
document.getElementById('load-more-btn').addEventListener('click', function() {
    renderDestinations(currentFilteredData, true);
});

// Debounce ძებნისთვის
const searchInput = document.getElementById('destination-search');
searchInput.addEventListener('input', _.debounce(function (e) {
    const term = e.target.value.toLowerCase();

    const filtered = destinations.filter(d =>
        d.name.toLowerCase().includes(term) ||
        d.region.toLowerCase().includes(term) ||
        d.type.toLowerCase().includes(term) ||
        d.description.toLowerCase().includes(term)
    );

    const sorted = _.orderBy(filtered, ['price'], ['desc']);
    renderDestinations(sorted, false);
}, 300));


function generateReviews() {
    const container = document.getElementById('reviews-container');
    const names = ['ნინო', 'გიორგი', 'მარიამ', 'დავით', 'ანა', 'ლუკა', 'თამარ', 'ნიკა', 'ელენე', 'სანდრო'];
    const texts = [
        'საოცარი გამოცდილება იყო! აუცილებლად გავიმეორებ.',
        'ბუნება თვალწარმტაცია, გიდი პროფესიონალი.',
        'ფასი და ხარისხი შესანიშნავ ბალანსშია.',
        'ოჯახთან ერთად მშვენიერი დრო გავატარეთ.',
        'ტრანსპორტი კომფორტული იყო, მარშრუტი საინტერესო.',
    ];

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 50; i++) {
        const review = document.createElement('div');
        review.className = 'review-card';

        const reviewDate = moment(new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000)).format('DD MMMM YYYY, HH:mm:ss');
        const rating = _.round(Math.random() * 2 + 3, 1);
        const stars = '★'.repeat(Math.floor(rating));

        review.innerHTML = `
            <div class="reviewer">${names[i % names.length]} ${String.fromCharCode(65 + (i % 26))}.</div>
            <div class="review-date">${reviewDate}</div>
            <div class="review-text">${texts[i % texts.length]}</div>
            <div class="review-rating">${stars} (${rating})</div>
        `;
        fragment.appendChild(review);
    }
    container.appendChild(fragment);
}

generateReviews();


const select = document.getElementById('destination-select');
destinations.forEach(d => {
    const option = document.createElement('option');
    option.value = d.id;
    option.textContent = d.name;
    select.appendChild(option);
});


window.addEventListener('scroll', function () {
    const scrollY = window.scrollY;
    document.getElementById('scroll-value').textContent = Math.round(scrollY);
});


setTimeout(function () {
    const promo = document.getElementById('promo-container');
    promo.innerHTML = `
        <div class="promo-banner">
            <strong>სპეციალური შეთავაზება!</strong><br>
            ყველა ტურზე 30% ფასდაკლება — მხოლოდ ამ კვირაში!
        </div>
    `;
}, 2000);


setTimeout(function () {
    const totalDest = destinations.length;
    const avgPrice = _.meanBy(destinations, 'price');
    const maxPrice = _.maxBy(destinations, 'price').price;
    const minPrice = _.minBy(destinations, 'price').price;
    const regionCount = _.uniqBy(destinations, 'region').length;
    const typeCount = _.uniqBy(destinations, 'type').length;

    const statsContainer = document.getElementById('stats-container');
    statsContainer.innerHTML = `
        <div class="stats-grid">
            <div class="stat-card">
                <div class="number">${totalDest}</div>
                <div class="label">სულ ტური</div>
            </div>
            <div class="stat-card">
                <div class="number">₾${_.round(avgPrice, 0)}</div>
                <div class="label">საშუალო ფასი</div>
            </div>
            <div class="stat-card">
                <div class="number">₾${_.round(maxPrice, 0)}</div>
                <div class="label">ყველაზე ძვირი</div>
            </div>
            <div class="stat-card">
                <div class="number">₾${_.round(minPrice, 0)}</div>
                <div class="label">ყველაზე იაფი</div>
            </div>
            <div class="stat-card">
                <div class="number">${regionCount}</div>
                <div class="label">რეგიონი</div>
            </div>
            <div class="stat-card">
                <div class="number">${typeCount}</div>
                <div class="label">ტურის ტიპი</div>
            </div>
        </div>
    `;
}, 800);


document.getElementById('book-btn').addEventListener('click', function () {
    alert('ტური დაჯავშნილია!');
});