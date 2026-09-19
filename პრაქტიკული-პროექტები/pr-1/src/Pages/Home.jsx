import { useState, useEffect, useMemo } from 'react';
import orderBy from 'lodash/orderBy';
import round from 'lodash/round';

const images = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600',
    'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=600',
    'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=600',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600',
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600',
    'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=600',
    'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=600',
    'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=600',
];

function Home() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    // Debounce-ის ლოგიკა (300მწყ შეყოვნება)
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        const data = Array.from({ length: 1000 }, (_, i) => ({
            id: i + 1,
            name: `Product ${i + 1}`,
            price: Math.random() * 1000,
            date: new Date(Date.now() - Math.random() * 10000000000),
            category: ['Electronics', 'Clothing', 'Books', 'Food'][i % 4],
        }));
        setProducts(data);
    }, []);

    // useMemo და ფილტრაცია/სორტირება debouncedSearch-ის გამოყენებით
    const sortedProducts = useMemo(() => {
        const filtered = products.filter(p =>
            p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
        );
        return orderBy(filtered, ['price'], ['desc']).slice(0, 50);
    }, [products, debouncedSearch]);

    return (
        <div style={{ padding: '20px' }}>
            <h1>პროდუქტების კატალოგი</h1>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
                {images.map((src, i) => (
                    <img
                        key={i}
                        src={src}
                        alt={`Image ${i}`}
                        width="300"
                        height="200"
                        loading="lazy"
                        style={{ width: '300px', height: '200px', objectFit: 'cover' }}
                    />
                ))}
            </div>

            <input
                type="text"
                placeholder="ძებნა..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '8px 16px', fontSize: '16px', width: '100%', marginBottom: '20px' }}
            />

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ textAlign: 'left', padding: '8px', borderBottom: '2px solid #333' }}>სახელი</th>
                        <th style={{ textAlign: 'left', padding: '8px', borderBottom: '2px solid #333' }}>ფასი</th>
                        <th style={{ textAlign: 'left', padding: '8px', borderBottom: '2px solid #333' }}>თარიღი</th>
                        <th style={{ textAlign: 'left', padding: '8px', borderBottom: '2px solid #333' }}>კატეგორია</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedProducts.map(product => (
                        <tr key={product.id}>
                            <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{product.name}</td>
                            <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                                ${round(product.price, 2)}
                            </td>
                            <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                                {new Intl.DateTimeFormat('en-US', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                }).format(new Date(product.date))}
                            </td>
                            <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{product.category}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Home;